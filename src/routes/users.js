const user = require('../models/User');
const utils = require('./utils');

let client = user.connect();

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
        let data = utils.init(utils.data_header_gerante, 'form_ajout',  '');
        data.allUser = await user.getUsers();
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/gerante"});
      }
    },

    add_get : (req, res) => {
      console.log("req.session : "+ req.session);
      if (req.session.authorized){
        let data = utils.init(utils.data_header_gerante, 'form_ajout',  '');
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/gerante"});
      }
    },

    list : async (req, res) => {
        if (req.session.authorized){
          let data = utils.init(utils.data_header_gerante, 'list_cliente',  '../js/modif_client.js');
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
        let data = utils.init(utils.data_header_gerante, 'modif_client',  '');
        data.user_data = r;
        res.render('index.ejs', data);
      }
      else{
        res.render('login.ejs', {link:"/gerante"});
      }
    },
    
    delete: async (req, res) => {
      if (req.session.authorized){
          await user.delete(req.query.client);
          res.redirect('/gerante');
        }
        else{
          res.render('login.ejs', {link:"gerante"});
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