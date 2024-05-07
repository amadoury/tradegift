
function User(){
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

    this.search = async function(pseudo){
        let res = await client.query("SELECT * FROM \"user\"");
        for (row of res.rows){
            if (row.pseudo === pseudo){
                return row;
            }
        }
        return undefined;
    }

    this.insert = async function(user){
        await client.query("INSERT INTO \"user\" VALUES ($1, $2, $3, $4)", [user.pseudo, user.password, user.points, user.dateNaissance]);
    }

    this.getUsers = async function(){
        let res = await client.query("SELECT * FROM \"user\"");
        l = [];
        for (row of res.rows){
            let ob = {
                pseudo:row.pseudo,
                password:row.password
            };
            l.push(ob);
        }
        return l;
    }

    this.delete = async function(pseudo){
        await client.query("DELETE FROM \"user\" WHERE pseudo = '" + pseudo + "'");
    }

    this.login = async function(user){
        let res = await this.search(user.pseudo); 
        if (res){
            if (res.password === user.password){
                return true;
            }
        }
        return false;
    }

    this.login_gerante = async (gerante) => {
        let res = await client.query("SELECT * FROM gerante");
        for (row of res.rows){
            if (row.pseudo === gerante.pseudo && row.password == gerante.password){
                return true;
            }
        }
        return false;
    };

    /* edit the user's data */
    this.edit = async (user) => {
        return new Promise(function(resolve, reject){ 
            client.query("UPDATE \"user\" SET pseudo=$1, password=$2, points=$3, datenaissance=$4 WHERE pseudo=$5", 
            [user.pseudo, user.password, user.points, user.dateNaissance, user.pseudo], function(err, result){
                if (result.rowCount == 0){
                    return reject(false);
                }
                else{
                    return resolve(true);
                }
            });
        });
    },

    this.getPointUser = async (pseudo) => {
        let pt = await client.query("SELECT points FROM \"user\" WHERE pseudo=$1", [pseudo]);
        return pt.rows[0].points;
    }
}

module.exports = new User();