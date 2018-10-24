import React from 'react'
import './Calculator.css'
import {
  handleInt,
  handleDecimal,
  initialState,
  handleAC,
  handlePlusMinus,
  handlePercentage,
  handleAlgebric,
  handleCalculate,
} from './CalculatorOperations'

const OPERATIONS = [
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

export class Calculator extends React.Component {
  state = {
    ...initialState,
  }

  handleOperation = operation => {
    if (OPERATIONS.some(op => op.op === operation.op)) {
      const current = { ...this.state }
      const next = operation.handler(current, operation.op)
      console.log(current, next)
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
