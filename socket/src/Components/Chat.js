import React, { useEffect, useState } from 'react'
import './Chat.css'
import { user } from './Join'
import Message from './Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import image from '../Images/cross.jpg'
const socketIO = require('socket.io-client')
const ENDPOINT = "http://localhost:4500"

let socket;

function Chat() {

    // each socket has its unique id
    const [id, setId] = useState('')
    const [messages, setMessage] = useState([]);

    const sender = () => {
        const message = document.getElementById('text-chat').value;
        socket.emit("message", { message, id })// to send the user id of socket.id
        document.getElementById('text-chat').value = "";
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] })

        socket.on("connect", () => {
            alert('connected');
            setId(socket.id)
        })

        socket.emit("joined", { user })

        socket.on("welcome", (data) => {
            setMessage([...messages, data]);
            console.log(data.user, data.msg)
        })
        socket.on("newUser", (data) => {
            setMessage([...messages, data]);
            console.log(data.user, data.msg)
        })
        socket.on("leave", (data) => {
            // setMessage([...messages, data]);
            console.log(data.user, data.msg)
        })
        return () => {
            socket.disconnect((data)=>{
                setMessage([...messages, data]);
                console.log(data.user, data.msg)
            })
            socket.off();
        }
    },[])

    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessage([...messages, data]);
           
        })
        return ()=>{
            socket.off();
        }
    }, [messages])

    return (
        <>
            <div className="container12">
                <div className="upper12">
                    <h1>CHATTING</h1>
                    <a href="/"><img src={image} alt="close" /></a>
                </div>
                <ReactScrollToBottom className="middle12">
                    {
                        messages.map((ele) =>
                            <Message user={ele.id===id? '':ele.user} message={ele.msg} classs={ele.id===id?'right':'left'} />
                        )
                    }
                </ReactScrollToBottom>
                <div className="lower12">
                    <input type="text" onKeyPress={(e)=>e.key==='Enter'?sender():null} id='text-chat' placeholder='TEXT' />
                    <button onClick={sender} className='chat-button' >SEND</button>
                </div>
            </div>
        </>
    )
}

export default Chat
