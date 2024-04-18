import React, { useEffect, useState } from 'react';
import "./App.css";
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [userName,setuserName]=useState(nanoid(4));
  const send = (e) => {
    e.preventDefault();
    console.warn(message);
    socket.emit('chat', { message,userName });
    setMessage('');
  };
  useEffect(()=>{
    socket.on('chat',(payload)=>{
      console.log("chat in useefect")
      setChat([...chat,payload])
    })
  })
  return (
    <div className="App">
      <header className="App-header">

        <div>ChitChat</div>
        </header>
        <div className='outerbox'>
        <div className='allchats'>
          {
            chat.map((payload,index)=>{
              if(payload.userName==userName) return <div key={index} className="box-right">{payload.message}
              <span> BY: {payload.userName}</span>
              </div>
              else return <div key={index} className="box-left">{payload.message}
              <span> by: {payload.userName}</span>
              </div>
              
            })
          }
          </div>
          <form onSubmit={send}>
          <input
            type='text'
            placeholder='type message'
            value={message}
            name='chat'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit'>send</button>
        </form>
        
        </div>
      
    </div>
  );
}

export default App;
