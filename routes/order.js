const express = require('express');
const router  = express.Router();


/******* Place Order Page *******/

module.exports = (db) => {
  router.get("/order", (req, res) => {
    res.render("order");
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
