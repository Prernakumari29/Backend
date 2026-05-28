import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../api/LoginAPi";
import { setUser } from "../../features/AuthSlice";

const Login = ({ setToggle }) => {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  
  const dispatch = useDispatch();

  const handleLogin = async(e)=>{

    e.preventDefault();

    try {
      
      const res = await LoginUser({ email , password})
      alert(res.message)
      console.log(res)
      dispatch(setUser(res.data))

    } catch (error) {
      console.error("error in login api" , error)
    }

  }

    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px]">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <p className="text-gray-500 text-sm">
            OR
          </p>

          <div className="flex-1 h-[1px] bg-gray-300"></div>

        </div>

       

        

        {/* Switch */}
        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <button
            onClick={() => setToggle(false)}
            className="text-blue-600 font-semibold mt-2 hover:underline"
          >
            Switch to Register
          </button>

        </div>

      </div>

    </div>
 
  )
};

export default Login;