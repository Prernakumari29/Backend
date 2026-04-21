import React, { useEffect } from 'react'

import Home from './components/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from './Authen/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from './features/AuthSlice'

const App = () => {

  let dispatch = useDispatch()
  useEffect (()=>{
    let resApi = async()=>{
      try {
        let res = await axios.get("http://localhost:3000/me" , {withCredentials: true})
        console.log("me api" , res)
        dispatch(addUser(res.data.user))
      }
       catch (error) {
        console.log("error in me api" , error)
      }
    }
    resApi();

  },[])


  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <Routes>
      <Route path='/'element={
          isAuthenticated ? <Navigate to="/home" /> : <AuthPage />
        }  />
      <Route path='/home' element={
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
        } />

    </Routes>
  )
}

export default App

