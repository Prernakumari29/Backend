import React from 'react'
import Auth from './components/Auth'
import { Route, Routes } from 'react-router'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
