const express = require('express');
const server = express();
server.use(express.static('public'));


server.get('/login', (req, res) => {
    res.sendFile("login.html", {root:'public'});
});

server.listen(8080);