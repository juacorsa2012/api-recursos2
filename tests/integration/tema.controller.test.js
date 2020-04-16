const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Tema = require("../../models/tema.model")

const url = "/api/v1/temas/"

describe('/api/v1/temas', () => {
    describe('GET /', () => {
      beforeAll(async () => {
        await Tema.deleteMany()
        await Tema.create({ nombre: 'Tema 2'})  
      });

      it("debe devolver todos los temas", async () => {        
        const res = await request(app).get(url);

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')
        expect(res.body.results).toBeDefined()            
        expect(Array.isArray(res.body.data.data)).toBeTruthy()
        expect(res.body.data.data[0]['nombre']).toBeDefined()              
      })  
    })

    describe('GET /:id', () => {
      let tema;

      beforeAll(async () => {
        await Tema.deleteMany()
        tema = await Tema.create({ nombre: 'Tema 1'})  
      });

      it("debe devolver un tema si el id pasado es correcto", async() => {
        const res = await request(app).get(url + tema._id)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')      
        expect(res.body.data.data['nombre']).toBe(tema.nombre)
        expect(res.body.data.data['_id']).toBeDefined()      
      })

      it("debe devolver un error 404 si no existe el tema", async() => {
        const id = mongoose.Types.ObjectId();
        const res = await request(app).get(url + id)

        expect(res.statusCode).toBe(404)
      })

      it("debe devolver un error 500 si no existe el tema", async() => {
        const res = await request(app).get(url + '1')

        expect(res.statusCode).toBe(500)      
      })  
    })   
    
    describe('POST /', () => {
      let tema = { nombre: "Tema 1" }

      beforeAll(async () => {
        await Tema.deleteMany()          
      });

      it("debe devolver un tema", async () => {
        const res = await request(app).post(url).send(tema)

        expect(res.statusCode).toBe(201)
        expect(res.body.status).toBe('success')
        expect(res.body.data.data.nombre).toBe(tema.nombre)   
        expect(res.body.data.data._id).toBeDefined()        
      })

      it("Debería devolver un error 500 cuando no se facilita el nombre del tema", async () => {
        tema.nombre = ""
        const res = await request(app).post(url).send(tema)

        expect(res.statusCode).toBe(500)      
        expect(res.error).toBeTruthy()      
      })

      it("Debería devolver un error 500 cuando se facilita un nombre inferior a 3 caracteres", async () => {
        tema.nombre = 'aa' 
        const res = await request(app).post(url).send(tema)

        expect(res.statusCode).toBe(500)      
        expect(res.error).toBeTruthy()      
      })

      it("Debería devolver un error 500 cuando se facilita un nombre con más de 60 caracteres", async () => {
        tema.nombre = new Array(62).join('a')        
        const res = await request(app).post(url).send(tema)

        expect(res.statusCode).toBe(500)      
        expect(res.error).toBeTruthy()      
      })
    })   
   
    describe('PUT /:id', () => {
      let idTema1;
      let idTema2;  
      let tema;      

      beforeAll(async () => {
        await Tema.deleteMany()
        const tema1 = await Tema.create({ nombre: 'Tema 1' })  
        const tema2 = await Tema.create({ nombre: 'Tema 2' })  
        idTema1 = tema1._id
        idTema2 = tema2._id
      });    

      it("debe actualizar un tema correctamente", async() => {
        tema = { nombre: "Tema 3" }
        const res = await request(app).put(url + idTema1).send(tema)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')      
        expect(res.body.data.data._id).toBeDefined()
        expect(res.body.data.data.nombre).toBe(tema.nombre)    
      })  

      it("debe devolver un error 500 al intentar actualizar un tema con un nombre existente", async() => {
        tema = { nombre: "Tema 3" }
        const res = await request(app).put(url + idTema2).send(tema)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un tema con un nombre inferior a 3 caracteres", async() => {
        const tema = { nombre: "aa" }
        const res = await request(app).put(url + idTema2).send(tema)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un tema con un nombre superior a 60 caracteres", async() => {        
        const tema = { nombre: new Array(62).join('a') }
        const res = await request(app).put(url + idTema2).send(tema)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 404 si no existe el tema", async() => {
        const id = mongoose.Types.ObjectId();
        const tema = { nombre: "aaaaa" }
        const res = await request(app).put(url + id).send(tema)

        expect(res.statusCode).toBe(404)
      })
    }) 
})