const e = require('express');

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

    this.search = async function(user){
        let res = await client.query("SELECT * FROM \"user\"");
        for (row of res.rows){
            if (row.pseudo === user){
                return row;
            }
        }
        return undefined;
    }

    this.insert = async function(user){
        await client.query("INSERT INTO \"user\" VALUES ('" + user.pseudo +"','" + user.password +"')");
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
}


module.exports = new User();