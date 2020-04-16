const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Fabricante = require('../models/fabricante.model');

dotenv.config({ path: '../.env' });

const database = process.env.DATABASE;
const options  = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true };
mongoose.connect(database, options);  

const fabricantes = JSON.parse(fs.readFileSync(`${__dirname}/fabricantes.json`, 'utf-8'));

const importar = async () => {
  try {
    console.log('Importando fabricantes...');  
    await Fabricante.deleteMany();
    await Fabricante.create(fabricantes);   
    console.log('Fabricantes importados con éxito!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importar();