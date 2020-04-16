const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Usuario = require('../models/usuario.model');
const catchAsync = require('../utils/catchAsync');
const ApplicationError = require('../utils/applicationError');

const crearToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.registro = catchAsync(async (req, res, next) => {
    const usuario = await Usuario.create(req.body);
    const token = crearToken(usuario._id);  
    
    res.status(201).json({ status: 'success', token });  
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApplicationError('Email y/o contraseña incorrecta', 401))
    }

    const usuario = await Usuario.findOne({ email }).select('+password');

    if (!usuario || !(await usuario.esPasswordCorrecto(password, usuario.password)))
    {
        return next(new ApplicationError('Email y/o contraseña incorrecta', 401))
    }    
    
    const token = crearToken(usuario._id);

    res.status(201).json({ status: 'success', token });  
});

exports.protegido = catchAsync(async (req, res, next) => {    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next( new ApplicationError('Por favor, inicie sesión con su usuario y contraseña.', 401));
    }  
    
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return next(new ApplicationError('El usuario no existe en la base de datos.', 401));
    }  
    
    req.usuario = usuario;
    next();
  });
  
  exports.rol = (...roles) => {
    return (req, res, next) => {      
      if (!roles.includes(req.usuario.rol)) {
        return next(new ApplicationError('Opps!!. No dispones de los permisos necesarios para realizar esta acción', 403));
      }  
      next();
    };
  }; 