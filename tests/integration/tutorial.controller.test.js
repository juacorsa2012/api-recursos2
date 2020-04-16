const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Tutorial = require("../../models/tutorial.model")
const Tema = require("../../models/tema.model")
const Fabricante = require("../../models/fabricante.model")
const Idioma = require("../../models/idioma.model")

const url = "/api/v1/tutoriales/"
const urlTutorialesPorTema = url + "estadisticas/temas"
const urlTutoriaesPorPublicado   = url + "estadisticas/publicado"
const urlTutorialesPorFabricante = url + "estadisticas/fabricante"
const urlTutorialesPorIdioma     = url + "estadisticas/idiomas"

let limitePublicado = 2010

describe('/api/v1/tutoriales', () => {   
    describe('GET /', () => {    
        let tema
        let idioma
        let fabricante
  
        beforeAll(async () => {
          await Tutorial.deleteMany()
          await Tema.deleteMany()
          await Fabricante.deleteMany()
          await Idioma.deleteMany()        
          tema = await Tema.create({ "nombre": "Tema 1" })
          idioma = await Idioma.create({ "nombre": "Idioma 1" })
          fabricante = await Fabricante.create({ "nombre": "Fabricante 1" })          
        });
  
        it("debe devolver todos los tutoriales", async () => {                
            await Tutorial.create({ 
                "titulo": "Titulo test",                
                "observaciones": "Observaciones Test",
                "duracion" : 200,
                "publicado": 2020,
                "tema"  : tema._id,
                "idioma": idioma._id,
                "fabricante": fabricante._id
            })
  
            const res = await request(app).get(url);
  
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')
            expect(res.body.results).toBeDefined()            
            expect(Array.isArray(res.body.data.data)).toBeTruthy()
            expect(res.body.data.data[0]['titulo']).toBeDefined()                   
         })  
    })

    describe('GET /:id', () => {
        let id
        let tutorial

        beforeAll(async () => {            
            await Tutorial.deleteMany()
            await Tema.deleteMany()
            await Fabricante.deleteMany()
            await Idioma.deleteMany()
            tema = await Tema.create({ "nombre": "Tema 1" })
            idioma = await Idioma.create({ "nombre": "Idioma 1" })
            fabricante = await Fabricante.create({ "nombre": "Fabricante 1" })          
           
            tutorial = {                    
                "titulo": "Titulo Test",                
                "publicado": 2020,
                "duracion" : 200,
                "tema"     : tema._id,
                "idioma"   : idioma._id,
                "fabricante": fabricante._id,
                "observaciones": "Observaciones test"
            }          

            data = await Tutorial.create(tutorial)
            id = data._id
        })

        it("debe devolver un tutorial", async() => {
            const res = await request(app).get(url + id)
  
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')      
            expect(res.body.data.data['titulo']).toBe(tutorial.titulo)
            expect(res.body.data.data['publicado']).toBe(tutorial.publicado)
            expect(res.body.data.data['duracion']).toBe(tutorial.duracion)
            expect(res.body.data.data['observaciones']).toBe(tutorial.observaciones)            
            expect(res.body.data.data['_id']).toBeDefined()             
        })
  
        it("debe devolver un error 404 si el tutorial no existe", async() => {
            const id = mongoose.Types.ObjectId();
            const res = await request(app).get(url + id)
  
            expect(res.statusCode).toBe(404)
        })
    
        it("debe devolver un error 500 si el libro no existe", async() => {
            const res = await request(app).get(url + '1')
            
            expect(res.statusCode).toBe(500)      
        })  
   })

   describe('POST /', () => {
        let tema
        let tutorial
        let idioma
        let fabricante

        beforeAll(async () => {            
            await Tutorial.deleteMany()
            await Tema.deleteMany()
            await Fabricante.deleteMany()
            await Idioma.deleteMany()
            tema = await Tema.create({ "nombre": "Tema 1" })
            idioma = await Idioma.create({ "nombre": "Idioma 1" })
            fabricante = await Fabricante.create({ "nombre": "Fabricante 1" })          

            tutorial = {                    
                "titulo": "Titulo Test",                
                "publicado": 2020,
                "duracion" : 200,
                "tema"     : tema._id,
                "idioma"   : idioma._id,
                "fabricante": fabricante._id,
                "observaciones": "Observaciones test"
            }          
        })

        it("debe registrar un tutorial", async () => {          
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')
            expect(res.body.data.data._id).toBeDefined()
            expect(res.body.data.data.created_at).toBeDefined()
            expect(res.body.data.data.tema).toBeDefined()
            expect(res.body.data.data.idioma).toBeDefined()
            expect(res.body.data.data.fabricante).toBeDefined()
            expect(res.body.data.data.titulo).toBe(tutorial.titulo)            
            expect(res.body.data.data.observaciones).toBe(tutorial.observaciones)   
            expect(res.body.data.data.publicado).toBe(tutorial.publicado)            
            expect(res.body.data.data.paginas).toBe(tutorial.paginas)        
        })

        it("debe registrar un tutorial aunque no se faciliten las observaciones", async () => {
            tutorial.observaciones = ""
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')            
        })

        it("Debería devolver un error 500 cuando no se facilita el titulo del tutorial", async () => {
            tutorial.titulo = ""
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita el tema del tutorial", async () => {
            tutorial.tema = ""
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita el idioma del tutorial", async () => {
            tutorial.idioma = ""
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita el fabricante del tutorial", async () => {
            tutorial.fabricante = ""
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 si la duración es 0", async () => {
            tutorial.duracion = 0
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 si la duración es inferior a 0", async () => {
            tutorial.duracion = -1
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 si la publicación es anterior a 2010", async () => {
            tutorial.publicado = limitePublicado - 1
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 si la publicación es superior al año actual", async () => {
            const now = new Date()        
            tutorial.publicado = now.getFullYear() + 1
            const res = await request(app).post(url).send(tutorial)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
   })

   describe('PUT /:id', () => {
        let tutorial
        let id

        beforeAll(async () => {            
            await Tutorial.deleteMany()
            await Tema.deleteMany()
            await Fabricante.deleteMany()
            await Idioma.deleteMany()
            tema = await Tema.create({ "nombre": "Tema 1" })
            idioma = await Idioma.create({ "nombre": "Idioma 1" })
            fabricante = await Fabricante.create({ "nombre": "Fabricante 1" })          

            tutorial = {                    
                "titulo": "Titulo Test",                
                "publicado": 2020,
                "duracion" : 200,
                "tema"     : tema._id,
                "idioma"   : idioma._id,
                "fabricante": fabricante._id,
                "observaciones": "Observaciones test"
            }          

            const data = await Tutorial.create(tutorial)
            id = data._id    
        })

        it("debe actualizar un tutorial", async() => {          
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')      
            expect(res.body.data.data._id).toBeDefined()
            expect(res.body.data.data.fabricante).toBeDefined()
            expect(res.body.data.data.tema).toBeDefined()
            expect(res.body.data.data.idioma).toBeDefined()
            expect(res.body.data.data.titulo).toBe(tutorial.titulo)   
            expect(res.body.data.data.observaciones).toBe(tutorial.observaciones)
            expect(res.body.data.data.publicado).toBe(tutorial.publicado)
            expect(res.body.data.data.duracion).toBe(tutorial.duracion)
          })  

          it("debe actualizar un tutorial sin observaciones", async() => {                      
            tutorial.observaciones = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')                    
          })  
    
          it("debe devolver un error 500 al intentar actualizar un tutorial sin titulo", async() => {            
            tutorial.titulo = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  
    
          it("debe devolver un error 500 al intentar actualizar un tutorial sin año de publicación", async() => {            
            tutorial.publicado = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un tutorial sin duración", async() => {            
            tutorial.duracion = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un tutorial sin tema", async() => {            
            tutorial.tema = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un tutorial sin idioma", async() => {            
            tutorial.idioma = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al intentar actualizar un tutorial sin fabricante", async() => {
            tutorial.fabricante = ""
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al actualizar un tutorial sin duracion", async() => {
            tutorial.duracion = 0
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al actualizar un tutorial con duracion inferior a 0", async() => {
            tutorial.duracion = -1
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al actualizar un tutorial con año de publicación anterior a 2010", async() => {
            tutorial.publicado = limitePublicado - 1
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  

          it("debe devolver un error 500 al actualizar un tutorial con año de publicación futuro", async() => {
            const now = new Date()
            tutorial.publicado = now.getFullYear() + 1
            const res = await request(app).put(url + id).send(tutorial)
    
            expect(res.statusCode).toBe(500)          
          })  
   })

   describe('GET /estadisticas', () => {    
        it("debe devolver la estadísticas de los tutoriales por temas", async() => {               
            const res = await request(app).get(urlTutorialesPorTema)

            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBeDefined()        
            expect(res.body.count).toBeDefined()
            expect(res.body.data).toBeDefined()                
        })  

        it("debe devolver la estadísticas de los tutoriales por idiomas", async() => {               
            const res = await request(app).get(urlTutorialesPorIdioma)
    
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBeDefined()        
            expect(res.body.count).toBeDefined()
            expect(res.body.data).toBeDefined()                
        })  

        it("debe devolver la estadísticas de los tutoriales por editoriales", async() => {               
            const res = await request(app).get(urlTutorialesPorFabricante)
    
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBeDefined()        
            expect(res.body.count).toBeDefined()
            expect(res.body.data).toBeDefined()                
        })  

        it("debe devolver la estadísticas de los tutoriales por año de publicación", async() => {               
            const res = await request(app).get(urlTutoriaesPorPublicado)
    
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBeDefined()        
            expect(res.body.count).toBeDefined()
            expect(res.body.data).toBeDefined()                
        })    
   })
})