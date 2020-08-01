import React from 'react';

import './ActiveUsers.css';

import { IoIosPeople } from 'react-icons/io';
import { MdCallReceived } from 'react-icons/md';

const ActiveUsers = ({ users, setReceiver, currentUser }) => {
  return (
    <div className="activeUsersContainer">
      <h5 className="mt-15 ml-10"><MdCallReceived className="activeUsersIcon" />Receiver:</h5>
      <h6 className="mt-10 ml-10" id="receiverName">Everybody</h6>
      <button className="resetReceiver mt-10 ml-10 p-15" onClick={() => {
          setReceiver(null);
          document.getElementById('receiverName').innerText = 'Everybody';
        }}>Send to all</button>
      {
        users
          ? (
            <div>
              <h5 className="mt-20 ml-10"><IoIosPeople className="activeUsersIcon" />Active users:</h5>
                  {users.map(({name}) => (
                    <div key={name} onClick={() => {
                      if (currentUser !== name) {
                        setReceiver(name);
                        document.getElementById('receiverName').innerText = name;
                    }}}><h6 className="activeUsersName mt-10 ml-10">{name}</h6></div>
                  ))}
            </div>
          )
          : null
      }
    </div>
  );
}
export default ActiveUsers;