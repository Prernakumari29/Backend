import React from 'react'
import Authen from './components/Auth/Authen'
import { Route, Routes } from 'react-router'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Authen/>}/>
        <Route path='/home' element={<Home/>}/>

      </Routes>
      
    </div>
  )
}

export default App
