module.exports = {
    data_header_gerante: [
        {
          name:'Add Cliente',
          link:'add_cliente'
        },
        {
          name:'Add Cadeau',
          link:'cadeau'
        },
        {
            name:'Liste Clientes',
            link:'gerante'
        },
        {
            name:'Liste Cadeaux',
            link:'list_cadeaux'
        }
    ],

    data_header_cliente: [
        {
            name:'Panier',
            link:'panier'
        }
    ],
    
    init: (data_header, file_to_include, data_footer, is_cliente) => {
        let d = {};
        d.data_header = data_header;
        d.file_to_include = file_to_include;
        d.data_footer = data_footer;
        d.is_cliente = is_cliente;
        return d;
    }
}
