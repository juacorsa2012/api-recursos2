const durationFormat = require("./../../utils/duration-format")

describe("DurationFormat", () => {    
    it("duration_format(50) devería devolver 0 horas(s) y 50 minuto(s).", () => {
        const result = durationFormat(50)        
        expect(result).toMatch('0 hora(s) y 50 minuto(s).')
    })
    it("duration_format(60) debería devolver 1 hora(s) y 0 minuto(s).", () => {
        const result = durationFormat(60)        
        expect(result).toMatch('1 hora(s) y 0 minuto(s).')
    })
    it("duration_format(90) debería devolver 1 hora(s) y 30 minuto(s).", () => {
        const result = durationFormat(90)        
        expect(result).toMatch('1 hora(s) y 30 minuto(s).')
    })
})