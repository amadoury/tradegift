const user = require('../models/User');
const utils = require('./utils');

let client = user.connect();

module.exports = {
    login_post : async (req, res) => {
        console.log("dans le route post login");
        let b = await user.login(req.body);
        if (b){
          req.session.type_user = "cliente";
          req.session.authorized = true;
          res.json({flag:true, link:"/"});
        }
        else{
          res.json({flag : false, link:"/"});
        }
    },

    login: (req, res) => {
      if (req.session.authorized && req.session.type_user === "cliente"){
        let data = utils.init(utils.data_header_gerante, 'main',  '');
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/"});
      }
    },

    add_post : async (req, res) => {
      if (req.session.authorized && req.session.type_user === "gerante"){
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
      if (req.session.authorized && req.session.type_user === "gerante"){
        let data = utils.init(utils.data_header_gerante, 'form_ajout',  '');
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/gerante"});
      }
    },

    list : async (req, res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
          let data = utils.init(utils.data_header_gerante, 'list_cliente',  '../js/modif_client.js');
            data.allUser = await user.getUsers();
            res.render("index.ejs", data);
          }
          else{
            res.render('login.ejs', {link:"/gerante"});
          }
    },

    edit : async (req, res) => {
      if (req.session.authorized && req.session.type_user === "gerante"){
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
      if (req.session.authorized && req.session.type_user === "gerante"){
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
          req.session.type_user = "gerante";
          req.session.authorized = true;
          res.json({flag:true, link:"/gerante"});
        }
        else{
          res.json({flag:false, link:"/gerante"});
        }
    },

    search: async (req, res) => {
      console.log("dans la requete wnzjeiugbbzugbfzifzg");
      // console.log("req.query : " + req.query);
      // let b = await user.login(req.query);
      // res.json(b);
    },

    logout: async (req, res) => {
      let redirect_to = req.session.type_user === "gerante" ? "/gerante" : "/";
      req.session.destroy();
      res.json({link:redirect_to});
    }
}