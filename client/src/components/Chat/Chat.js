import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import ActiveUsers from '../ActiveUsers/ActiveUsers';

import { devBackendURL } from '../../shared/constants';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    
    const [receiver, setReceiver] = useState(null);

    const ENDPOINT = devBackendURL;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        
        socket.emit('join', { name, room }, error => {
            if (error) alert(error);
        });
        
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = event => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', {message, receiverName: receiver}, () => setMessage(''));
        }
    }
    
    return(
        <div className="chatOuterContainer">
            <div className="chatInnerContainer">
                <InfoBar room={room} />
                <ActiveUsers
                    users={users}
                    setReceiver={setReceiver}
                    currentUser={name} />
                <Messages 
                    messages={messages} 
                    name={name} />
                <Input 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;