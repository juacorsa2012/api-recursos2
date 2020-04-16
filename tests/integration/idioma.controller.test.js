const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Idioma = require("../../models/idioma.model")

const url = "/api/v1/idiomas/"

describe('/api/v1/idiomas', () => {
    afterAll(async () => {
        await Idioma.deleteMany()
    });
  
    describe('GET /', () => {
        beforeAll(async () => {
          await Idioma.deleteMany()
          await Idioma.create({ nombre: 'Idioma 1'})  
        });

        it("debe devolver todos los idiomas", async () => {
          const res = await request(app).get(url);

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')
          expect(res.body.results).toBeDefined()            
          expect(Array.isArray(res.body.data.data)).toBeTruthy()
          expect(res.body.data.data[0]['nombre']).toBeDefined()                
        })  
    })

    describe('POST /', () => {
        let idioma = { nombre: "Idioma 1" }

        beforeAll(async () => {
          await Idioma.deleteMany()          
        });

        it("debe devolver un idioma", async () => {
            const res = await request(app).post(url).send(idioma)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')
            expect(res.body.data.data.nombre).toBe(idioma.nombre)   
            expect(res.body.data.data._id).toBeDefined()                
        })
        it("Debería devolver un error 500 cuando no se facilita el nombre del idioma", async () => {
          idioma.nombre = ""  
          const res = await request(app).post(url).send(idioma) 

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
        it("Debería devolver un error 500 cuando se facilita un nombre inferior a 3 caracteres", async () => {
            idioma.nombre = 'aa'
            const res = await request(app).post(url).send(idioma)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
    
        it("Debería devolver un error 500 cuando se facilita un nombre con más de 60 caracteres", async () => {
            idioma.nombre = new Array(62).join('a');
            const res = await request(app).post(url).send(idioma)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })     
    })

    describe('PUT /:id', () => {
        let idIdioma1;
        let idIdioma2;
        let idioma;      

        beforeAll(async () => {
          await Idioma.deleteMany()
          const idioma1 = await Idioma.create({ nombre: 'Idioma 1' })  
          const idioma2 = await Idioma.create({ nombre: 'Idioma 2' })  
          idIdioma1 = idioma1._id
          idIdioma2 = idioma2._id
        });      

        it("debe actualizar un idioma correctamente", async() => {
          idioma = { nombre: "Idioma 3" }
          const res = await request(app).put(url + idIdioma1).send(idioma)

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')      
          expect(res.body.data.data._id).toBeDefined()
          expect(res.body.data.data.nombre).toBe(idioma.nombre)    
        })  
  
        it("debe devolver un error 500 al intentar actualizar un idioma con un nombre existente", async() => {
          idioma = { nombre: 'Idioma 3' }
          const res = await request(app).put(url + idIdioma2).send(idioma)

          expect(res.statusCode).toBe(500)          
        })  
  
        it("debe devolver un error 500 al intentar actualizar un idioma con un nombre inferior a 3 caracteres", async() => {
          idioma = { nombre: "aa" }
          const res = await request(app).put(url + idIdioma1).send(idioma)

          expect(res.statusCode).toBe(500)          
        })  
  
        it("debe devolver un error 500 al intentar actualizar un idioma con un nombre superior a 60 caracteres", async() => {
          const nombre = new Array(62).join('a');
          idioma = { nombre }
          const res = await request(app).put(url + idIdioma1).send(idioma)

          expect(res.statusCode).toBe(500)          
        })  
  
        it("debe devolver un error 404 si no existe el idioma", async() => {
          const id = mongoose.Types.ObjectId();
          idioma = { nombre: "aaaa" }
          const res = await request(app).put(url + id).send(idioma)

          expect(res.statusCode).toBe(404)
        })
    })  

    describe('GET /:id', () => {
        let idioma;

        beforeAll(async () => {
          await Idioma.deleteMany()
          idioma = await Idioma.create({ nombre: 'Idioma 1'})  
        });

        it("debe devolver un idioma", async() => {
          const res = await request(app).get(url + idioma._id)

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')      
          expect(res.body.data.data['nombre']).toBe(idioma.nombre)
          expect(res.body.data.data['_id']).toBeDefined()      
        })
  
        it("debe devolver un error 404 si no existe el idioma", async() => {
          const id = mongoose.Types.ObjectId();
          const res = await request(app).get(url + id)

          expect(res.statusCode).toBe(404)
        })
  
        it("debe devolver un error 500 si no existe el idioma", async() => {
          const res = await request(app).get(url + '1')
          
          expect(res.statusCode).toBe(500)      
        })  
    })  
});
