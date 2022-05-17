import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import  './normalize.css'
import  './App.css'
//import LoginPage from "./pages/LoginPage/LoginPage";
import TodoPage from "./pages/TodoPage/TodoPage";

class App extends Component {
  render() {
    return (
      <TodoPage/>
    )
  }
}

export default hot(module)(App)
