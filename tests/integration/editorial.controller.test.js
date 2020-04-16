const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Editorial = require("../../models/editorial.model")

const url = "/api/v1/editoriales/"

describe('/api/v1/editoriales', () => {  
    describe('GET /', () => {
        beforeAll(async () => {
          await Editorial.deleteMany()
          await Editorial.create({ nombre: 'Editorial 1'})  
        });

        it("debe devolver todos las editoriales", async () => {          
          const res = await request(app).get(url);

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')
          expect(res.body.results).toBeDefined()            
          expect(Array.isArray(res.body.data.data)).toBeTruthy()
          expect(res.body.data.data[0]['nombre']).toBeDefined()                   
        })  
    })

    describe('POST /', () => {
        let editorial = { nombre: "Editorial 1" }

        beforeAll(async () => {
          await Editorial.deleteMany()          
        });

        it("debe devolver una editorial ", async () => {
            const res = await request(app).post(url).send(editorial)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')
            expect(res.body.data.data.nombre).toBe(editorial.nombre)   
            expect(res.body.data.data._id).toBeDefined()
            id = res.body.data.data['_id']      
        })
        it("Debería devolver un error 500 cuando no se facilita el nombre de la editorial", async () => {
            editorial.nombre = ""
            const res = await request(app).post(url).send(editorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
        it("Debería devolver un error 500 cuando el nombre es inferior a 3 caracteres", async () => {
            editorial.nombre = "aa"
            const res = await request(app).post(url).send(editorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
    
        it("Debería devolver un error 500 cuando el nombre es superior a 60 caracteres", async () => {            
            editorial.nombre = new Array(62).join('a');
            const res = await request(app).post(url).send(editorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })     
    })

    describe('GET /:id', () => {
        let editorial;

        beforeAll(async () => {
          await Editorial.deleteMany()
          editorial = await Editorial.create({ nombre: 'Editorial 1'})  
        });

        it("debe devolver una editorial", async() => {
          const res = await request(app).get(url + editorial._id)

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')      
          expect(res.body.data.data['nombre']).toBe(editorial.nombre)
          expect(res.body.data.data['_id']).toBeDefined()      
        })
  
        it("debe devolver un error 404 si no existe la editorial", async() => {
          const id = mongoose.Types.ObjectId();
          const res = await request(app).get(url + id)

          expect(res.statusCode).toBe(404)
        })
  
        it("debe devolver un error 500 si no existe la editorial", async() => {
          const res = await request(app).get(url + '1')
          expect(res.statusCode).toBe(500)      
        })  
    })  

    describe('PUT /:id', () => {
        let idEditorial1;
        let idEditorial2;  
        let editorial;      

        beforeAll(async () => {
          await Editorial.deleteMany()
          const editorial1 = await Editorial.create({ nombre: 'Editorial 1' })  
          const editorial2 = await Editorial.create({ nombre: 'Editorial 2' })  
          idEditorial1 = editorial1._id
          idEditorial2 = editorial2._id
        });      

        it("debe actualizar una editorial", async() => {
          editorial = { nombre: "Editorial 3" }
          const res = await request(app).put(url + idEditorial1).send(editorial)

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')      
          expect(res.body.data.data._id).toBeDefined()
          expect(res.body.data.data.nombre).toBe(editorial.nombre)    
        })  
  
        it("debe devolver un error 500 al intentar actualizar una editorial con un nombre existente", async() => {
          editorial = { nombre: "Editorial 3" }
          const res = await request(app).put(url + idEditorial2).send(editorial)

          expect(res.statusCode).toBe(500)          
        })  
  
        it("debe devolver un error 500 al intentar actualizar una editorial con un nombre inferior a 3 caracteres", async() => {
          editorial = { nombre: "aa" }
          const res = await request(app).put(url + idEditorial1).send(editorial)

          expect(res.statusCode).toBe(500)          
        })  
  
        it("debe devolver un error 500 al intentar actualizar una editorial con un nombre superior a 60 caracteres", async() => {
          const nombre = new Array(62).join('a');
          editorial = { nombre }
          const res = await request(app).put(url + idEditorial1).send(editorial)

          expect(res.statusCode).toBe(500)          
        })  
  
        it("debe devolver un error 404 si no existe la editorial", async() => {
          editorial = { nombre: "aaaa" }
          const id = mongoose.Types.ObjectId();
          const res = await request(app).put(url + id).send(editorial)

          expect(res.statusCode).toBe(404)
        })
    })  
})