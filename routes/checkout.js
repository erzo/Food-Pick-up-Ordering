const express = require('express');
const router  = express.Router();


/******* Check Out Page *******/

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render("checkout");
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
