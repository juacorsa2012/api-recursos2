const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Idioma = require('../models/idioma.model');

dotenv.config({ path: '../.env' });

const database = process.env.DATABASE;
const options  = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true };
mongoose.connect(database, options);  

const idiomas = JSON.parse(fs.readFileSync(`${__dirname}/idiomas.json`, 'utf-8'));

const importar = async () => {
  try {
    console.log('Importando idiomas...')  
    await Idioma.deleteMany();
    await Idioma.create(idiomas);   
    console.log('Idiomas importados con éxito!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importar();