const e = require('express');

function Cadeau(){
    const pg = require('pg');
    const pool = new pg.Pool({
        user:'amadou',
        host:'localhost',
        database:'progweb',
        password:'postgres',
        port:5432
    });

    let client;

    this.connect = async function(){
        client = await pool.connect();
        return client;
    }

    this.insert = async function(gift){
       await client.query("INSERT INTO cadeaux(nom, prix, taille, couleurs) VALUES('"+ gift.nom +"','"+ gift.prix + "','" + gift.taille + "','" + gift.couleur+"')");
    };

    this.getCadeaux = async function(){
        let res = await client.query("SELECT * FROM cadeaux");
        l = [];
        for (row of res.rows){
            let ob = {
                id:row.id,
                nom:row.nom,
                prix:row.prix,
                taille:row.taille,
                couleurs:row.couleurs.split(":")
            };
            l.push(ob);
        }
        return l;
    }

    this.search = async function(idcadeau){
        let id = parseInt(idcadeau);
        let res = await client.query("SELECT * FROM \"cadeaux\"");
        for (row of res.rows){
            if (row.id === id){
                return row;
            }
        }
        return undefined;
    }

    this.delete = async function(idcadeau){
        await client.query("DELETE FROM \"cadeaux\" WHERE id = " + idcadeau);
    }
}

module.exports = new Cadeau();