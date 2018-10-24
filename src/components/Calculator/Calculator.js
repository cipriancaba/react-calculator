import React from 'react'
import './Calculator.css'

const OPERATIONS = [
  { op: 'AC', display: 'AC' },
  { op: 'PLUS_MINUS', display: '+/-' },
  { op: 'PERCENTAGE', display: '%' },
  { op: 'DIVIDE', display: '/' },
  { op: 7, display: '7' },
  { op: 8, display: '8' },
  { op: 9, display: '9' },
  { op: 'MULTIPLY', display: 'X' },
  { op: 4, display: '4' },
  { op: 5, display: '5' },
  { op: 6, display: '6' },
  { op: 'SUBSTRACT', display: '-' },
  { op: 1, display: '1' },
  { op: 2, display: '2' },
  { op: 3, display: '3' },
  { op: 'ADD', display: '+' },
  { op: 0, display: '0' },
  { op: 'DECIMAL', display: '.' },
  { op: 'CALCULATE', display: '=' },
]

const defaultState = {
  storedValue: null,
  pendingOperation: null,
  storedOperation: null,
  operateWithValue: null,
  displayedValue: '0',
}

export class Calculator extends React.Component {
  state = {
    ...defaultState,
  }

  calculate = ({ storedValue, operateWithValue, storedOperation }) => {
    const value1 = parseFloat(storedValue)
    const value2 = parseFloat(operateWithValue)

    switch (storedOperation) {
      case 'MULTIPLY':
        return value1 * value2
      case 'DIVIDE':
        return value1 / value2
      case 'ADD':
        return value1 + value2
      case 'SUBSTRACT':
        return value1 - value2
      default:
        console.log('Unknown operation: ', storedOperation)
        return storedValue
    }
  }

  handleOperation = operation => {
    if (OPERATIONS.some(op => op.op === operation.op)) {
      const current = { ...this.state }
      const next = { ...current, operateWithValue: undefined }

      const isZero = current.displayedValue === '0'

      if (Number.isInteger(operation.op)) {
        if (current.pendingOperation) {
          next.storedOperation = current.pendingOperation
          next.pendingOperation = null
          next.displayedValue = operation.op.toString()
          next.storedValue = current.displayedValue
        } else {
          next.displayedValue = isZero ? operation.op.toString() : current.displayedValue + operation.op
        }
      } else {
        switch (operation.op) {
          case 'DECIMAL':
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
            break
          case 'PLUS_MINUS':
            if (!isZero) {
              next.displayedValue = current.displayedValue.startsWith('-')
                ? current.displayedValue.replace('-', '')
                : `-${current.displayedValue}`
              next.operateWithValue = current.operateWithValue || current.displayedValue

              if (next.storedValue) {
                next.storedValue = next.displayedValue
              }
            }
            break
          case 'PERCENTAGE':
            next.displayedValue = (parseFloat(current.displayedValue) / 100).toString()
            break
          case 'CALCULATE':
            if (current.storedOperation) {
              const result = this.calculate({ ...this.state })
              next.displayedValue = result.toString()
              next.storedValue = result.toString()
              next.operateWithValue = current.operateWithValue || current.displayedValue
              next.storedOperation = current.storedOperation
            } else if (current.pendingOperation) {
              const result = this.calculate({
                ...this.state,
                storedValue: current.displayedValue,
                storedOperation: current.pendingOperation,
              })
              next.displayedValue = result.toString()
              next.storedValue = result.toString()
              next.pendingOperation = null
              next.storedOperation = current.pendingOperation
              next.operateWithValue = current.operateWithValue || current.displayedValue
            } else {
              next.storedValue = current.displayedValue
              next.displayedValue = '0'
            }
            break
          case 'AC':
            this.setState({ ...defaultState })
            return
          default:
            // REMAINING ALGEBRIC OPERATIONS
            if (current.storedOperation) {
              next.pendingOperation = operation.op
              next.storedOperation = null
            } else {
              next.pendingOperation = operation.op
            }
            break
        }
      }

      if (!next.operateWithValue) {
        next.operateWithValue = next.displayedValue
      }

      this.setState(next)
    } else {
      console.log('No op', operation)
      return
    }
  }

  getAdjustedFontSize = displayedValue => {
    return Math.max(10, displayedValue.length > 10 ? (400 / displayedValue.length) * 1.5 : 60)
  }

  render() {
    const { displayedValue } = this.state

    return (
      <div className="Calculator">
        <div className="CDisplay">
          <span style={{ fontSize: this.getAdjustedFontSize(displayedValue) }}>{displayedValue}</span>
        </div>
        <div className="CKeys">
          {OPERATIONS.map((el, index) => (
            <div
              className="CKey"
              key={index}
              style={{ flexGrow: el.display === '0' ? 1 : 0 }}
              onClick={() => this.handleOperation(el)}
            >
              {el.display}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
