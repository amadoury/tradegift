const user = require('../models/User');
const cadeau = require('../models/Cadeau');
const utils = require('./utils');
const moment = require('moment');

let client = user.connect();
let c = cadeau.connect();

module.exports = {
    login_post : async (req, res) => {
        let b = await user.login(req.body);
        if (b){
          req.session.type_user = "cliente";
          req.session.authorized = true;
          req.session.pseudo_client = req.body.pseudo;

          let r = await user.search(req.session.pseudo_client);
          let now = new Date();
          let formattedDate = moment(r.datenaissance).format('YYYY-MM-DD');
          let month = moment(formattedDate).month() + 1;
          let day = moment(formattedDate).date();

          console.log("m :" + month + " d : " + day);
          console.log("m :" +  (now.getMonth() + 1) + " d : " + now.getDate());     

          if (month == (now.getMonth() + 1) && day == now.getDate()){
            console.log("hello world");
            req.session.first = true;
            res.json({flag:true, link:"/anniv"});
          }
          else{
            res.json({flag:true, link:"/"});
          }
        }
        else{
          res.json({flag : false, link:"/"});
        }
    },

    login: async (req, res) => {
      if (req.session.authorized && req.session.type_user === "cliente"){
        let data = utils.init(utils.data_header_cliente, 'main',  '../js/main.js', req.session.pseudo_client);
        let pointUser = await user.getPointUser(req.session.pseudo_client);
        let cadUser = await cadeau.cadUser(pointUser);
        var i = 0;
        l = [];
        while(i < cadUser.length){
          m = cadUser.slice(i, i+9);
          l.push(m);
          i += 9;
        }
        data.cadUser = l[0];
        data.nbPages = l.length;
        req.session.pages = l;
        res.render("index.ejs", data);
      
      }
      else{
        res.render('login.ejs', {link:"/"});
      }
    },

    anniv : async (req, res) => {
      if (req.session.authorized && req.session.type_user === "cliente"){
        let data = utils.init(utils.data_header_cliente, 'congrat',  '../js/main.js', req.session.pseudo_client);
        let pointUser = await user.getPointUser(req.session.pseudo_client);
       
        let cadUser = await cadeau.cadUser(pointUser);
        data.cadUser = cadUser;
        data.congrat = true;
        res.render("index.ejs", data);
      }else{
       res.render('login.ejs', {link:"/"});
      }
    },

    getPages: async (req, res) => {
      if (req.session.authorized && req.session.type_user === "cliente"){
        let data;
        if (parseInt(req.params.num, 10)== 0){
          data = utils.init(utils.data_header_cliente, 'main',  '../js/main.js', req.session.pseudo_client);
        }
        else{
          data = utils.init(utils.data_header_cliente, 'page',  '../js/main.js', req.session.pseudo_client);
        }
        data.cadUser = req.session.pages[parseInt(req.params.num, 10)];
        data.nbPages = req.session.pages.length;
        
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/"});
      }
    },

    add_post : async (req, res) => {
      if (req.session.authorized && req.session.type_user === "gerante"){
        await user.insert(req.body);
        let data = utils.init(utils.data_header_gerante, 'form_ajout',  '', undefined);
        data.allUser = await user.getUsers();
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/gerante"});
      }
    },

    add_get : (req, res) => {
      if (req.session.authorized && req.session.type_user === "gerante"){
        let data = utils.init(utils.data_header_gerante, 'form_ajout',  '', undefined);
        res.render("index.ejs", data);
      }
      else{
        res.render('login.ejs', {link:"/gerante"});
      }
    },

    list : async (req, res) => {
      if (req.session.authorized && req.session.type_user === "gerante"){
        let data = utils.init(utils.data_header_gerante, 'list_cliente',  '../js/list_client.js', undefined);
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
        let formattedDate = moment(r.datenaissance).format('YYYY-MM-DD')
        r.datenaissance = formattedDate;
        let data = utils.init(utils.data_header_gerante, 'modif_client',  '../js/modif_client.js', undefined);
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
      let b = await user.search(req.query.pseudo);
      res.json(b);
    },

    logout: async (req, res) => {
      let redirect_to = req.session.type_user === "gerante" ? "/gerante" : "/";
      req.session.destroy();
      res.json({link:redirect_to});
    },

    account: async (req, res) => {
      if (req.session.authorized && req.session.type_user === "cliente"){
        let cliente = await user.search(req.query.pseudo);
        if (cliente){
          let formattedDate = moment(cliente.datenaissance).format('YYYY-MM-DD')
          cliente.datenaissance = formattedDate;
          let data = utils.init(utils.data_header_cliente, 'account',  '', req.session.pseudo_client);
          data.user_data = cliente;
          res.render('index.ejs', data);
        }
      }
      else{
        res.redirect('/');
      }
    },

    change: async (req, res) => {
      user.edit(req.query)
      .then(function(result) { res.json({flag:true}); })
      .catch(function(err) { res.json({flag:false}); });
    }
}