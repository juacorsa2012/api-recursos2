const numberFormat = require("./../../utils/number-format")

describe("Numberformat", () => {    
    it("debería devolver el valor pasado en formato cadena sin decimales", () => {
        const result = numberFormat(12, 0)
        expect(result).toMatch('12')
    })
    it("debería devolver el valor pasado en formato cadena con 2 decimales", () => {
        const result = numberFormat(12, 2)
        expect(result).toBe("12,00")
    })
    it("debería devolver el valor pasado en formato cadena con el punto decimal y sin decimales", () => {
        const result = numberFormat(1200, 0)
        expect(result).toBe("1.200")
    })
    it("debería devolver el valor pasado en formato cadena con el punto decimal y con 2 decimales", () => {
        const result = numberFormat(1200, 2)
        expect(result).toBe("1.200,00")
    })
})