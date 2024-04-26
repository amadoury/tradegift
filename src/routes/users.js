const user = require('../models/User');

let client = user.connect();

let data_header_gerante =  [
    {
      name:'add cliente',
      link:'add_cliente'
    },
    {
      name:'add cadeau',
      link:'cadeau'
    },
    {
        name:'liste cliente',
        link:'gerante'
    },
    {
        name:'liste cadeaux',
        link:'list_cadeaux'
    }
];

function init(data_header, file_to_include, data_footer){
  let d = {};
  d.data_header = data_header;
  d.file_to_include = file_to_include;
  d.data_footer = data_footer;
  return d;
}

module.exports = {
    login : async (req, res) => {
        let b = await user.login(req.body);
        if (b){
          req.session.authorized = true;
          res.redirect('/');
        }
        else{
          res.redirect('/');
        }
    },

    add_post : async (req, res) => {
      if (req.session.authorized){
        await user.insert(req.body);
        let data = init(data_header_gerante, 'form_ajout',  '');
        data.allUser = await user.getUsers();
        res.render("index.ejs", data);
      }
      else{
        redirect('/gerante', {link:"/gerante"});
      }
    },

    add_get : (req, res) => {
      if (req.session.authorized){
        let data = init(data_header_gerante, 'form_ajout',  '');
        res.render("index.ejs", data);
      }
      else{
        res.redirect('/gerante', {link:"/gerante"});
      }
    },

    list : async (req, res) => {
        if (req.session.authorized){
          let data = init(data_header_gerante, 'list_cliente',  '../js/modif_client.js');
            data.allUser = await user.getUsers();
            res.render("index.ejs", data);
          }
          else{
            res.render('login.ejs', {link:"/gerante"});
          }
    },

    edit : async (req, res) => {
      if (req.session.authorized){
        let r = await user.search(req.query.client);
        let data = init(data_header_gerante, 'modif_client',  '');
        data.user_data = r;
        res.render('index.ejs', data);
      }
      else{
        res.redirect('/gerante', {link:"/gerante"});
      }
    },
    
    delete: async (req, res) => {
      if (req.session.authorized){
          await user.delete(req.query.client);
          res.redirect('/gerante');
        }
        else{
          res.redirect("/gerante", {link:"gerante"});
        }
    },

    gerante_login: async (req, res) => {
        let b = await user.login_gerante(req.body);
        if (b){
          req.session.authorized = true;
          res.redirect('/gerante');
        }
        else{
          res.render('login.ejs', {link:"/gerante"});
        }
    }
}