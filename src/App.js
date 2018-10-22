import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Calculator } from './components/Calculator/Calculator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className="App-main">
          <Calculator />
        </main>
      </div>
    )
  }
}

export default App
