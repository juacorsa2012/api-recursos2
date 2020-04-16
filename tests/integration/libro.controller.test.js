const request = require("supertest")
const mongoose = require("mongoose")
const app  = require("../../app")
const Libro = require("../../models/libro.model")
const Tema = require("../../models/tema.model")
const Editorial = require("../../models/editorial.model")
const Idioma = require("../../models/idioma.model")

const url = "/api/v1/libros/"
const urlLibrosPorTema = url + "estadisticas/temas"
const urlLibrosPorPublicado = url + "estadisticas/publicado"
const urlLibrosPorEditorial = url + "estadisticas/editorial"
const urlLibrosPorIdioma    = url + "estadisticas/idioma"
const urlLibrosPorTemaPublicado = url + "estadisticas/tema/publicado"
const urlLibrosPorEditorialPublicado = url + "estadisticas/editorial/publicado"

let limitePublicado = 2010

describe('/api/v1/libros', () => {   
    describe('GET /', () => {    
        let tema
        let idioma
        let editorial
  
        beforeAll(async () => {
          await Libro.deleteMany()
          await Tema.deleteMany()
          await Editorial.deleteMany()
          await Idioma.deleteMany()        
          tema = await Tema.create({ "nombre": "Tema 1" })
          idioma = await Idioma.create({ "nombre": "Idioma 1" })
          editorial = await Editorial.create({ "nombre": "Editorial 1" })          
        });
  
        it("debe devolver todos los libros", async () => {                
            await Libro.create({ 
                "titulo": "Titulo test",                
                "observaciones": "Observaciones Test",
                "paginas"  : 200,
                "publicado": 2020,
                "tema"  : tema._id,
                "idioma": idioma._id,
                "editorial": editorial._id
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
        let libro

        beforeAll(async () => {            
            await Libro.deleteMany()
            await Tema.deleteMany()
            await Editorial.deleteMany()
            await Idioma.deleteMany()
            tema = await Tema.create({ "nombre": "Tema 1" })
            idioma = await Idioma.create({ "nombre": "Idioma 1" })
            editorial = await Editorial.create({ "nombre": "Editorial 1" })          
           
            libro = {                    
                "titulo": "Titulo Test",                
                "publicado": 2020,
                "paginas"  : 200,
                "tema"  : tema._id,
                "idioma": idioma._id,
                "editorial": editorial._id,
                "observaciones": "Observaciones test"
            }          

            _libro = await Libro.create(libro)
            id = _libro._id
        })

        it("debe devolver un libro", async() => {
            const res = await request(app).get(url + id)
  
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')      
            expect(res.body.data.data['titulo']).toBe(libro.titulo)          
            expect(res.body.data.data['_id']).toBeDefined()                 
            
        })
  
        it("debe devolver un error 404 si el libro no existe", async() => {
            const id = mongoose.Types.ObjectId();
            const res = await request(app).get(url + id)
  
            expect(res.statusCode).toBe(404)
        })
    
        it("debe devolver un error 500 si no existe el libro", async() => {
            const res = await request(app).get(url + '1')
            
            expect(res.statusCode).toBe(500)      
        })  
   })

   describe('POST /', () => {
        let tema
        let libro
        let idioma
        let editorial

        beforeAll(async () => {            
            await Tema.deleteMany()
            await Editorial.deleteMany()
            await Idioma.deleteMany()
            tema = await Tema.create({ "nombre": "Tema 1" })
            idioma = await Idioma.create({ "nombre": "Idioma 1" })
            editorial = await Editorial.create({ "nombre": "Editorial 1" })          

            libro = {                    
                "titulo": "Titulo Test",                
                "tema"  : tema._id,
                "idioma": idioma._id,
                "editorial": editorial._id,
                "observaciones": "Observaciones test",
                "publicado": 2020,
                "paginas"  : 200        
            }          
        })

        it("debe registrar un libro", async () => {          
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')
            expect(res.body.data.data._id).toBeDefined()
            expect(res.body.data.data.created_at).toBeDefined()
            expect(res.body.data.data.tema).toBeDefined()
            expect(res.body.data.data.idioma).toBeDefined()
            expect(res.body.data.data.editorial).toBeDefined()
            expect(res.body.data.data.titulo).toBe(libro.titulo)            
            expect(res.body.data.data.observaciones).toBe(libro.observaciones)   
            expect(res.body.data.data.publicado).toBe(libro.publicado)            
            expect(res.body.data.data.paginas).toBe(libro.paginas)        
        })

        it("debe registrar un libro aunque no se faciliten las observaciones", async () => {
            libro.observaciones = ""
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(201)
            expect(res.body.status).toBe('success')            
        })

        it("Debería devolver un error 500 cuando no se facilita el titulo del libro", async () => {
            libro.titulo = ""
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita el tema del libro", async () => {
            libro.tema = ""
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita el idioma del libro", async () => {
            libro.idioma = ""
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando no se facilita la editorial del libro", async () => {
            libro.editorial = ""
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando el número de páginas es inferior a 1", async () => {
            libro.paginas = 0
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })

        it("Debería devolver un error 500 cuando el año de publicación es anterior a 2010", async () => {
            libro.publicado = limitePublicado - 1
            const res = await request(app).post(url).send(libro)

            expect(res.statusCode).toBe(500)      
            expect(res.error).toBeTruthy()      
        })
   })

   describe('PUT /:id', () => {
    let libro;
    let id;

    beforeAll(async () => {            
        await Libro.deleteMany()
        await Tema.deleteMany()
        await Editorial.deleteMany()
        await Idioma.deleteMany()
        const tema = await Tema.create({ "nombre": "Tema 1" })
        const idioma = await Idioma.create({ "nombre": "Idioma 1" })
        const editorial = await Editorial.create({ "nombre": "Editorial 1" })          

        libro = {                    
            "titulo": "Titulo Test",                
            "tema"  : tema._id,
            "idioma": idioma._id,
            "editorial": editorial._id,
            "observaciones": "Observaciones test",
            "publicado": 2020,
            "paginas"  : 200        
        }          

        const data = await Libro.create(libro)
        id = data._id 
    });    

    it("debe actualizar un libro", async() => {          
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')      
        expect(res.body.data.data._id).toBeDefined()
        expect(res.body.data.data.editorial).toBeDefined()
        expect(res.body.data.data.tema).toBeDefined()
        expect(res.body.data.data.idioma).toBeDefined()
        expect(res.body.data.data.titulo).toBe(libro.titulo)   
        expect(res.body.data.data.observaciones).toBe(libro.observaciones)
        expect(res.body.data.data.publicado).toBe(2020)
        expect(res.body.data.data.paginas).toBe(200)        
      })  

      it("debe actualizar un libro sin observaciones", async() => {                      
        libro.observaciones = ""
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')                    
      })  

      it("debe devolver un error 500 al intentar actualizar un libro sin titulo", async() => {            
        libro.titulo = ""
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro sin tema", async() => {
        libro.tema = ""
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro sin idioma", async() => {
        libro.idioma = ""
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro sin editorial", async() => {
        libro.editorial = ""
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro cuyo tema no existe", async() => {
        libro.tema = mongoose.Types.ObjectId()
        const res = await request(app).put(url + id).send(libro)            

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro cuyo idioma no existe", async() => {
        libro.idioma = mongoose.Types.ObjectId()
        const res = await request(app).put(url + id).send(libro)            

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro cuya editorial no existe", async() => {
        libro.editorial = mongoose.Types.ObjectId()
        const res = await request(app).put(url + id).send(libro)            

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro con un id incorrecto", async() => {
        const res = await request(app).put(url + '1').send(libro)            

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro inexistente", async() => {
        const id  = mongoose.Types.ObjectId()
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro publicado antes de 2010", async() => {
        libro.publicado = limitePublicado - 1
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro con 0 paginas", async() => {
        libro.paginas = 0
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  

      it("debe devolver un error 500 al intentar actualizar un libro publicado en un año futuro", async() => {
        const now = new Date()        
        libro.publicado = now.getFullYear() + 1
        const res = await request(app).put(url + id).send(libro)

        expect(res.statusCode).toBe(500)          
      })  
   })

   describe('GET /estadisticas', () => {    
    it("debe devolver la estadísticas de los libros por temas", async() => {               
        const res = await request(app).get(urlLibrosPorTema)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBeDefined()        
        expect(res.body.libros).toBeDefined()
        expect(res.body.data).toBeDefined()                
    })  

    it("debe devolver la estadísticas de los libros por idiomas", async() => {               
        const res = await request(app).get(urlLibrosPorIdioma)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBeDefined()        
        expect(res.body.count).toBeDefined()
        expect(res.body.data).toBeDefined()                
    })  

    it("debe devolver la estadísticas de los libros por editoriales", async() => {               
        const res = await request(app).get(urlLibrosPorEditorial)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBeDefined()        
        expect(res.body.count).toBeDefined()
        expect(res.body.data).toBeDefined()                
    })  

    it("debe devolver la estadísticas de los libros por año de publicación", async() => {               
        const res = await request(app).get(urlLibrosPorPublicado)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBeDefined()        
        expect(res.body.count).toBeDefined()
        expect(res.body.data).toBeDefined()                
    })  

    it("debe devolver la estadísticas de los libros por editoriales y años de publicación", async() => {               
        const res = await request(app).get(urlLibrosPorEditorialPublicado)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBeDefined()        
        expect(res.body.count).toBeDefined()
        expect(res.body.data).toBeDefined()                
    })  

    it("debe devolver la estadísticas de los libros por temas y años de publicación", async() => {               
        const res = await request(app).get(urlLibrosPorTemaPublicado)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBeDefined()        
        expect(res.body.count).toBeDefined()
        expect(res.body.data).toBeDefined()                
    })  
   })
})