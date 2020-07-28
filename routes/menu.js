const express = require('express'); //imports express module
const router = express.Router();



/******* Menu Page *******/

// //const menuGet = (db) =>{
// module.exports = (db) => {
//   router.get("/menu", (req, res) => {
//     res.render("menu");
//     db.query(`
//       SELECT id, price, description, food_item_photo, category
//       FROM menu_items
//       ORDER BY category;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };


// //const menuPost = (db) => {
// module.exports = (db) => {
//   router.post("/menu", (req, res) => {
//     console.log(req.body);
//     // db.query(`SELECT * FROM users;`)
//     //   .then(data => {
//     //     const users = data.rows;
//     //     res.json({ users });
//     //   })
//     //   .catch(err => {
//     //     res
//     //       .status(500)
//     //       .json({ error: err.message });
//     //   });
//   });
//   return router;
// };


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM menu_items;`)
      .then(data => {
        console.log("data", data);
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });


      });
    res.render('menu');
  });

  return router;
};
