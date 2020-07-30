const express = require('express'); //imports express module
const router = express.Router();

/******* Menu Page *******/

module.exports = (db) => {

  //get request on page load
  router.get("/", (req, res) => {
    console.log("fetching menu")
    // console.log("db: ", db);
    db.query(`SELECT * FROM menu_items;`)
      .then(data => {
        // console.log("data", data);
        const menu = data.rows;
        res.json({ menu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //post request on order button click
  router.post("/", (req, res) => {
    console.log("item posted");
    const menuItems = req.body;
    console.log(menuItems);
    db.query(`INSERT INTO orders DEFAULT VALUES RETURNING *;`)
      .then(data => {
        const order = data.rows[0] // <--
        console.log(order);

        for(const item of menuItems.menuItems) {
          console.log(item);
          console.log(item.menuItem);
          // db.query(`INSERT INTO pickup_orders (order_id, menu_item_id, quantity, total_price) VALUES ($1, $2, $3, $4);`, [order.id, item.menu_item_id, item.quantity, (item.price * item.quantity) ])
          db.query(`INSERT INTO pickup_orders (order_id, menu_item_id, quantity, total_price) VALUES ($1, $2, 1, 1);`, [order.id, item.menuItem])
          .then(data => {
            console.log("done", data);
          //   const menuItems = data.rows
          //   res.json({ menuItems
              })
          .catch(err => {
            // res
            // .status(500)
            // .json({ error: err.message });
            console.log("error: ", err);
          });
        }
      })
      .then(data => {
        res
        .status(200)
        res.json ({message: "success"})
      //   const menuItems = data.rows
      //   res.json({ menuItems
          })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    });
  return router;
};
