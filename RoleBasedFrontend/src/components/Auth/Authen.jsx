import React from 'react'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'

const Authen = () => {
    const [toggle , setToggle] = useState(true)
  return (
    <div>
   
      {toggle ?<Login setToggle={setToggle }/> : <Register setToggle={setToggle } /> }
    </div>
  )
}

export default Authen
