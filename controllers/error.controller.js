const ApplicationError = require('./../utils/applicationError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApplicationError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; 
  const message = `Valor duplicado: ${value}. Por favor, facilite un nuevo valor!`;
  return new ApplicationError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Datos no válidos. ${errors.join('. ')}`;
  return new ApplicationError(message, 400);
};

const handleJWTError = () =>
  new ApplicationError('Token incorrecto. Por favaor, vuelva a iniciar sesión!', 401);

const handleJWTExpiredError = () =>
  new ApplicationError('Su sesión ha expirado! Por favor, vuelva a iniciar sesión.', 401);

const sendErrorDevelopment = (err, req, res) => {  
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message      
    });  
};

const sendErrorProduction = (err, req, res) => {    
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
};

module.exports = (err, req, res, next) => { 
  err.statusCode = err.statusCode || 500;
  err.status = 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProduction(error, req, res);
  }
};
