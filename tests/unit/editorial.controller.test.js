const EditorialController = require("../../controllers/editorial.controller")

describe("EditorialController", () => {    
  it("debería existir un función llamada obtenerEditoriales", () => {
    expect(typeof EditorialController.obtenerEditoriales).toBe("function")
  })
  it("debería existir un función llamada obtenerEditorial", () => {
    expect(typeof EditorialController.obtenerEditorial).toBe("function")
  })
  it("debería existir un función llamada crearEditorial", () => {
    expect(typeof EditorialController.crearEditorial).toBe("function")
  })
  it("debería existir un función llamada actualizarEditorial", () => {
    expect(typeof EditorialController.actualizarEditorial).toBe("function")
  })
})