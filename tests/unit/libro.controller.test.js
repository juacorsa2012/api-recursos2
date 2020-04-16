const LibroController = require("./../../controllers/Libro.controller")

describe("LibroController", () => {    
  it("debería existir un función llamada obtenerLibros", () => {
    expect(typeof LibroController.obtenerLibros).toBe("function")
  })
  it("debería existir un función llamada obtenerLibro", () => {
    expect(typeof LibroController.obtenerLibro).toBe("function")
  })
  it("debería existir un función llamada crearLibro", () => {
    expect(typeof LibroController.crearLibro).toBe("function")
  })
  it("debería existir un función llamada actualizarLibro", () => {
    expect(typeof LibroController.actualizarLibro).toBe("function")
  })
  it("debería existir un función llamada obtenerLibrosPorTema", () => {
    expect(typeof LibroController.obtenerLibrosPorTema).toBe("function")
  })
  it("debería existir un función llamada obtenerLibrosPorTemaPublicado", () => {
    expect(typeof LibroController.obtenerLibrosPorTemaPublicado).toBe("function")
  })
  it("debería existir un función llamada obtenerLibrosPorTema", () => {
    expect(typeof LibroController.obtenerLibrosPorTema).toBe("function")
  })
  it("debería existir un función llamada obtenerLibrosPorEditorial", () => {
    expect(typeof LibroController.obtenerLibrosPorEditorial).toBe("function")
  })
  it("debería existir un función llamada obtenerLibrosEditorialPublicado", () => {
    expect(typeof LibroController.obtenerLibrosPorEditorialPublicado).toBe("function")
  })
  it("debería existir un función llamada obtenerLibrosPor", () => {
    expect(typeof LibroController.obtenerLibrosPorTema).toBe("function")
  })
})