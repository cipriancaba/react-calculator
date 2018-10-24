export const initialState = {
  storedValue: null,
  pendingOperation: null,
  storedOperation: null,
  operateWithValue: null,
  displayedValue: '0',
}

const calculate = (value1, value2, op) => {
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
    next.operateWithValue = current.operateWithValue || displayedValue

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
    next.displayedValue = '0'
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

  if (current.storedOperation) {
    next.storedOperation = null
  }

  return next
}
