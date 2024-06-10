// create web server 
// express module
const express = require('express');
// create express object
const app = express();
// create server
const http = require('http');
const server = http.createServer(app);
// create socket.io object
const socketio = require('socket.io');
const io = socketio(server);
// create path object
const path = require('path');
// create fs object
const fs = require('fs');
// create comments array
let comments = [];
// create comments file
const commentsFile = path.join(__dirname, 'comments.json');
// read comments file
fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (!err) {
        comments = JSON.parse(data);
    }
});
// create socket.io connection
io.on('connection', (socket) => {
    // send comments array to client
    socket.emit('comments', comments);
    // receive comment from client
    socket.on('comment', (comment) => {
        // add comment to comments array
        comments.push(comment);
        // send comments array to client
        io.emit('comments', comments);
        // write comments array to comments file
        fs.writeFile(commentsFile, JSON.stringify(comments), (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
});
// create route for comments.html
app.get('/comments.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.html'));
});
// create route for comments.json
app.get('/comments.json', (req, res) => {
    res.json(comments);
});
// listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
