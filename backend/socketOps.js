const express=require("express")
const {Socket}= require("socket.io")

const allSocketio= (io) =>
{


    io.use((socket, next) => {
        const username = socket.handshake.auth.fetched_userName;
        socket.username = username;
        next();
      });
    io.on("connection",(socket)=>
    {

        const users=[];
        for(let[id,socket] of io.of("/").sockets)
        {
            users.push({
                userID: id ,
                username: socket.username,
                key:id,
            });
        }

        socket.emit("users",users);
        console.log(users);

        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
            key: socket.id,
            self: false,
          });

        // for(let [id,socket] of io.of("/").socket)
        // {
        //     users.push({

        //         userid:socket.userid,
        //         username:socket.username,

               
        //     })
        //     console.log("User Id",userid)

        // }

        console.log("What is Socket is ",socket);

        console.log("Socket is Active to be Connected");
        
        socket.on("chat", ({ content, to }) => {
            console.log("Content:", content, " To:", to);
            socket.to(to).emit("chat", {
              content,
              to: socket.id,
            });
          });
    })
    io.on("disconnect",()=>{
        console.log("connection disconnected");
      });

  
}




module.exports=allSocketio;

