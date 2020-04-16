const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tema = require('../models/tema.model');

dotenv.config({ path: '../.env' });

const database = process.env.DATABASE;
const options  = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true };
mongoose.connect(database, options);  

const temas = JSON.parse(fs.readFileSync(`${__dirname}/temas.json`, 'utf-8'));

const importar = async () => {
  try {
    console.log('Importando temas...')  
    await Tema.deleteMany();
    await Tema.create(temas);   
    console.log('Temas importados con éxito!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importar();