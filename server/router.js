const express = require('express');
const router = express.Router();
const { getRooms } = require('./users');

router.get('/', (req, res, next) => {
    res.send('Server is up and running');
});

router.get('/rooms', (req, res, next) => {
    res.status(200).json({ success: true, rooms: getRooms() });
});

module.exports = router;