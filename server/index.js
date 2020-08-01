const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const router = require('./router');
const socketListeners = require('./socketListeners');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 5000;

io.on('connection', socket => {
    socketListeners(socket, io);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.DEV_FRONT_URL);
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(router);
app.use(cors());

server.listen(port, () => console.log(`Listening on port ${port}...`));