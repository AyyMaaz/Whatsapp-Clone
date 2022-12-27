import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./ChatMessage.css";
function ChatMessage({ message, timestamp, sender ,del}) {
    const [date,setDate]=useState('')
    const [time,setTime]=useState('')
    useEffect(() => {
     function getTime(){

            const fireBaseTime = new Date(timestamp * 1000 + timestamp / 1000000)
            setDate(fireBaseTime.toDateString());
            setTime(fireBaseTime.toLocaleTimeString());
            
             
     }
     getTime()

    }, [])
    return (
        <div className="chat-message"
            style={{
                alignSelf:
                    sender === auth?.currentUser?.email ? "flex-end" : "flex-start",

                backgroundColor:
                    sender === auth?.currentUser?.email ? "#dcf8c6" : "#fff",
            }}
        >
            <div className="chat-message-text">
                <p>{message}</p>
                <p onClick={del}>🚮</p>
            
            </div>
           

            <div className="chat-message-date">
                <p>{date},{time}</p>
            </div>
        </div>
    );
}

export default ChatMessage;