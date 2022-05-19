import { hot } from 'react-hot-loader'
import  './normalize.css'
import  './App.css'
//import LoginPage from "./pages/LoginPage/LoginPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import React from 'react';

const App: React.FC = () => {
  return (
    <TodoPage/>
  )
}

export default hot(module)(App)
