import React, { Component } from "react"
import { hot } from 'react-hot-loader'
import './App.css'
import Hi from './Hi'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, World!</h1>
        <Hi />
      </div>
    )
  }
}

export default hot(module)(App)
