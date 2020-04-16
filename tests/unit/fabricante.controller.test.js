const FabricanteController = require("../../controllers/fabricante.controller")

describe("FabricanteController", () => {    
  it("debería existir un función llamada obtenerFabricantes", () => {
    expect(typeof FabricanteController.obtenerFabricantes).toBe("function")
  })

  it("debería existir un función llamada obtenerFabricante", () => {
    expect(typeof FabricanteController.obtenerFabricante).toBe("function")
  })

  it("debería existir un función llamada crearFabricante", () => {
    expect(typeof FabricanteController.crearFabricante).toBe("function")
  })
  it("debería existir un función llamada actualizarFabricante", () => {
    expect(typeof FabricanteController.actualizarFabricante).toBe("function")
  })
})