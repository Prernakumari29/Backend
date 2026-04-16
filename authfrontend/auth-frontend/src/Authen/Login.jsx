import axios from 'axios'
import React, { useState } from 'react'

const Login = ({ setToggle }) => {

  const [formData , setFormData] = useState({})

  const handlechange = (e)=>{
    let {name , value} = e.target
    setFormData({...formData , [name] : value})
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login" , formData , {withCredentials:true})
      console.log(res)
    } catch (error) {
      console.log("error in frontend post part" , error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-500 to-gray-400">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 text-white">
        
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            onChange={handlechange}
            name='email'
            value={formData.email || ""}
            type="email"
            placeholder='Enter your email'
            className="w-full px-4 py-2 rounded-lg bg-white/30 placeholder-white outline-none focus:ring-2 focus:ring-white"
          />

          <input
            onChange={handlechange}
            name='password'
            value={formData.password || ""}
            type="password"
            placeholder='Enter your password'
            className="w-full px-4 py-2 rounded-lg bg-white/30 placeholder-white outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type='submit'
            className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-purple-100 transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span 
            onClick={()=> setToggle(true)} 
            className="underline cursor-pointer hover:text-gray-200"
          >
            Register now
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login