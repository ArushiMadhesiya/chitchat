const express=require('express');
const dotenv=require('dotenv');
const app=express();
dotenv.config();
const http=require('http');
const server=http.createServer(app);
//const SocketIo=;
const io=require('socket.io')(server,{
    cors:{
        origin:"*"
    }
});
io.on('connection',(socket)=>{
    console.log("connected");
   // console.log("our socket while connection: ",socket);
    // events will be handled
    socket.on('chat',(payload)=>{
        //console.log("payload when chat event emitted: ",socket);
        console.log("payl",payload);
        io.emit("chat",payload)
    })
    socket.on("new_user_joined",(payload)=>{
        // heard the event on backend of user_joined
        console.warn(" heard the event on backend of new user_joined",payload);
        socket.broadcast.emit("user_joined",payload)
    })
    socket.on("disconnect",(name)=>{
        console.log("disconnected",name);
        socket.emit("left",name)
        //console.log("our socket while disconnected: ",socket);
    })
});
const PORT=process.env.PORT ;
server.listen(PORT,(err)=>{
    if(err){
        console.warn("errrrrrr");
    }
   else console.warn("backend server",PORT);
})