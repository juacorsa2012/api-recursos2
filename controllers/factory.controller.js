const catchAsync = require('./../utils/catchAsync');
const ApplicationError = require('./../utils/applicationError');
const Features = require('./../utils/features');

exports.borrar = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new ApplicationError('Documento no encontrado con ese identificador', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.actualizar = Model => catchAsync(async (req, res, next) => {
    /*
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });*/

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    


    if (!doc) {
      return next(new ApplicationError('Documento no encontrado con ese identificador', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.crear = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.obtener = (Model, populate) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populate) query = query.populate(populate);
    const doc = await query;

    if (!doc) {
      return next(new ApplicationError('Documento no encontrado con ese ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { 
        data: doc
      }
    });
  });

exports.obtenerTodos = (Model, populate) => catchAsync(async (req, res, next) => {    
    const features = new Features(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();         
    
    const doc = await features.query.populate(populate);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });