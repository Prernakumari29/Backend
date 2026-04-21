import React from 'react'
import Login from "./Login"
import Register from './Register'
import { useState } from 'react'

const AuthPage = () => {
    const [toggle , setToggle] = useState(false)
  return (
    <div>
      { toggle ? <Register setToggle={setToggle} /> : <Login setToggle={setToggle}  /> }
      
    </div>
  )
}

export default AuthPage
