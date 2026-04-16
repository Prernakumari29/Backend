import React from 'react'
import Login from './Authen/Login'
import Register from './Authen/Register'
import { useState } from 'react'

const App = () => {

  const [toggle , setToggle] = useState(true)

  return (
    <div>
      { toggle ? <Register setToggle={setToggle} /> : <Login setToggle={setToggle} /> }
    </div>
  )
}

export default App
