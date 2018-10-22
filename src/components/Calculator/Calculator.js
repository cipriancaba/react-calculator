import React from 'react'
import PropTypes from 'prop-types'
import './Calculator.css'

export class Calculator extends React.Component {
  render() {
    return <div className="Calculator">Calculator</div>
  }
}

Calculator.propTypes = {
  size: PropTypes.number,
  sdadsa: PropTypes.string,
}
