const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Enlace = require("../../models/enlace.model")
const Tema = require("../../models/tema.model")
const url = "/api/v1/enlaces/"

describe('/api/v1/enlaces', () => {    
    describe('GET /', () => {
      let tema

      beforeAll(async () => {
        await Enlace.deleteMany()
        await Tema.deleteMany()
        tema = await Tema.create({ "nombre": "Tema 1" })
      });

      it("debe devolver todos los enlaces", async () => {                
          await Enlace.create({ 
              "titulo": "Enlace titulo test",
              "url": "www.google.es",
              "comentario": "Comentario test",
              "tema": tema._id
          })

          const res = await request(app).get(url);

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')
          expect(res.body.results).toBeDefined()            
          expect(Array.isArray(res.body.data.data)).toBeTruthy()
          expect(res.body.data.data[0]['titulo']).toBeDefined()                   
       })  
    })

    describe('POST /', () => {
        let enlace;

        beforeAll(async () => {            
            await Tema.deleteMany()
            const tema = await Tema.create({ "nombre": "Tema 1" })            
            enlace = {                    
                "titulo": "Enlace Test",
                "url"   : "www.test.es",
                "tema"  : tema._id,
                "comentario": "Comentario test"                
            }          
        })

        it("debe registrar un enlace", async () => {          
            const res = await request(app).post(url).send(enlace)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')
            expect(res.body.data.data._id).toBeDefined()
            expect(res.body.data.data.created_at).toBeDefined()
            expect(res.body.data.data.tema).toBeDefined()
            expect(res.body.data.data.titulo).toBe(enlace.titulo)
            expect(res.body.data.data.url).toBe(enlace.url)
            expect(res.body.data.data.comentario).toBe(enlace.comentario)                     
        })

        it("debe registrar un enlace aunque no se faciliten los comentarios", async () => {
            enlace.comentario = ""
            const res = await request(app).post(url).send(enlace)            

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')            
        })

        it("Debería devolver un error 500 cuando no se facilita el titulo del enlace", async () => {
            enlace.titulo = ""
            const res = await request(app).post(url).send(enlace)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita la url del enlace", async () => {
            enlace.url = ""
            const res = await request(app).post(url).send(enlace)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita el tema del enlace", async () => {
            enlace.tema = ""
            const res = await request(app).post(url).send(enlace)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
    })    
    
    describe('GET /:id', () => {
        let enlace;
        let id;

        beforeAll(async () => {            
            await Tema.deleteMany()
            const tema = await Tema.create({ "nombre": "Tema 1" })            
            enlace = {                    
                "titulo": "Enlace Test",
                "url"   : "www.test.es",
                "tema"  : tema._id,
                "comentario": "Comentario test"                
            }          

            const _enlace = await Enlace.create(enlace)
            id = _enlace._id
        })

        it("debe devolver un enlace", async() => {
          const res = await request(app).get(url + id)

          expect(res.statusCode).toBe(200)
          expect(res.body.status).toBe('success')      
          expect(res.body.data.data['titulo']).toBe(enlace.titulo)          
          expect(res.body.data.data['_id']).toBeDefined()      
          expect(res.body.data.data['url']).toBeDefined()      
          expect(res.body.data.data['comentario']).toBeDefined()                    
        })
  
        it("debe devolver un error 404 si no existe el enlace", async() => {
          const id = mongoose.Types.ObjectId();
          const res = await request(app).get(url + id)

          expect(res.statusCode).toBe(404)
        })
  
        it("debe devolver un error 500 si no existe el enlace", async() => {
          const res = await request(app).get(url + '1')
          
          expect(res.statusCode).toBe(500)      
        })  
    }) 

    describe('PUT /:id', () => {        
        let enlace;
        let id;

        beforeAll(async () => {            
            await Tema.deleteMany()
            const tema = await Tema.create({ "nombre": "Tema 1" })            
            enlace = {                    
                "titulo": "Enlace 1",
                "url"   : "www.google.es",
                "tema"  : tema._id,
                "comentario": "Comentario test"                
            }      

            const _enlace = await Enlace.create(enlace)
            id = _enlace._id    
        });    

        it("debe actualizar un enlace", async() => {          
            const res = await request(app).put(url + id).send(enlace)         
 
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')      
            expect(res.body.data.data._id).toBeDefined()
            expect(res.body.data.data.titulo).toBe(enlace.titulo)   
            expect(res.body.data.data.url).toBe(enlace.url)   
            expect(res.body.data.data.comentario).toBe(enlace.comentario)   
          })  

          it("debe actualizar un enlace aunque no se facilite la descripcion", async() => {                      
            enlace.descripcion = ""
            const res = await request(app).put(url + id).send(enlace)         
 
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')      
            expect(res.body.data.data._id).toBeDefined()
            expect(res.body.data.data.titulo).toBe(enlace.titulo)   
            expect(res.body.data.data.url).toBe(enlace.url)             
          })  

          it("debe devolver un error 500 al intentar actualizar un enlace sin titulo", async() => {            
            enlace.titulo = ""
            const res = await request(app).put(url + id).send(enlace)
  
            expect(res.statusCode).toBe(500)          
          })  
  
          it("debe devolver un error 500 al intentar actualizar un enlace sin url", async() => {
            enlace.url = ""
            const res = await request(app).put(url + id).send(enlace)            
  
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un enlace sin tema", async() => {
            enlace.tema = ""
            const res = await request(app).put(url + id).send(enlace)            
  
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un enlace cuyo tema no existe", async() => {
            enlace.tema = mongoose.Types.ObjectId()
            const res = await request(app).put(url + id).send(enlace)            
  
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un enlace con una url no válida", async() => {
            enlace.url = "ww.google.es"
            const res = await request(app).put(url + id).send(enlace)            
  
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un enlace con un id incorrecto", async() => {
            const res = await request(app).put(url + '1').send(enlace)            
  
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un enlace inexistente", async() => {
            const id  = mongoose.Types.ObjectId()
            const res = await request(app).put(url + id).send(enlace)            
  
            expect(res.statusCode).toBe(500)          
          })  
    })
})