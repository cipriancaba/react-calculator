export const initialState = {
  storedValue: null,
  pendingOperation: null,
  storedOperation: null,
  operateWithValue: null,
  displayedValue: '0',
}

export const calculate = (value1, value2, op) => {
  if (typeof value1 !== 'number' || typeof value2 !== 'number') return NaN
  switch (op) {
    case 'MULTIPLY':
      return value1 * value2
    case 'DIVIDE':
      return value1 / value2
    case 'ADD':
      return value1 + value2
    case 'SUBSTRACT':
      return value1 - value2
    default:
      console.log('Unknown operation: ', op)
      return NaN
  }
}

export const handleInt = (current, op) => {
  let next = { ...current }

  if (current.pendingOperation) {
    next.storedOperation = current.pendingOperation
    next.pendingOperation = null
    next.displayedValue = op.toString()
    next.storedValue = current.displayedValue
  } else {
    next.displayedValue = current.displayedValue === '0' ? op.toString() : current.displayedValue + op
  }
  next.operateWithValue = next.displayedValue

  return next
}

export const handleDecimal = current => {
  const next = { ...current }

  if (!current.displayedValue.includes('.')) {
    if (current.pendingOperation) {
      next.storedOperation = current.pendingOperation
      next.pendingOperation = null
      next.displayedValue = '0.'
      next.storedValue = current.displayedValue
    } else {
      next.displayedValue = current.displayedValue + '.'
    }
  }
  next.operateWithValue = next.displayedValue

  return next
}

export const handlePlusMinus = current => {
  const next = { ...current }
  let displayedValue = current.displayedValue

  if (displayedValue !== '0') {
    next.displayedValue = displayedValue.startsWith('-') ? displayedValue.replace('-', '') : `-${displayedValue}`
    next.operateWithValue = current.operateWithValue || next.displayedValue

    if (next.storedValue) {
      next.storedValue = next.displayedValue
    }
  }

  return next
}

export const handlePercentage = current => {
  const next = { ...current }

  next.displayedValue = (parseFloat(current.displayedValue) / 100).toString()
  next.operateWithValue = next.displayedValue

  return next
}

export const handleCalculate = current => {
  const next = { ...current }

  const value1 = parseFloat(current.operateWithValue)
  const value2 = parseFloat(current.storedValue) || value1

  if (current.storedOperation || current.pendingOperation) {
    const result = calculate(
      value1,
      value2,
      current.storedOperation ? current.storedOperation : current.pendingOperation
    )
    next.displayedValue = result.toString()
    next.storedValue = result.toString()
    next.storedOperation = current.pendingOperation || current.storedOperation
    next.operateWithValue = current.operateWithValue || current.displayedValue
    next.pendingOperation = null
  } else {
    next.storedValue = current.displayedValue
    next.operateWithValue = next.displayedValue
  }

  return next
}

export const handleAC = current => {
  return { ...initialState }
}

export const handleAlgebric = (current, op) => {
  const next = { ...current }

  next.pendingOperation = op
  next.storedOperation = null

  return next
}

export const OPERATIONS = [
  { op: 'AC', display: 'AC', handler: handleAC },
  { op: 'PLUS_MINUS', display: '+/-', handler: handlePlusMinus },
  { op: 'PERCENTAGE', display: '%', handler: handlePercentage },
  { op: 'DIVIDE', display: '/', handler: handleAlgebric },
  { op: 7, display: '7', handler: handleInt },
  { op: 8, display: '8', handler: handleInt },
  { op: 9, display: '9', handler: handleInt },
  { op: 'MULTIPLY', display: 'X', handler: handleAlgebric },
  { op: 4, display: '4', handler: handleInt },
  { op: 5, display: '5', handler: handleInt },
  { op: 6, display: '6', handler: handleInt },
  { op: 'SUBSTRACT', display: '-', handler: handleAlgebric },
  { op: 1, display: '1', handler: handleInt },
  { op: 2, display: '2', handler: handleInt },
  { op: 3, display: '3', handler: handleInt },
  { op: 'ADD', display: '+', handler: handleAlgebric },
  { op: 0, display: '0', handler: handleInt },
  { op: 'DECIMAL', display: '.', handler: handleDecimal },
  { op: 'CALCULATE', display: '=', handler: handleCalculate },
]
