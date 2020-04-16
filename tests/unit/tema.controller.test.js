const TemaController = require("./../../controllers/tema.controller")

describe("TemaController", () => {    
  it("debería existir un función llamada obtenerTemas", () => {
    expect(typeof TemaController.obtenerTemas).toBe("function")
  })
  it("debería existir un función llamada obtenerTema", () => {
    expect(typeof TemaController.obtenerTema).toBe("function")
  })
  it("debería existir un función llamada crearTema", () => {
    expect(typeof TemaController.crearTema).toBe("function")
  })
  it("debería existir un función llamada actualizarTema", () => {
    expect(typeof TemaController.actualizarTema).toBe("function")
  })
})