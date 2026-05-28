import React from 'react'
import { useState } from 'react'
import Register from './Register'
import Login from './login'

const Authen = () => {
    const[toggle, setToggle] =useState(true)
  return (
    <div>
      {
        toggle? <Login setToggle={setToggle} /> : <Register setToggle={setToggle}/>
      }
    </div>
  )
}

export default Authen
