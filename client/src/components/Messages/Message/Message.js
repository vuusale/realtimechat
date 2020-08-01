import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, date }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) isSentByCurrentUser = true;

    return(
        isSentByCurrentUser 
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="chatSender pr-10">{trimmedName}<br />{date}</p>
                    <div className="messageBox backgroundSender">
                        <p className="colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>    
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundReceiver">
                        <p className="colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="chatSender pl-10">{user}<br/>{date}</p>
                </div>   
            )
    );
}

export default Message;