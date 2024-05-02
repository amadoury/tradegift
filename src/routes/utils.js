module.exports = {
    data_header_gerante: [
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
    ],
    
    init: (data_header, file_to_include, data_footer, include_header) => {
        let d = {};
        d.data_header = data_header;
        d.file_to_include = file_to_include;
        d.data_footer = data_footer;
        d.include_header = include_header;
        return d;
    }
}
