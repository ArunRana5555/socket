import './Message.css'
import React from 'react'

function Message({user,message,classs}) {
    if(user){
        return (
            <div className={`message-box ${classs}`}>
                {`${user} :   ${message}`}
            </div>
          )
    }
    else{
        return (
          <div className={`message-box ${classs}`}>
              {`you :   ${message}`}
          </div>
        )
    }
}

export default Message
