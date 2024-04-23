const express = require('express');
const user = require('./User');
const Cadeau = require('./Cadeau');
const server = express();
server.use(express.static('public'));
server.use(express.urlencoded({extended : true}));
server.set('view engine', 'ejs');

async function run(){

    let client = await user.connect();
    let cadeau = new Cadeau(client);

    server.get('/login', (req, res) => {
        res.sendFile("html/login.html", {root:'public'});
    });
    
    server.post('/login', async (req, res) => {
        if (req.body.pseudo === "gerante" && req.body.password === "gerante"){
            let data = { 
                data_header : [
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
              file_to_include:'list_cliente',
              allUser: await user.getUsers(),
              data_footer:''
            };
            res.render('gerante.ejs', data);
        }
        else{
            res.sendFile("html/login.html", {root:'public'});
        }
    });
    
    server.get('/gerante', async (req, res) => {
        let data = { 
            data_header : [
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
          file_to_include:'list_cliente',
          allUser: await user.getUsers(),
          data_footer:'../js/modif_client.js'
        };
        res.render("gerante.ejs", data);
    });
    
    server.get('/cadeau', (req, res) => {
        let data = { 
            data_header : [
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
          file_to_include:'form_cadeau',
          data_footer:'../js/form_cadeau.js'
        };
        res.render("gerante.ejs", data);
    });
    
    server.get('/add_cliente', (req, res) => {
        let data = { 
            data_header : [
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
          file_to_include:'form_ajout',
          data_footer:''
        };
        res.render("gerante.ejs", data);
    });
    
    server.post('/add_cliente', async (req, res) => {
        await user.insert(req.body);
        let data = { 
            data_header : [
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
          file_to_include:'form_ajout',
          allUser: await user.getUsers(),
          data_footer:''
        };
        res.render("gerante.ejs", data);
    });

    server.post('/cadeau', async (req, res) => {
        if (req.body.couleur.constructor == Array){
            req.body.couleur = req.body.couleur.join(":");
        }
        await cadeau.insert(req.body);
        let data = { 
            data_header : [
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
          file_to_include:'form_cadeau',
          data_footer:'../js/form_cadeau.js'
        };
        res.render('gerante.ejs', data);
    });
    

    server.get('/list_cadeaux', async (req, res) => {
        let data = { 
            data_header : [
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
          file_to_include:'list_cadeaux',
          allCadeaux: await cadeau.getCadeaux(),
          data_footer:''
        };
        res.render("gerante.ejs", data);
    });

    server.get('/modif_client', async (req, res) => {
        let r = await user.search(req.query.client);
        let data = { 
            data_header : [
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
          file_to_include:'modif_client',
          user_data: r,
          data_footer:''
        };
        res.render('gerante.ejs', data);
    });


    server.get('/modif_cadeau', async (req, res) => {
        let r = await cadeau.search(req.query.idcadeau);
        console.log(r);
        let data = { 
            data_header : [
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
          file_to_include:'modif_cadeau',
          cadeau_data: r,
          data_footer:'../js/form_cadeau.js'
        };
        res.render('gerante.ejs', data);
    });


    server.get('/delete_client', async (req, res) => {
        await user.delete(req.query.client);
        res.redirect('/gerante');
    });

    server.get('/delete_cadeau', async (req, res) => {
        await cadeau.delete(req.query.idcadeau);
        res.redirect('/list_cadeaux');
    });

    /* pas utilisé */
    server.get('/search_client', async (req, res) => {
        // let r = await user.search(req.query.idcadeau);
        // res.json(l);
    });


    server.listen(8080);
};

run().then(() => {}).catch((err) => {console.log(err)});

