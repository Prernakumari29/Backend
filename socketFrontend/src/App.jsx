
import React from 'react'
import { useState } from 'react'
import {io} from "socket.io-client"


const App = () => {
  const socket = io("http://localhost:3000");
  const [message , setMessage] = useState("")

  const sendmessage = ()=> {
    socket.emit("sender" , message)

  }
  return (
    <div>
      <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='enter your message' />
      <button onClick={sendmessage} >send</button>
    </div>
  )
}

export default App
