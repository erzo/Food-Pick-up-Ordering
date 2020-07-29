require('dotenv').config();
const { Pool } = require('pg');
// const Client = require('pg-native');
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
console.log(connectionString);
// const client = new Client();
// client.connectSync(connectionString);
// console.log("client: ", client);
// let sql = 'SELECT * FROM menu_items;'
// let results = client.querySync(sql);
// console.log(results);
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
const db = new Pool({connectionString: connectionString});
db.connect();


let p = db.query(`SELECT * FROM menu_items;`)
console.log(p);
setTimeout(() => {console.log(p);}, 2000)
      p.then(data => {
        console.log("data", data);
        const menu = data.rows;
        console.log(menu);
        // res.json({ menu });
        //res.render("menu", menu);
      })
      .catch(err => {
        // res
        //   .status(500)
        //   .json({ error: err.message });

        console.log(err);

      });
