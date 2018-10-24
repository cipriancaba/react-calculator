import { calculate } from './CalculatorOperations'

describe('Calculator algebric operations', () => {
  describe('ADD', () => {
    it('Adds two integer numbers', () => {
      const result = calculate(10, 20, 'ADD')
      expect(result).toBe(30)
    })

    it('Adds two float numbers', () => {
      const result = calculate(0.1, 0.2, 'ADD')
      expect(result).toBeCloseTo(0.3)
    })

    it('Adds two float negative numbers', () => {
      const result = calculate(-0.1, -0.2, 'ADD')
      expect(result).toBeCloseTo(-0.3)
    })

    it('Adds two large negative numbers', () => {
      const result = calculate(-454534543543543534543543.1, -3453534535345435345435340.2, 'ADD')
      expect(result).toBeCloseTo(-3.908069078888979e24)
    })

    it('Adds to infinity', () => {
      const result = calculate(Number.MAX_VALUE, Number.MAX_VALUE, 'ADD')
      expect(result).toBe(Infinity)
    })

    it('Does not add strings', () => {
      const result = calculate('asddsa', 3, 'ADD')
      expect(result).toBe(NaN)
    })
  })

  describe('SUBSTRACT', () => {
    it('Substracts two integer numbers', () => {
      const result = calculate(10, 20, 'SUBSTRACT')
      expect(result).toBe(-10)
    })

    it('Substracts two float numbers', () => {
      const result = calculate(0.1, 0.2, 'SUBSTRACT')
      expect(result).toBeCloseTo(-0.1)
    })

    it('Substracts two float negative numbers', () => {
      const result = calculate(-0.1, -0.2, 'SUBSTRACT')
      expect(result).toBeCloseTo(0.1)
    })

    it('Substracts two low negative numbers', () => {
      const result = calculate(-454534543543543534543543.1, -3453534535345435345435340.2, 'SUBSTRACT')
      expect(result).toBeCloseTo(2.9989999918018914e24)
    })

    it('Substracts to infinity', () => {
      const result = calculate(-Number.MAX_VALUE, Number.MAX_VALUE, 'SUBSTRACT')
      expect(result).toBe(-Infinity)
    })

    it('Does not substract strings', () => {
      const result = calculate('asddsa', 3, 'SUBSTRACT')
      expect(result).toBe(NaN)
    })
  })

  describe('MULTIPLY', () => {
    it('Multiplies two integer numbers', () => {
      const result = calculate(10, 20, 'MULTIPLY')
      expect(result).toBe(200)
    })

    it('Multiplies two float numbers', () => {
      const result = calculate(0.1, 0.2, 'MULTIPLY')
      expect(result).toBeCloseTo(0.02)
    })

    it('Multiplies two float negative numbers', () => {
      const result = calculate(-0.1, -0.2, 'MULTIPLY')
      expect(result).toBeCloseTo(0.02)
    })

    it('Multiplies two low negative numbers', () => {
      const result = calculate(-454534543543543534543543.1, -3453534535345435345435340.2, 'MULTIPLY')
      expect(result).toBeCloseTo(1.569750743635101e48)
    })

    it('Multiplies to infinity', () => {
      const result = calculate(-Number.MAX_VALUE, Number.MAX_VALUE, 'MULTIPLY')
      expect(result).toBe(-Infinity)
    })

    it('Does not multiply strings', () => {
      const result = calculate('asddsa', 3, 'MULTIPLY')
      expect(result).toBe(NaN)
    })
  })

  describe('DIVIDE', () => {
    it('Divides two integer numbers', () => {
      const result = calculate(10, 20, 'DIVIDE')
      expect(result).toBe(0.5)
    })

    it('Divides two float numbers', () => {
      const result = calculate(0.1, 0.2, 'DIVIDE')
      expect(result).toBeCloseTo(0.5)
    })

    it('Divides two float negative numbers', () => {
      const result = calculate(-0.1, -0.2, 'DIVIDE')
      expect(result).toBeCloseTo(0.5)
    })

    it('Divides two low negative numbers', () => {
      const result = calculate(-454534543543543534543543.1, -3453534535345435345435340.2, 'DIVIDE')
      expect(result).toBeCloseTo(0.13161430380718037)
    })

    it('Divides with 0', () => {
      const result = calculate(Number.MAX_VALUE, 0, 'DIVIDE')
      expect(result).toBe(Infinity)
    })

    it('Does not divide strings', () => {
      const result = calculate('asddsa', 3, 'DIVIDE')
      expect(result).toBe(NaN)
    })
  })
})
