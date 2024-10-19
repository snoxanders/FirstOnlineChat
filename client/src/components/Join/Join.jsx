import React, {useRef} from 'react'
import { useState } from 'react'
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}) {

  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if(!username.trim()) return 
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true);
  }
  return (
    <div className="container mt-4">
      <h1 className="text-center text-light">Join</h1>
  
      {/* Input de username com estilo escuro */}
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control bg-dark text-light" 
          ref={usernameRef} 
          placeholder="Username" 
          aria-label="Recipient's username" 
          aria-describedby="button-addon2" 
        />
        <button className="btn btn-primary" id="button-addon2" onClick={() => handleSubmit()}>
          Join
        </button>
      </div>
    </div>
  );
  
}


