const express = require('express');
const session = require('express-session');
const users = require('./routes/users');
const cadeaux = require('./routes/cadeaux');
const server = express();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/assets/img/');
  },
  filename:(req, file, cb) => {
      cb(null, file.originalname);
  }
});
const upload = multer({storage:storage});

// server.use(express.json());
server.use(express.urlencoded({extended:true}));

/* use */
server.use(express.static('public'));
server.use(express.urlencoded({extended : true}));
server.set('view engine', 'ejs');
server.use(session({
    secret:'thisissecret',
    rolling:true,
    cookie:{
      sameSite:'strict',
      maxAge:600000,
    },
    saveUninitialized:true
}));

async function run(){

    server.get('/cliente', (req, res)=> {
      res.send("hello world");
    }); 
  
    /* users routes */
    server.get('/', users.login);
    server.post('/', users.login_post);
    server.post('/gerante', users.gerante_login);
    server.get('/gerante', users.list);
    server.get('/add_cliente', users.add_get);
    server.post('/add_cliente', users.add_post);
    server.get('/delete_client', users.delete);
    server.get('/modif_client', users.edit);
    server.get('/search', users.search);
    server.get('/logout', users.logout);
    server.get('/account', users.account);
    server.get('/change', users.change);

    /* cadeaux routes */
    server.get('/cadeau',cadeaux.get_cadeau);
    server.post('/cadeau', upload.single("image"), cadeaux.post_cadeau);
    server.get('/list_cadeaux', cadeaux.list);
    server.get('/modif_cadeau', cadeaux.edit);
    server.post('/modif_cadeau', upload.single("image"), cadeaux.edit_post);
    server.get('/delete_cadeau', cadeaux.delete);
    
    /* panier */
    server.post('/panier', cadeaux.post_panier);
    server.get('/panier', cadeaux.get_panier);
    server.post('/del_article_panier', cadeaux.del_article_panier);

    server.use((req, res)=> {
      console.log(req.body);
    })

    server.listen(8080);
};

run().then(() => {}).catch((err) => {console.log(err)});

