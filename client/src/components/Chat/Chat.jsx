import React, {useRef, useState, useEffect} from 'react'

export default function Chat({socket}) {

  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])

  useEffect(()=>{
    socket.on('receive_message',data =>{
      setMessageList((current)=>[...current, data])
    })

    return () => socket.off('receive_message')
  }, [socket])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if(!message.trim()) return

    socket.emit('message', message)
    clearInput()

  }

  const clearInput = () => {
    messageRef.current.value = ''
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-light">Chat</h1>
  
      {/* Container de mensagens com rolagem e modo escuro */}
      <div className="card bg-dark text-light">
        <div className="card-body" style={{ height: '300px', overflowY: 'auto' }}>
          {
            messageList.map((message, index) => (
              <div key={index} className={`d-flex ${message.author === 'Me' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`p-2 mb-2 rounded ${message.author === 'Me' ? 'bg-primary text-white' : 'bg-secondary text-light'}`}>
                  <strong>{message.author}</strong>: {message.text}
                </div>
              </div>
            ))
          }
        </div>
      </div>
  
      {/* Input e botão de envio com estilo escuro */}
      <div className="input-group mt-3">
        <input 
          type="text" 
          className="form-control bg-dark text-light" 
          ref={messageRef} 
          placeholder="Type a message..." 
          aria-label="Type a message..." 
          aria-describedby="button-addon2" 
        />
        <button className="btn btn-primary" id="button-addon2" onClick={() => handleSubmit()}>
          Send
        </button>
      </div>
    </div>
  );  
}
 

