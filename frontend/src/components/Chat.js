import React, { useEffect, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";

const socket = io.connect("http://localhost:5000");
function Chat() {
  const location=useLocation();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
 console.warn("recieved from login page in the chat cmpt",location.state.name);
 const [userName,setUserName]=useState(location.state.name);
 const [newuserName,setNewUserName]=useState("");
  //const userName=props.userName;
  const [users, setUser] = useState([]);
  const [flag, setF] = useState(false);
  const send = (e) => {
    e.preventDefault();
    console.warn(message);
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log("chat in useefect");
      setChat([...chat, payload]);
    });
    socket.on("user_joined", (payload) => {
      console.log("user_joined ", payload);
      setNewUserName(payload)
      setF(true);
    });
    socket.on("left",(payload)=>{
      console.warn("user leaving",userName);
    })
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <div>ChitChat</div>
      </header>
      <div className="outerbox">
        <div className="allchats">
          {chat.map((payload, index) => {
            if (payload.userName == userName)
              return (
                <div key={index} className="box-right">
                  {payload.message}
                  {/* <span> BY: {payload.userName}</span> */}
                </div>
              );
            else
              return (
                <div key={index} className="box-left">
                <span>  {payload.userName}: </span>
                  {payload.message}
                  
                </div>
              );
          })}
        </div>
        {flag ? (
          <div className="alert">
            <span>{newuserName} joinedddd!!!!!!!</span>
          </div>
        ) : null}
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="type message"
            value={message}
            name="chat"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
