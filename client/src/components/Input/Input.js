import React from 'react';

import './Input.css';

import { MdSend } from 'react-icons/md';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="chatInputForm">
    <input
      className="chatInput"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="chatSendButton" onClick={e => sendMessage(e)}>Send <MdSend className="inputSendIcon" /></button>
  </form>
)

export default Input;