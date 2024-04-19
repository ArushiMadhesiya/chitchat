import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
const socket=io.connect("http://localhost:5000");
const Login=()=>{
    const [name,setName]=useState("");
    const navigate= useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        socket.emit("new_user_joined", name);
        setName("")
        navigate('/chat', {state:{name}});
    }
    // useEffect(()=>{
    //    socket.on("user_joined",(payload)=>{
    //     console.warn("back in frontend with the new user joinned");
    //     navigate('/chat');
    //    })
    // },)
    return(
        <div className="login-container">
        <h2>Welcome to the Chat App!</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter your name" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="name-input" 
            />
            <button type="submit" className="submit-button">Start Chatting</button>
        </form>
        
    </div>
    )
}
export default Login;