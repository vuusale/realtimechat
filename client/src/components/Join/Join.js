import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdCallMade } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RiChatSmile2Line } from 'react-icons/ri';

import './Join.css';

import { getRooms } from '../../shared/request';

const Join = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    const regex = /^[a-zA-Z0-9\-._*& ]+$/;

    useEffect(() => {
        getRooms().then(({ rooms }) => {
            setRooms(rooms);
        })
    }, [location.search]); 
    
    return(
        <div className="joinOuterContainer">
            <div className="leftJoin">
                <div className="joinIntro">
                    <div className="joinIntroInner">
                        <h1 className="mp-0 joinAppName"><RiChatSmile2Line className="joinAppIcon" /> Born To Chat</h1>
                        <br/>
                        <p>This is a real time chat application.</p><p className="lead">Invite your friends and enjoy chatting!</p>  
                    </div>
                </div>
                <div className="joinActiveUsers">
                    <p className="joinActiveHeader">Active rooms:</p>
                    {rooms.length > 0 ? rooms.map((room, i) => (
                        <p onClick={event => setRoom(room)} key={i} className="joinActiveUser joinActiveUserItem">{room}<MdCallMade /></p>
                    )) : (<p className="joinActiveUser">No active rooms</p>)}
                </div>
            </div>

            <div className="rightJoin">
                <div className="joinLoginOuter">                
                    <div className="joinLogin">
                        {visible ? <div className="joinAlert">
                            <p>{error}</p>
                            <AiOutlineClose className="joinAlertCloseIcon" onClick={() => setVisible(false)} />
                        </div> : null}
                        <h1 className="joinHeading">Join</h1>
                        <div>
                            <input
                                id="name"
                                value={name}
                                placeholder="Name" 
                                autoComplete="off"
                                className="joinInput" 
                                type="text" onChange={event => setName(event.target.value)} 
                            />
                        </div>
                        <div>
                            <input
                                id="room"
                                value={room}
                                placeholder="Room" 
                                autoComplete="off"
                                className="joinInput mt-20" 
                                type="text" onChange={event => setRoom(event.target.value)} 
                            />
                        </div>
                        <Link onClick={event => {
                            if(!name || !room) {
                                setError('Please provide both fields.');
                                event.preventDefault();
                                setVisible(true);
                            } else if (!regex.test(name) || !regex.test(room)) {
                                setError('Your input contains disallowed characters.');
                                event.preventDefault();
                                setVisible(true);
                            }
                        }}
                        to={`/chat?name=${name}&room=${room}`}>
                            <button className="joinSubmitButton" type="submit">Sign in</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join;