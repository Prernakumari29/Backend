import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../features/AuthSlice'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRemove = (e)=>{
       dispatch(removeUser())
       navigate("/")
    }
  return (
    <div>
      <h1>Here you will see home</h1>
      <button onClick={handleRemove} className='bg-blue-300 text-white'>Logout</button>
    </div>
  )
}

export default Home
