import React from 'react';

import './InfoBar.css';

import { AiOutlineClose } from "react-icons/ai";
import { RiChatSmile2Line } from 'react-icons/ri';

const InfoBar = ({ room }) => {
    return(
        <div className="infoBarInnerContainer">
            <h3 className="appName ml-15"><RiChatSmile2Line className="mr-10 infobarIcon" />{room}</h3>
            <a href="/" className="closeButton">Leave <AiOutlineClose className="infobarIcon" /></a>
        </div>  
    );
}

export default InfoBar;