// create web server 
// create a web server 
// import express 
const express = require('express');
const app = express();
const port = 3000;
// create a get route 
app.get('/', (req, res) => {
    res.send('Hello World');
});
// create a post route 
app.post('/', (req, res) => {
    res.send('Got a POST request');
});
// create a put route 
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user');
});
// create a delete route 
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
});
// create a listen 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// run the server 
// node comments.js
// open the browser 
// http://localhost:3000/
