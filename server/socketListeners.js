const { formatMessage, addUser, removeUser, getUser, getUsersInRoom, getUserId } = require('./users');

const socketListeners = (socket, io) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        
        if (error) return callback(error);
        
        socket.join(user.room);
        
        socket.emit('message', formatMessage('admin', `${user.name}, welcome to the room ${user.room}`));
        socket.broadcast.to(user.room).emit('message', formatMessage('admin', `${user.name} has joined!`))
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    });

    socket.on('sendMessage', ({ message, receiverName }, callback) => {
        const user = getUser(socket.id);
        const receivers = receiverName !== null ? [getUserId(receiverName), socket.id] : [user.room];
        receivers.forEach(receiver => io.to(receiver).emit('message', formatMessage(user.name, message)));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
            io.to(user.room).emit('message', formatMessage('admin', `${user.name} has left.`));
        }
    });
}

module.exports = socketListeners; 