const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Fabricante = require("../../models/fabricante.model")

const url = "/api/v1/fabricantes/"

describe('/api/v1/fabricantes', () => {
    describe('GET /', () => {
        beforeAll(async () => {
          await Fabricante.deleteMany()
          await Fabricante.create({ nombre: 'Fabricante 1' })  
        });

        it("debe devolver todos los fabricantes", async () => {
          const res = await request(app).get(url);

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')
          expect(res.body.results).toBeDefined()            
          expect(Array.isArray(res.body.data.data)).toBeTruthy()
          expect(res.body.data.data[0]['nombre']).toBeDefined()                
        })  
    })

    describe('GET /:id', () => {
      let fabricante

      beforeAll(async () => {
        await Fabricante.deleteMany()
        fabricante = await Fabricante.create({ nombre: 'Fabricante 1' })  
      });

      it("debe devolver un fabricante", async() => {
        const res = await request(app).get(url + fabricante._id)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')      
        expect(res.body.data.data['nombre']).toBe(fabricante.nombre)
        expect(res.body.data.data['_id']).toBeDefined()      
      })

      it("debe devolver un error 404 si no existe el fabricante", async() => {
        const id = mongoose.Types.ObjectId();
        const res = await request(app).get(url + id)

        expect(res.statusCode).toBe(404)
      })

      it("debe devolver un error 500 si no existe el fabricante", async() => {
        const res = await request(app).get(url + '1')

        expect(res.statusCode).toBe(500)      
      })  
  })    
    
  describe('POST /', () => {
    let fabricante = { nombre: "Fabricante 1" }

    beforeAll(async () => {
      await Fabricante.deleteMany()          
    });

    it("debe devolver un fabricante ", async () => {
      const res = await request(app).post(url).send(fabricante)

      expect(res.statusCode).toBe(201)
      expect(res.body.status).toBe('success')
      expect(res.body.data.data.nombre).toBe(fabricante.nombre)   
      expect(res.body.data.data._id).toBeDefined()    
    })

    it("Debería devolver un error 500 cuando no se facilita el nombre del fabricante", async () => {
      fabricante.nombre = ""
      const res = await request(app).post(url).send(fabricante)

      expect(res.statusCode).toBe(500)      
      expect(res.error).toBeTruthy()      
    })

    it("Debería devolver un error 500 cuando el nombre es inferior a 3 caracteres", async () => {
      fabricante.nombre = "aa"
      const res = await request(app).post(url).send(fabricante)

      expect(res.statusCode).toBe(500)      
      expect(res.error).toBeTruthy()      
    })
    
    it("Debería devolver un error 500 cuando el nombre es superior a 60 caracteres", async () => {
      fabricante. nombre = new Array(62).join('a');
      const res = await request(app).post(url).send(fabricante)

      expect(res.statusCode).toBe(500)      
      expect(res.error).toBeTruthy()      
    })     
  })
  describe('PUT /:id', () => {
      let idFabricante1
      let idFabricante2 
      let fabricante   

      beforeAll(async () => {
        await Fabricante.deleteMany()
        const fabricante1 = await Fabricante.create({ nombre: 'Fabricante 1' })  
        const fabricante2 = await Fabricante.create({ nombre: 'Fabricante 2' })  
        idFabricante1 = fabricante1._id
        idFabricante2 = fabricante2._id
      });    


      it("debe actualizar un fabricante", async() => {
        const fabricante = { nombre: "Fabricante 3" }
        const res = await request(app).put(url + idFabricante1).send(fabricante)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')      
        expect(res.body.data.data._id).toBeDefined()
        expect(res.body.data.data.nombre).toBe(fabricante.nombre)    
      })  
  
      it("debe devolver un error 500 al intentar actualizar un fabricante con un nombre existente", async() => {
        fabricante = { nombre: 'Fabricante 3' }
        const res = await request(app).put(url + idFabricante2).send(fabricante)

        expect(res.statusCode).toBe(500)          
      })  
  
      it("debe devolver un error 500 al intentar actualizar un fabricante con un nombre inferior a 3 caracteres", async() => {
        fabricante = { nombre: "aa" }
        const res = await request(app).put(url + idFabricante1).send(fabricante)

        expect(res.statusCode).toBe(500)          
      })  
  
      it("debe devolver un error 500 al intentar actualizar un fabricante con un nombre superior a 60 caracteres", async() => {        
        fabricante = { nombre: new Array(62).join('a') }
        const res = await request(app).put(url + idFabricante1).send(fabricante)

        expect(res.statusCode).toBe(500)          
      })  
  
      it("debe devolver un error 500 si no existe el fabricante", async() => {
        const id = mongoose.Types.ObjectId();
        fabricante = { nombre: "aa" }
        const res = await request(app).put(url + id).send(fabricante)

        expect(res.statusCode).toBe(500)
      })
  })  
})