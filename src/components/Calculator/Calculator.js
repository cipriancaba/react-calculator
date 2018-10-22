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
  { op: 'DIFFERENCE', display: '-' },
  { op: 1, display: '1' },
  { op: 2, display: '2' },
  { op: 3, display: '3' },
  { op: 'ADDITION', display: '+' },
  { op: 0, display: '0' },
  { op: 'DECIMAL', display: '.' },
  { op: 'COMPUTE', display: '=' },
]

class Calculator extends React.Component {
  render() {
    return (
      <div className="Calculator">
        <div className="CDisplay">
          <span>100.045</span>
        </div>
        <div className="CKeys">
          {OPERATIONS.map((el, index) => (
            <div className="CKey" key={index} style={{ flexGrow: el.display === '0' ? 1 : 0 }}>
              {el.display}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export { Calculator }
