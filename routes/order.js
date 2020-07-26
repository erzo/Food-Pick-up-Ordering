const express = require('express');
const router  = express.Router();


/******* Place Order Page *******/

module.exports = (db) => {
  router.get("/order", (req, res) => {
    res.render("order");
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });
  return router;
};
