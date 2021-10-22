import React, { useState } from 'react';
import MessageBlock from './MessageBlock';
import { FormGroup, Input } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import  io  from "socket.io-client";
import ReactScrollFeed from 'react-scrollable-feed';
import users from 'Assets/data/chat-app/users';
import { sendMessageToUser } from 'Actions';

// app layouts
import { getAppLayout } from 'Helpers/helpers';

const socket=io.connect("http://localhost:8008")
function Chatwindow(props)
{
    const userall =[users]
    let selectedUser={

        ...props.selectedUser,
        messages:[],
    };

    const [messages,setmessage] =useState([]);

    let messageContent ="";

    let ref;

    const getContent=(e) =>
    {
        messageContent=e.target.value;
        ref=e;
    };


    const onMessage=(e,content) =>
    {
        e.preventDefault();
        console.log("Message is:", content);
        ref.target.value = "";

        if (props.selectedUser) {

            socket.emit("chat", {
                content:this.state.msg,
                to:props.selectedUser.id,
    
            });
            setmessage((messages)=>[
                ...messages,
                {toUser:props.selectedUser.username,content,formself:true},
            ]);
        }
            console.log("Message Object ",messages);
    }

    
  const showMessages = messages.map((message, index) => {
    if (
      message.fromSelf === true &&
      message.toUser === props.selectedUser.username
    )
      return (
        <div
          key={index}
          style={{ textAlign: "right" }}
          className="message-ribbon"
        >
          {message.content}
        </div>
      );
    if (
      message.fromSelf === false &&
      message.fromUser === props.selectedUser.username
    )
      return (
        <div
          key={index}
          style={{ textAlign: "left" }}
          className="message-ribbon"
        >
          {message.content}
        </div>
      );
  });

  socket.on("chat",({content,from})=>
  {
    let newMessage={};

    for(let i=0;i<userall.length;i++ )
    {
        const user=userall[i];

        if(user.id===from)
        {
            console.log("Iteration is",i);

            newMessage={

                fromUser:userall[i].username,
                content,
                fromSelf:true
            };

            const messageList=[...message,newMessage];
            setmessage(messageList);
        }

    }

  });

  console.log(showMessages);

    return (

        <div className="chat-window">
        <div className="user-name-card">
          <p>{props.selectedUser.username}</p>
        </div>
  
        <div className="message-container">{showMessages}</div>
        <form onSubmit={(e) => onMessage(e, messageContent)}>
          <input
            className="chat-text-area"
            placeholder="Enter message to send"
            onChange={(e) => getContent(e)}
          ></input>
        </form>
      </div>


    );

}
export default Chatwindow;