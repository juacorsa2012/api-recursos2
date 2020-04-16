const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema(
{
	titulo: {
    type: String,
    required: [true, 'El título del tutorial es un dato requerido'],      
    trim: true
  },

  observaciones: String, 

  tema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tema',
    required: [true, 'El tema del tutorial es un dato requerido']
  },

  fabricante: {
    type: mongoose.Schema.ObjectId,
    ref: 'Fabricante',
    required: [true, 'El fabricante del tutorial es un dato requerido']
  },

  idioma: {
    type: mongoose.Schema.ObjectId,
    ref: 'Idioma',
    required: [true, 'El idioma del tutorial es un dato requerido']
  },

  duracion: {
    type: Number,
    required: [true, 'La duración del tutorial es un dato requerido'],
    min: [1, 'La duración del tutorial debe ser como mínimo de un minuto']
  },

  publicado: {
    type: Number,
    required: [true, 'El año de publicación es un dato requerido'],
    min: [2010, 'El año de publicación no puede ser anterior a 2010']
  },

  created_at: {
    type: Date,
    default: Date.now(),
    select: false
  }
})

tutorialSchema.statics.obtenerTutoriales = function() {
  return this.aggregate([   
    {"$group"   : { _id: null, count: { $sum: 1 } } },
    {"$project" : { _id: 0 } }
  ]);  
}

tutorialSchema.statics.obtenerTotalDuracion = function() {
  return this.aggregate([   
    {"$group"   : { _id: null, sum: { $sum: "$duracion" } } },
    {"$project" : { _id: 0 } }
  ]);  
}

tutorialSchema.statics.obtenerTutorialesPorTema = function() {
  return this.aggregate([
    { $lookup: { from : "temas", localField : "tema", foreignField : "_id", as : "tema" } },  
    { $unwind  : "$tema" },    
    { $group   : { "_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data" },        
    { $group   : { "_id" : "$data.tema.nombre", "count" : { "$sum" : 1 }, "total" :{ "$first" : "$count" } } },
    { $sort    : { "count" : -1 } },    
    { $project : { "_id" : 0, "tema" : "$_id", "count" : 1, "peso" : {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
  ])
}

tutorialSchema.statics.obtenerTutorialesPorPublicado = function() {
  return this.aggregate([
    { $group   : {"_id" : null, "count" : { "$sum" : 1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data" },        
    { $group   : {"_id": "$data.publicado", "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { "count" : -1 } },    
    { $project : { "_id" : 0, "publicado" : "$_id", "count" : 1, "peso" : {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
  ])
}

tutorialSchema.statics.obtenerTutorialesPorIdioma = function() {
  return this.aggregate([
    { $lookup: { from: "idiomas", localField: "idioma", foreignField: "_id", as: "idioma" } },  
    { $unwind  : "$idioma" },    
    { $group   : {"_id" : null, "count" : { "$sum" : 1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data" },        
    { $group   : {"_id": "$data.idioma.nombre", "count" : { "$sum" : 1 }, "total":{"$first":"$count"}}},
    { $sort    : { "count" : -1 } },       
    { $project : { "_id" : 0, "idioma" : "$_id", "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
  ])
}

tutorialSchema.statics.obtenerTutorialesPorFabricante = function() {
  return this.aggregate([
    { $lookup: { from: "fabricantes", localField: "fabricante", foreignField: "_id", as: "fabricante" } },  
    { $unwind  : "$fabricante" },    
    { $group   : {"_id" : null, "count" : { "$sum" : 1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data" },        
    { $group   : {"_id": "$data.fabricante.nombre", "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { "count" : -1 } },    
    { $project : { "_id" : 0, "fabricante" : "$_id", "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
  ])
}

tutorialSchema.statics.obtenerTutorialesPorTemaPublicado = function() {
  return this.aggregate([
    { $lookup: { from : "temas", localField : "tema", foreignField : "_id", as : "tema" } },  
    { $unwind  : "$tema" },    
    { $group   : {"_id" : null, "count" : { "$sum" : 1 }, "data" : { "$push" : "$$ROOT"} } },       
    { $unwind  : "$data" },        
    { $group   : {"_id": { tema : "$data.tema.nombre", publicado : "$data.publicado" }, "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { "count" : -1 } },       
    { $project : { "_id" : 0, "tema" : "$_id.tema", "publicado" : "$_id.publicado", count : 1, peso : {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}      
  ])
}

tutorialSchema.statics.obtenerTutorialesPorTemaFabricante = function() {
  return this.aggregate([
    { $lookup: { from : "temas", localField : "tema", foreignField : "_id", as : "tema" } },  
    { $unwind  : "$tema" },    
    { $lookup  : { from: "fabricantes", localField: "fabricante", foreignField: "_id", as: "fabricante" } },  
    { $unwind  : "$fabricante" },    
    { $group   : {"_id" : null, "count" : { "$sum" : 1 }, "data" : { "$push" : "$$ROOT"} } },       
    { $unwind  : "$data" },        
    { $group   : {"_id": { tema : "$data.tema.nombre", fabricante : "$data.fabricante" }, "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { "count" : -1 } },       
    { $project : { "_id" : 0, "tema" : "$_id.tema", "fabricante" : "$_id.fabricante.nombre", count : 1, peso : {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}
  ])
}

tutorialSchema.statics.obtenerTutorialesPorTemaIdioma = function() {
  return this.aggregate([
    { $lookup: { from : "temas", localField : "tema", foreignField : "_id", as : "tema" } },  
    { $unwind  : "$tema" },    
    { $lookup  : { from: "idiomas", localField: "idioma", foreignField: "_id", as: "idioma" } },  
    { $unwind  : "$idioma" },    
    { $group   : {"_id" : null, "count" : { "$sum" : 1 }, "data" : { "$push" : "$$ROOT"} } },       
    { $unwind  : "$data" },        
    { $group   : {"_id": { tema : "$data.tema.nombre", idioma : "$data.idioma" }, "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { "count" : -1 } },       
    { $project : { "_id" : 0, "tema" : "$_id.tema", "idioma" : "$_id.idioma.nombre", count : 1, peso : {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}
  ])
}

const Tutorial = mongoose.model('Tutorial', tutorialSchema, 'tutoriales');

module.exports = Tutorial;