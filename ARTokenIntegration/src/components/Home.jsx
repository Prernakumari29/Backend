import React from 'react'
import api from '../api/AxiosInstance'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/AuthSlice'

const Home = () => {
  const dispatch = useDispatch()

  const handlelogout = async()=>{
    try {
      const res = await api.post("/logout")
      alert(res.data.message)
      dispatch(setUser(null))
      
    } catch (error) {
      console.log("error in logout api" , error)
    }
  }
  return (
    <div>
      <h1>here we welcome to our home!!!</h1>

      <button onClick={handlelogout} className='border black p-1 m-2 bg-gray-200 rounded hover:cursor-pointer active:scale-90'>logout</button>

      
    </div>
  )
}

export default Home
