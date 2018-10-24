import React from 'react'
import './Calculator.css'
import { initialState, OPERATIONS } from './CalculatorOperations'

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
