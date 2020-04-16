const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Editorial = require('../models/editorial.model.js');

dotenv.config({ path: '../.env' });

const database = process.env.DATABASE;
const options  = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true };
mongoose.connect(database, options);  

const editoriales = JSON.parse(fs.readFileSync(`${__dirname}/editoriales.json`, 'utf-8'));

const importar = async () => {
  try {
    console.log('Importando editoriales...')  
    await Editorial.deleteMany();
    await Editorial.create(editoriales);   
    console.log('Editoriales importados con éxito!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importar();