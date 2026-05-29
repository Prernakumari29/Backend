import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {

   

    let {user , loading} = useSelector(state => state.auth)

    if(loading){

        return <h1>Loading...</h1>
    }


    if(!user) {
       return <Navigate to="/" /> 
    }

  return children
}

export default ProtectedRoute
