const users = [];

const formatMessage = (user, text) => new Object({user, text, date: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })});

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(user => user.room === room && user.name === name);
    
    if (existingUser) {
        return { error: 'Username has been taken!'};
    }

    const user = { id, name, room };
    users.push(user);
    return { user };
}

const removeUser = id => {
    const index = users.find(user => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = id => users.find(user => user.id === id);

const getUserId = name => users.find(user => user.name === name).id;

const getUsersInRoom = room => users.filter(user => user.room === room);

const getRooms = () => Array.from(new Set(users.map(user => user.room)));

module.exports = { formatMessage, addUser, removeUser, getUser, getUserId, getUsersInRoom, getRooms };