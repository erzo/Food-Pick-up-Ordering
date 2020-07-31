const express = require('express');
const router = express.Router();


/******* Place Order Page *******/

module.exports = (db) => {
  // router.get("/order", (req, res) => {
  //   res.render("order");
  // });


  const menuItemsArray = [];


  //get request on page load
  router.get("/", (req, res) => {
    console.log("fetching order")
    // console.log("db: ", db);
    db.query(`
    SELECT *
    FROM pickup_orders
    ORDER BY order_id DESC;`)
      .then(data => {
        // console.log("get order: ", data.rows[0].order_id);
        const orders = data.rows[0].order_id;
        db.query(`
          SELECT *
          FROM pickup_orders
          WHERE order_id = ${orders};`)
          .then(data => {
            // console.log(data.rows);
            const menuItems = data.rows.menu_item_id;
            for (const menuItems of data.rows) {
              console.log("menu items first thing: ", menuItems.menu_item_id);
              // console.log(data.rows);
              db.query(`
                SELECT *
                FROM menu_items
                WHERE id = ${menuItems.menu_item_id};`)
                .then(data => {
                  menuItemsArray.push(data.rows);
                })
            }
            //console.log("array of menu items second thing: ", menuItemsArray.flat(1));
            // res.json(menuItemsArray.flat(1))
            res.json(menuItemsArray)

          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.post("/order", (req, res) => {     <---- July29/Felipe

  //   const name = req.body.name;
  //   const email = req.body.email;
  //   const password = req.body.psw;
  //   const city = req.body.city;
  //   const address = req.body.address;
  //   const province = req.body.country
  //   const postalCode = req.body.pin;
  //   const additionalNotes = req.body.mobile;

  //   db.query(`INSERT INTO users (name, email, phone_number, address, city, province, postal_code)VALUES", (name , email, address, city, country , password)`)
  //   .then(data => {
  //     const menuItems = data.rows
  //     res.json({ menuItems })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  //     res.redirect("/confirmation");
  //   })
  // });

  return router;
};
