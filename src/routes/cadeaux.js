const cadeau = require('../models/Cadeau');
const user = require('../models/User');
const utils = require('./utils');

/* color logo : #264F0B */

let client = cadeau.connect();
let cl = user.connect();

module.exports = {
    get_cadeau: (req, res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
            let data = utils.init(utils.data_header_gerante, 'form_cadeau',  '../js/form_cadeau.js');
            res.render("index.ejs", data);
        }
        else{
            res.render('login.ejs', {link:"/gerante"});
        }
    },

    post_cadeau: async (req, res) => { 
        if (req.session.authorized && req.session.type_user === "gerante"){
            req.body.image = req.file.filename;
            if (req.body.couleur){
                if (req.body.couleur.constructor == Array){
                    req.body.couleur = req.body.couleur.join(":");
                }
            }
            await cadeau.insert(req.body);
            //let data = utils.init(utils.data_header_gerante, 'form_cadeau',  '../js/form_cadeau.js');
            res.json({flag:true, link:"/cadeau"});
        }
        else{
            res.json({flag:false, link:"/gerante"});
        }
    },

    list: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
            let data = utils.init(utils.data_header_gerante, 'list_cadeaux',  '../js/list_cadeaux.js');
            data.allCadeaux = await cadeau.getCadeaux();
            res.render("index.ejs", data);
        }
        else{
            res.render('login.ejs', {link:"/gerante"});
        }
    },

    edit: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
            let r = await cadeau.search(req.query.idcadeau);
            let data = utils.init(utils.data_header_gerante, 'modif_cadeau',  '../js/form_cadeau.js');
            data.cadeau_data = r;
            res.render('index.ejs', data);
        }
        else{
            res.render('login.ejs', {link:"/gerante"});
        }
    },

    delete: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
            await cadeau.delete(req.query.idcadeau);
            //res.redirect('/list_cadeaux');
            res.json({link:'/list_cadeaux'});
        }
        else{
            res.render('login.ejs', {link:"/gerante"});
        }
    },
    edit_post: async (req ,res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
            req.body.image = req.file.filename;
            if (req.body.couleur){
                if (req.body.couleur.constructor == Array){
                    req.body.couleur = req.body.couleur.join(":");
                }
            }
            //await cadeau.insert(req.body);
            await cadeau.edit(req.body);
            //let data = utils.init(utils.data_header_gerante, 'form_cadeau',  '../js/form_cadeau.js');
            res.json({flag:true, link:"/modif_cadeau"});
        }
        else{
            res.json({flag:false, link:"/gerante"});
        }
    },

    post_panier: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "cliente"){
            let r = await cadeau.search(req.body.idcadeau);
            //on doit check si le total dans le panier + le cadeau qu'on doit ajouter est <= pointUser
            if (r){
                if (req.session.panier){
                    req.session.panier.push(r);
                }
                else{
                    req.session.panier = [r];
                }
                res.json({});
            }  
            else{
                res.json({});
            }
        } 
        else{
            res.redirect('/');
        }
    },

    get_panier: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "cliente"){
            let data = utils.init(utils.data_header_cliente, 'panier', '../js/panier.js', req.session.pseudo_client);
            data.data_panier = req.session.panier ? req.session.panier : [];
            res.render('index.ejs', data);
        }   
        else{
            res.redirect('/');
        }
    },

    del_article_panier: async (req, res) => {
        if (req.session.authorized && req.session.type_user == "cliente"){
            let l = [];
            for (elem of req.session.panier){
                if (elem.id != parseInt(req.body.idcadeau)){
                    l.push(elem);
                }
            }
            req.session.panier = l;
            res.json({link:'/panier'});
        }
        else{
            res.redirect('/panier');
        }
    },

    panier_total: (req, res) => {
        if(req.session.authorized && req.session.type_user == "cliente"){
            let t = utils.calcul_total(req);
            res.json({total: t});
        }
        else{
            res.redirect('/panier'); 
        }
    },

    valid_cart: async (req, res) => {
        if(req.session.authorized && req.session.type_user == "cliente"){
            let total = utils.calcul_total(req);
            console.log("total " + total);
            let points_client = await user.getPointUser(req.session.pseudo_client);
            if (total <= points_client){
                await user.setPointUser(req.session.pseudo_client, points_client - total);
                req.session.panier = [];
                res.json({can_buy:true});
            }
            else{
                res.json({can_buy:false});
            }
        }
        else{
            res.redirect('/panier'); 
        }
    }
}