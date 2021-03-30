# Real-time chat application
 
This is a real time chat application built with Socket.io. It is composed of one back end application deployed on Heroku and one front end application deployed on Netlify. [Check the website](https://borntochat.netlify.app)
##### Note: Website might be down at certain times.

![img](https://github.com/vuusale/realtimechat/blob/master/screenshot.PNG)

#### Main technologies used:
<ul>
  <li>Node.js</li>
  <li>React.js</li>
  <li>Socket.io</li>
</ul>

## Prerequisites
It is needed to install Node.js and Node Package Manager (npm) for development purposes.

### Node
- #### Node installation on Windows

  Just go to [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install Node.js and npm easily with apt install, just run the following commands:

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.16.1

    $ npm --version
    6.14.5

If you need to update `npm`, you can make it using `npm`!

    $ npm install npm -g
    

## Installation
  After cloning the repository, run `npm install` in both server and client directories. It will install all needed dependencies. When installation is complete, open 2 terminals and run the following commands:
  - #### First terminal:
    
        cd server
        npm start
    
  - #### Second terminal

        cd client
        npm run dev
      
  Now application is running on localhost.
  
## Preview
This application makes use of web sockets to establish full-duplex communication channels between clients. WebSocket protocol facilitates interaction between a client and a web server with less overhead compared to HTTP.

Once a user enters a room, a socket is created and a unique SocketId is assigned to it. It lives until one side decides to terminate the connection. In order to communicate, sides emit different requests to socket listeners. 

In this project, users visiting the website can view current rooms and join one of them or create a new one. Data about current rooms are obtained through a get request to the back end. In rooms, they can send messages to other users. In addition, users have an option to choose a particular recipient and send messages to it only. For this purpose, they can just click the username of that user in the active users list on the left pane. There also exists a button to reset the receivers to everybody.

### How it works
Behind the scenes, back end application holds a simple data structure — an array to store details belonging to users. When a user enters a chatroom, `join` request is emitted and an object is pushed to the 'users' array. This object consists of socket id, user name and room name. Before, it is examined whether a user with the same username exists in that specific room. If yes, it rejects the join request and sends an error message `Username has been taken`. Else, socket is successfully established. Thereupon, each message sent by a user emits `sendMessage` request to the server. In response, server triggers `message` listener on the front end and sends necessary information (sender name, sent time) about the message. Finally, new message component is pushed to the react application and shown to the proper receivers.
