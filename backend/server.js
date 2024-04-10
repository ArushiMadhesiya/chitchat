const express=require('express');

const app=express();


app.listen(5000,(err)=>{
    if(err){
        console.warn("errrrrrr");
    }
   else console.warn("backend server");
})