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
            if (req.body.taille){
                if (req.body.taille.constructor == Array){
                    req.body.taille = req.body.taille.join(":");
                }
            }
            
            await cadeau.insert(req.body);
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
            let data = utils.init(utils.data_header_gerante, 'modif_cadeau',  '../js/modif_cadeau.js');
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
            if (req.file){
                req.body.image = req.file.filename;
            }
            else{
                req.body.image = await cadeau.getImageById(parseInt(req.body.id, 10));
            }

            if (req.body.couleur){
                if (req.body.couleur.constructor == Array){
                    req.body.couleur = req.body.couleur.join(":");
                }
            }

            if (req.body.taille){
                if (req.body.taille.constructor == Array){
                    req.body.taille = req.body.taille.join(":");
                }
            }

            await cadeau.edit(req.body);
            res.json({flag:true, link:"/modif_cadeau"});
        }
        else{
            res.json({flag:false, link:"/gerante"});
        }
    },

    post_panier: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "cliente"){
            console.log("mon test");
            let r = await cadeau.search(req.body.idcadeau);
            if (r){
                let pointUser = await user.getPointUser(req.session.pseudo_client);
                if (req.session.panier){
                    if (utils.total_panier(req) + r.prix <= pointUser){
                        req.session.panier.push(r);
                        res.json({status:true});
                        return;
                    }
                }
                else{
                    if (utils.total_panier(req) + r.prix <= pointUser){
                        req.session.panier = [r];
                        res.json({status:true});
                        return;
                    }
                }
                res.json({status:false});
                return;
            }  
            else{
                res.json({status:false});
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
    },

    search_items: async (req, res) => {
        if (req.session.authorized && req.session.type_user == "gerante"){
            let r = await cadeau.searchByName(req.body.sname);
            res.json({cadeaux:r});
        }
        else if (req.session.authorized && req.session.type_user == "cliente"){
            let pointUser = await user.getPointUser(req.session.pseudo_client);
            let r = await cadeau.cadUser(pointUser);
            let l = [];
            for(elem of r){
                if (elem.nom === req.body.sname){
                    l.push(elem);
                }
            }
            res.json({cadeaux:l});
        }
        else{
            res.render('login.ejs', {link:"/"}); 
        }
    }
}