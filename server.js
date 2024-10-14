// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files from the "calendar_updated" folder
app.use(express.static(path.join(__dirname, 'calendar_updated')));

// When a client connects
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for 'update-event' from clients
    socket.on('update-event', (eventData) => {
        // Broadcast the event to all other connected clients
        socket.broadcast.emit('event-updated', eventData);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
