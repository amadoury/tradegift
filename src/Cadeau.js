function Cadeau(client){

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

module.exports = Cadeau;