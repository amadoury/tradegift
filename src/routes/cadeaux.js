const cadeau = require('../models/Cadeau');
const utils = require('./utils');

let client = cadeau.connect();

/* color logo : #264F0B */

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
            if (req.body.couleur.constructor == Array){
                req.body.couleur = req.body.couleur.join(":");
            }
            await cadeau.insert(req.body);
            let data = utils.init(utils.data_header_gerante, 'form_cadeau',  '../js/form_cadeau.js');
            res.render('index.ejs', data);
        }
        else{
            res.render('login.ejs', {link:"/gerante"});
        }
    },

    list: async (req, res) => {
        if (req.session.authorized && req.session.type_user === "gerante"){
            let data = utils.init(utils.data_header_gerante, 'list_cadeaux',  '');
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
            res.redirect('/list_cadeaux');
        }
        else{
            res.render('login.ejs', {link:"/gerante"});
        }
    }
}