const mongoose = require("mongoose");
const { resolve } = require('path')

require('dotenv').config({path: resolve(__dirname,"../.env")})

const database = process.env.DATABASE;
const options = { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true 
};

async function connect() {
  try {
    await mongoose.connect(database, options);
  } catch (err) {
    console.log(database)
    console.error("Error conectando con mongodb ...");
    console.error(err);
  }
}

module.exports = { connect };