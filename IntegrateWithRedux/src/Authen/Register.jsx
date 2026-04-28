import axios from 'axios'
import React, { useState } from 'react'

const Register = ({ setToggle }) => {

  const [formData , setFormData] = useState({})

  const handlechange = (e)=>{
    let {name , value} = e.target
    setFormData({...formData , [name] : value})
  }

  const handlesubmit = async (e)=>{
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/register" , formData , {withCredentials:true})
      console.log(res)
      setFormData({})
    } catch (error) {
      console.log("error in frontend post part" , error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 text-black">

        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handlesubmit} className="space-y-4">

          <input
            onChange={handlechange}
            name='name'
            value={formData.name || ""}
            type="text"
            placeholder='Enter your name'
            className="w-full px-4 py-2 rounded-lg bg-black/50 placeholder-white outline-none focus:ring-2"
          />

          <input
            onChange={handlechange}
            name='email'
            value={formData.email || ""}
            type="email"
            placeholder='Enter your email'
            className="w-full px-4 py-2 rounded-lg bg-black/50 placeholder-white outline-none focus:ring-2 focus:ring-white"
          />

          <input
            onChange={handlechange}
            name='password'
            value={formData.password || ""}
            type="password"
            placeholder='Enter your password'
            className="w-full px-4 py-2 rounded-lg bg-black/50 placeholder-white outline-none focus:ring-2 focus:ring-white"
          />

          <input
            onChange={handlechange}
            name='number'
            value={formData.number || ""}
            type="text"
            placeholder='Enter your number'
            className="w-full px-4 py-2 rounded-lg bg-black/50 placeholder-white outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type='submit'
            className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-purple-100 transition duration-300"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span 
            onClick={()=> setToggle(false)} 
            className="underline cursor-pointer hover:text-gray-200"
          >
            Login now
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register