import { useState } from 'react'
import './App.css'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null)

  return (
    <>
      <div class="text-bg-secondary p-3">

        {
          chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
        }
      
      </div>
      
    </>
  )
}

export default App
