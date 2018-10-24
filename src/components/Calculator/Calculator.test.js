import React from 'react'
import ReactDOM from 'react-dom'
import { Calculator } from './Calculator'

describe('Calculator', () => {
  it('renders without crashing', () => {
    const div = document.createElement('calculatorDiv')
    ReactDOM.render(<Calculator />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
