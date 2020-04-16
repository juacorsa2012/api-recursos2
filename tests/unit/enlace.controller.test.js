const EnlaceController = require("./../../controllers/enlace.controller")

describe("EnlaceController", () => {    
  it("debería existir un función llamada obtenerEnlaces", () => {
    expect(typeof EnlaceController.obtenerEnlaces).toBe("function")
  })
  it("debería existir un función llamada obtenerEnlace", () => {
    expect(typeof EnlaceController.obtenerEnlace).toBe("function")
  })
  it("debería existir un función llamada crearEnlace", () => {
    expect(typeof EnlaceController.crearEnlace).toBe("function")
  })
  it("debería existir un función llamada actualizarEnlace", () => {
    expect(typeof EnlaceController.actualizarEnlace).toBe("function")
  })
  it("debería existir un función llamada obtenerEnlacesPorTemas", () => {
    expect(typeof EnlaceController.obtenerEnlacesPorTemas).toBe("function")
  })
})