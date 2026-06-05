import React from 'react'

const Register = ({setToggle}) => {
  return (
    <div>
      <form action="">
        <input type="text" placeholder='register mein kuch nhi hai' />
        <h1 onClick={()=>setToggle(true)}>Switch to Login</h1>
      </form>
    </div>
  )
}

export default Register
