const express = require('express');
const bodyParser = require('body-parser');
const router  = express.Router();


/******* Check Out Page *******/

module.exports = (db) => {
  router.get("/confirmation", (req, res) => {
    res.render("confirmation");
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    });
  return router;
};
