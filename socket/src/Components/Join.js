import React, { useState } from 'react'
import './Join.css'
import { Link } from 'react-router-dom'

let user;
function Join() {

    const [name, setName] = useState('');

    const handler = () => {
        user = document.getElementById('text1').value;
        document.getElementById('text1').value = '';
    }
    return (
        <div className='join-container'>
            <div className="upper">
                <div className="head">
                    <h1>ONLINE CHATTING</h1>
                </div>
            </div>
            <div className="lower">
                <h1>LOGIN</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} id='text1' placeholder='NAME' required />
                <input type="password" className='text' placeholder='PASSWORD' required />
                <Link onClick={(e) => !name ? e.preventDefault() : null} to='/client'><input type="submit" onClick={handler} className='button' value="LOGIN" /></Link>
            </div>
        </div>
    )
}

export default Join
export { user }