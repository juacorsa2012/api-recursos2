require('dotenv').config({ path: './../.env' });
const randomYear = require('random-year');
const mongoose = require('mongoose');
const faker = require('faker');
const Libro = require('./../models/libro.model');
const Tutorial = require('./../models/tutorial.model');
const Enlace = require('./../models/enlace.model');
const Tema = require('./../models/tema.model');
const Idioma = require('./../models/idioma.model');
const Editorial = require('./../models/editorial.model');
const Fabricante = require('./../models/fabricante.model');
const añoMinimo = 2010;
const añoMaximo = 2020;
const argv = require('minimist')(process.argv.slice(2));
const database = process.env.DATABASE;
const options = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true };

mongoose
    .connect(database, options)
    .then(() => console.log('Base de datos conectada con éxito'));
  
const seedLibros = async (docs) => {
    try {
        console.log(`Registrando ${docs} libros ...`);    
        await Libro.deleteMany();	
        const nTemas = await Tema.countDocuments();
        const nIdiomas = await Idioma.countDocuments();
        const nEditoriales = await Editorial.countDocuments();
    
        for (let i = 0; i < docs; i++) {
            let r = Math.floor(Math.random() * nTemas);
            const tema = await Tema.find().select('_id').limit(1).skip(r);		    
  
            r = Math.floor(Math.random() * nIdiomas);
            const idioma = await Idioma.find().select('_id').limit(1).skip(r);        
  
            r = Math.floor(Math.random() * nEditoriales);
            const editorial = await Editorial.find().select('_id').limit(1).skip(r);            	

            const libro = {
                titulo   : faker.lorem.sentence(),
                tema     : tema[0]._id,
                idioma   : idioma[0]._id,
                editorial: editorial[0]._id,
                observaciones: faker.lorem.text(),
                paginas   : 1 + faker.random.number(),
                publicado : randomYear({ min: añoMinimo, max: añoMaximo })
            }     

        	await Libro.create(libro)    	
    	    let progreso = Math.ceil((i/docs)*100) + '%';
    	    process.stdout.write('Progreso: ' + progreso + '\r');    
        }

        console.log('Proceso finalizado!!');
        process.exit();
    } catch(err) {
        console.log(err)
    }
};

const seedEnlaces = async (docs) => {
    try {
        console.log(`Registrando ${docs} enlaces ...`);    
        await Enlace.deleteMany();	
        const nTemas = await Tema.countDocuments();                
    
        for (let i = 0; i < docs; i++) {
            let r = Math.floor(Math.random() * nTemas);
            const tema = await Tema.find().select('_id').limit(1).skip(r);		     

            const enlace = {
                titulo : faker.lorem.sentence(),
                url  : faker.internet.url(),
                tema : tema[0]._id                              
            }                

        	await Enlace.create(enlace)    	
    	    let progreso = Math.ceil((i/docs)*100) + '%'
    	    process.stdout.write('Progreso: ' + progreso + '\r')
        }

        console.log('Proceso finalizado!!');
        process.exit();
    } catch(err) {
        console.log(err)
    }
};


const seedTutoriales = async (docs) => {
    try {
        console.log(`Registrando ${docs} tutoriales ...`);    
        await Tutorial.deleteMany();	
        const nTemas = await Tema.countDocuments();
        const nIdiomas = await Idioma.countDocuments();
        const nFabricantes = await Fabricante.countDocuments();
    
        for (let i = 0; i < docs; i++) {
            let r = Math.floor(Math.random() * nTemas);
            const tema = await Tema.find().select('_id').limit(1).skip(r);		    
  
            r = Math.floor(Math.random() * nIdiomas);
            const idioma = await Idioma.find().select('_id').limit(1).skip(r);        
  
            r = Math.floor(Math.random() * nFabricantes);
            const fabricante = await Fabricante.find().select('_id').limit(1).skip(r);            	

            const tutorial = {
                titulo : faker.lorem.sentence(),
                tema   : tema[0]._id,
                idioma : idioma[0]._id,
                fabricante : fabricante[0]._id,
                observaciones : faker.lorem.text(),
                duracion  : faker.random.number(),
                publicado : randomYear({ min: añoMinimo, max: añoMaximo })
            }     

        	await Tutorial.create(tutorial)    	
    	    let progreso = Math.ceil((i/docs)*100) + '%';
    	    process.stdout.write('Progreso: ' + progreso + '\r');    
        }

        console.log('Proceso finalizado!!');
        process.exit();
    } catch(err) {
        console.log(err)
    }
};

const n = argv['n'];
const resource = argv['resource'];

if (resource == 'libro' || resource == 'libros') {
    seedLibros(n);
} else if (resource == 'enlace' || resource == 'enlaces' ) {
    seedEnlaces(n)
} else if (resource == 'tutorial' || resource == 'tutoriales') {
    seedTutoriales(n)
}