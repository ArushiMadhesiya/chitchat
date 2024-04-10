const express=require('express');
const app=express();
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
        //console.log("chat recieved");
        io.emit("chat",payload)
    })
    socket.on("disconnect",(socket)=>{
        console.log("disconnected");
        console.log("our socket while disconnected: ",socket);
    })
});

server.listen(5000,(err)=>{
    if(err){
        console.warn("errrrrrr");
    }
   else console.warn("backend server");
})