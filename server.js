require('dotenv').config();

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor http://localhost/${port} ejecutado ...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Cerrando applicación...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});