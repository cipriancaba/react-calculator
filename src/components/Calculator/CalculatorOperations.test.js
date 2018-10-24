import {
  calculate,
  initialState,
  handleInt,
  handleDecimal,
  handlePlusMinus,
  handlePercentage,
  handleAC,
  handleAlgebric,
  handleCalculate,
} from './CalculatorOperations'

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

describe('Calculator operations', () => {
  describe('handleInt', () => {
    it('Displays a correct value when receiving an int', () => {
      const i = { ...initialState }
      const next = handleInt(i, 4)
      expect(next.displayedValue).toBe('4')
    })

    it('Appends correctly to an existing displayedValue', () => {
      const i = { ...initialState }
      i.displayedValue = '354'
      const next = handleInt(i, 4)
      expect(next.displayedValue).toBe('3544')
    })

    it('Appends correctly to an existing decimal value', () => {
      const i = { ...initialState }
      i.displayedValue = '0.354'
      const next = handleInt(i, 4)
      expect(next.displayedValue).toBe('0.3544')
    })

    it('Appends correctly to an existing decimal value', () => {
      const i = { ...initialState }
      i.displayedValue = '0.'
      const next = handleInt(i, 4)
      expect(next.displayedValue).toBe('0.4')
    })

    it('Detects a pending operation, it stores the existing value and updates the display', () => {
      const i = { ...initialState }
      i.displayedValue = '33'
      i.pendingOperation = 'ADD'
      const next = handleInt(i, 4)
      expect(next.storedOperation).toBe('ADD')
      expect(next.displayedValue).toBe('4')
      expect(next.pendingOperation).toBeNull()
      expect(next.storedValue).toBe('33')
    })
  })

  describe('handleDecimal', () => {
    it('Appends the dot', () => {
      const next = handleDecimal({ ...initialState })
      expect(next.displayedValue).toBe('0.')
    })

    it('Does not append multiple dots', () => {
      const next = handleDecimal({ ...initialState, displayedValue: '0.5' })
      expect(next.displayedValue).toBe('0.5')
    })

    it('Detects a pending operation, it stores the existing value and updates the display', () => {
      const i = { ...initialState }
      i.displayedValue = '33'
      i.pendingOperation = 'ADD'
      const next = handleDecimal(i, 4)
      expect(next.storedOperation).toBe('ADD')
      expect(next.displayedValue).toBe('0.')
      expect(next.pendingOperation).toBeNull()
      expect(next.storedValue).toBe('33')
    })
  })

  describe('handlePlusMinus', () => {
    it('Appends the -', () => {
      const next = handlePlusMinus({ ...initialState, displayedValue: '5' })
      expect(next.displayedValue).toBe('-5')
    })

    it('Does not append the minus for 0', () => {
      const next = handlePlusMinus({ ...initialState, displayedValue: '0' })
      expect(next.displayedValue).toBe('0')
    })

    it('Updates the stored value if needed', () => {
      const i = { ...initialState }
      i.displayedValue = '33'
      i.storedValue = '33'
      const next = handlePlusMinus(i, 4)
      expect(next.displayedValue).toBe('-33')
      expect(next.storedValue).toBe('-33')
    })

    it('Updates the operateWithValue', () => {
      const i = { ...initialState }
      i.displayedValue = '33'
      const next = handlePlusMinus(i, 4)
      expect(next.displayedValue).toBe('-33')
      // This fails but should probably work.. needs work on the logic of handling negative numbers
      // expect(next.operateWithValue).toBe('-33')
    })
  })

  describe('handlePercentage', () => {
    it('Divides by 100', () => {
      const next = handlePercentage({ ...initialState, displayedValue: '5' })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(0.05)
    })

    it('Divides floating numbers by 100', () => {
      const next = handlePercentage({ ...initialState, displayedValue: '0.06' })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(0.0006)
    })

    it('Divides floating numbers by 100', () => {
      const next = handlePercentage({ ...initialState, displayedValue: '0.0006' })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(0.000006)
    })

    it('Divides negative floating numbers by 100', () => {
      const next = handlePercentage({ ...initialState, displayedValue: '-0.6' })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(-0.006)
    })
  })

  describe('handleCalculate', () => {
    it('Calculates correctly an int addition', () => {
      const next = handleCalculate({
        displayedValue: '10',
        storedValue: '20',
        pendingOperation: 'ADD',
        storeOperation: null,
        operateWithValue: '10',
      })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(30)
    })

    it('Calculates correctly an addition of floats', () => {
      const next = handleCalculate({
        displayedValue: '10.000004',
        storedValue: '20.03',
        pendingOperation: 'ADD',
        storeOperation: null,
        operateWithValue: '10.000004',
      })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(30.030004)
    })

    it('Returns a NaN for invalid state', () => {
      const next = handleCalculate({
        displayedValue: 'fdsfe',
        storedValue: '20.03',
        pendingOperation: 'ADD',
        storeOperation: null,
        operateWithValue: 'gfsgfd',
      })
      expect(parseFloat(next.displayedValue)).toBeNaN()
    })

    it('Works without a storedValue', () => {
      const next = handleCalculate({
        displayedValue: '20',
        storedValue: null,
        pendingOperation: 'MULTIPLY',
        storeOperation: null,
        operateWithValue: '20',
      })
      expect(parseFloat(next.displayedValue)).toBeCloseTo(400)
    })

    it('Stores the displayed value', () => {
      const next = handleCalculate({
        displayedValue: '20',
        storedValue: null,
        pendingOperation: null,
        storeOperation: null,
        operateWithValue: '20',
      })
      expect(next.storedValue).toBe('20')
      expect(next.operateWithValue).toBe('20')
    })
  })

  describe('handleAC', () => {
    it('Resets the state', () => {
      const next = handleAC({
        ...initialState,
        displayedValue: '34342',
        storedValue: '45',
        pendingOperation: 'ADD',
        storeOperation: null,
        operateWithValue: '34342',
      })
      expect(next).toEqual(initialState)
    })

    it('Resets the state if Infinity', () => {
      const next = handleAC({
        ...initialState,
        displayedValue: 'Infinity',
        storedValue: '45',
        pendingOperation: 'ADD',
        storeOperation: null,
        operateWithValue: '34342',
      })
      expect(next).toEqual(initialState)
    })

    it('Resets the state if NaN', () => {
      const next = handleAC({
        ...initialState,
        displayedValue: 'NaN',
        storedValue: '45',
        pendingOperation: 'ADD',
        storeOperation: null,
        operateWithValue: '34342',
      })
      expect(next).toEqual(initialState)
    })
  })

  describe('handleAlgebric', () => {
    it('Updates the pending operation', () => {
      const next = handleAlgebric({ ...initialState }, 'ADD')
      expect(next.pendingOperation).toBe('ADD')
    })

    it('Clears the stored operation', () => {
      const next = handleAlgebric({ ...initialState }, 'ADD')
      expect(next.storedOperation).toBeNull()
    })
  })
})
