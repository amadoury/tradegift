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
       await client.query("INSERT INTO cadeaux(nom, prix, taille, couleurs, image) VALUES($1, $2, $3, $4, $5)",
        [gift.nom, gift.prix, gift.taille, gift.couleur, gift.image]);
    };

    this.getCadeaux = async function(){
        let res = await client.query("SELECT * FROM cadeaux");
        l = [];
        for (row of res.rows){
            let colors = row.couleurs ? row.couleurs.split(":") : [];
            let len =  row.taille ? row.taille.split(":") : [];
            let ob = {
                id:row.id,
                nom:row.nom,
                prix:row.prix,
                image:row.image,
                taille:len,
                couleurs:colors
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
    
    this.edit = async (cad) => {
        console.log("dans edit " + cad.id);
        await client.query("UPDATE cadeaux SET nom=$1, prix=$2, taille=$3, couleurs=$4, image=$5 WHERE id = $6", 
            [cad.nom, cad.prix, cad.taille, cad.couleur,cad.image, cad.id]
        );
    }

    this.cadUser = async (pointUser) => {
        let all = await this.getCadeaux();
        let l = [];
        for(elem of all){
            if (elem.prix <= pointUser){
                l.push(elem);
            }
        }
        return l;
    }
}

module.exports = new Cadeau();