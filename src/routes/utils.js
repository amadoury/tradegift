module.exports = {
    data_header_gerante: [
        {
          name:'Add Cliente',
          link:'/add_cliente'
        },
        {
          name:'Add Cadeau',
          link:'/cadeau'
        },
        {
            name:'Liste Clientes',
            link:'/gerante'
        },
        {
            name:'Liste Cadeaux',
            link:'/list_cadeaux'
        }
    ],

    data_header_cliente: [
        {
            name:'Panier',
            link:'/panier'
        }
    ],
    
    init: (data_header, file_to_include, data_footer, pseudo) => {
        let d = {};
        d.data_header = data_header;
        d.file_to_include = file_to_include;
        d.data_footer = data_footer;
        d.pseudo_client = pseudo;
        return d;
    },

    get_prix : (req, idcadeau) => {
        for(var i = 0; i < req.session.panier.length; i++){
            if (req.session.panier[i].id == idcadeau){
                return req.session.panier[i].prix;
            }
        }
        return 0;
    },

    total_panier : (req) => {
        let sum = 0;
        if (req.session.panier){
            for (cad of req.session.panier){
                sum += cad.prix;
            }
            return sum;
        }
        else{
            return sum;
        }
    },

    calcul_total : (req) => {
        let donne;
        Object.entries(req.body).forEach(([k, v], i) => donne = k);
        donne= '[' + donne + ']';
        donne = JSON.parse('[' + donne + ']');
        let sum = 0;
        for(var i = 0; i < donne[0].length; i++){
            sum += module.exports.get_prix(req, donne[0][i].id) * donne[0][i].qte; 
        }
        return sum;
    }
}
