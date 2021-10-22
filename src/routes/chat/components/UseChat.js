import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat"; 

const SOCKET_SERVER_URL = "http://localhost:8008";

const UseChat=()=>
{

  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();



  socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
    const incomingMessage = {
      ...message,
      ownedByCurrentUser: message.senderId === socketRef.current.id,
    };
    setMessages((messages) => [...messages, incomingMessage]);
  });

  
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default UseChat;
