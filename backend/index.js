const express=require("express");
const {Socket} =require("socket.io");
const cors=require("cors")
const app=express();

require("./dbOps")
const server=require("http").createServer(app);

const io=require("socket.io")(server,{
   
    cors: {
        origin: "*",
     
      }
})

app.use(express.json({ type: 'application/json' }))
app.use(cors())


// import {allSocketio} from './socketOps'
// allSocketio(io)

const allSocketio =require("./socketOps")
allSocketio(io)



server.listen(8008,(err)=>
{
    if(err)
    {
        console.log("Not Working")
    }
    else
    {
    console.log("Server is running")
    }
})

