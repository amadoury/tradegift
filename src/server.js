const express = require('express');
const server = express();
server.use(express.static('public'));
server.use(express.urlencoded({extended : true}));
server.set('view engine', 'ejs');


server.get('/login', (req, res) => {
    res.sendFile("html/login.html", {root:'public'});
});

server.post('/login', (req, res) => {
    console.log(req.body);
    console.log("hello world");
});

server.listen(8080);