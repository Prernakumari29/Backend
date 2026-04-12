import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [formData , setFormData] = useState({})
  const [user, setUser] = useState([])

  const getUser = async()=>{
    try {
      let getData = await axios.get("http://localhost:3000/us")
      console.log(getData.data)
      setUser(getData.data.person)
      
    } catch (error) {
      console.log("error in get" , error)
    }
  }

  useEffect (()=>{
     getUser();
  },[])


  const handlechange = (e)=>{
    let {name , value} = e.target
    setFormData ({...formData , [name]:value})
  }

  const handlesubmit = async (e)=>{
      e.preventDefault();
      console.log(formData)
      let res = await axios.post("http://localhost:3000/users" , formData)
      console.log(res)
      

  }

  return (
    <div>
      <h1>hello</h1>
      <form onSubmit={handlesubmit}>
        <input onChange={handlechange} name='name' type="text" placeholder='enter your name' /> <br /> <br />
        <input onChange={handlechange} name='password' type="text" placeholder='enter your password' /> <br /> <br />
        <input onChange={handlechange} name='email' type="text" placeholder='enter your email' /> <br /> <br />
        <button>create</button>
      </form>
      {
        user?.map(function(elem){
            return(
               <h1>{elem.name}</h1>
            )
        })
      }
    </div>
  )
}

export default App
