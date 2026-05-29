import React, { useEffect } from 'react'
import Login from './components/Auth/Login'
import Authen from './components/Auth/Authen'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import api from './api/AxiosInstance'
import { useDispatch } from 'react-redux'
import { setUser , clearUser } from './features/AuthSlice'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchMe = async() =>{
      try {
         let res = await api.get("/me")
      console.log(res)
      dispatch(setUser(res.data.data))
        
      } catch (error) {
        console.log("error in me api" , error)
        dispatch(clearUser())
      }
    }

    fetchMe()
  },[])
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Authen />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      
    </div>
  )
}

export default App

