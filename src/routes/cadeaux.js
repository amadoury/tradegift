const cadeau = require('../models/Cadeau');

let client = cadeau.connect();


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
    get_cadeau: (req, res) => {
        let data = init(data_header_gerante, 'form_cadeau',  '../js/form_cadeau.js');
        res.render("index.ejs", data);
    },
    post_cadeau: async (req, res) => {
        if (req.body.couleur.constructor == Array){
            req.body.couleur = req.body.couleur.join(":");
        }
        await cadeau.insert(req.body);
        let data = init(data_header_gerante, 'form_cadeau',  '../js/form_cadeau.js');
        res.render('index.ejs', data);
    },

    list: async (req, res) => {
        let data = init(data_header_gerante, 'list_cadeaux',  '');
        data.allCadeaux = await cadeau.getCadeaux();
        res.render("index.ejs", data);
    },
    edit: async (req, res) => {
        let r = await cadeau.search(req.query.idcadeau);
        let data = init(data_header_gerante, 'modif_cadeau',  '../js/form_cadeau.js');
        data.cadeau_data = r;
        res.render('index.ejs', data);
    },
    delete: async (req, res) => {
        await cadeau.delete(req.query.idcadeau);
        res.redirect('/list_cadeaux');
    }
}