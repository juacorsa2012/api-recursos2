const TutorialController = require("./../../controllers/tutorial.controller")

describe("TutorialController", () => {    
    it("debería existir un función llamada obtenerTutoriales", () => {
      expect(typeof TutorialController.obtenerTutoriales).toBe("function")
    })
    it("debería existir un función llamada obtenerTutorial", () => {
      expect(typeof TutorialController.obtenerTutorial).toBe("function")
    })
    it("debería existir un función llamada crearTutorial", () => {
      expect(typeof TutorialController.crearTutorial).toBe("function")
    })
    it("debería existir un función llamada actualizarTutorial", () => {
      expect(typeof TutorialController.actualizarTutorial).toBe("function")
    })
    it("debería existir un función llamada obtenerTutorialesPorFabricante", () => {
        expect(typeof TutorialController.obtenerTutorialesPorFabricante).toBe("function")
    })  
    it("debería existir un función llamada obtenerTutorialesPorIdioma", () => {
        expect(typeof TutorialController.obtenerTutorialesPorIdioma).toBe("function")
    })
    it("debería existir un función llamada obtenerTutorialesPorPublicado", () => {
        expect(typeof TutorialController.obtenerTutorialesPorPublicado).toBe("function")
    })
    it("debería existir un función llamada obtenerTutorialesPorTemaFabricante", () => {
        expect(typeof TutorialController.obtenerTutorialesPorTemaFabricante).toBe("function")
    })
    it("debería existir un función llamada obtenerTutorialesPorTemaIdioma", () => {
        expect(typeof TutorialController.obtenerTutorialesPorTemaIdioma).toBe("function")
    })
    it("debería existir un función llamada obtenerTutorialesPorTemaPublicado", () => {
        expect(typeof TutorialController.obtenerTutorialesPorTemaPublicado).toBe("function")
    })
})  