const express = require('express');
const session = require('express-session');
const users = require('./routes/users');
const cadeaux = require('./routes/cadeaux');
const server = express();

/* use */
server.use(express.static('public'));
server.use(express.urlencoded({extended : true}));
server.set('view engine', 'ejs');
server.use(session({
    secret:'thisissecret',
    rolling:true,
    cookie:{
      sameSite:'strict',
      maxAge:600000
    }
}));

async function run(){

    server.get('/', (req, res) => {
      if (req.session.authorized){
        res.redirect("/cliente");
      }
      else{
        res.render('login.ejs', {link:"/"});
      }
    });

    server.get('/cliente', (req, res)=> {
      res.send("hello world");
    });
  
  
    /* users routes */
    server.post('/', users.login);
    server.post('/gerante', users.gerante_login);
    server.get('/gerante', users.list);
    server.get('/add_cliente', users.add_get);
    server.post('/add_cliente', users.add_post);
    server.get('/delete_client', users.delete);
    server.get('/modif_client', users.edit);


    /* cadeaux routes */
    server.get('/cadeau',cadeaux.get_cadeau);
    server.post('/cadeau', cadeaux.post_cadeau);
    server.get('/list_cadeaux', cadeaux.list);
    server.get('/modif_cadeau', cadeaux.edit);
    server.get('/delete_cadeau', cadeaux.delete);


    server.listen(8080);
};

run().then(() => {}).catch((err) => {console.log(err)});

