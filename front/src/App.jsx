import { useState } from 'react'
import Signup from './components/Signup'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>


    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
