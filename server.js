// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
// const widgetsRoutes = require("./routes/widgets");
const confirmationRoutes = require("./routes/confirmation");    // <---------------- Felipe/July25
const orderRoutes = require("./routes/order");          // <---------------- Felipe/July25

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/users", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
///app.use("/confirmation", confirmationRoutes(db));    // <---------------- Felipe/July25
///app.use("/order", orderRoutes(db));          // <---------------- Felipe/July25


// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



/******* Main Page *******/

app.get("/", (req, res) => {
  console.log("hello");
  res.render("index");
});

app.post("/", (req, res) => {        // <---------------- Felipe/July25
  console.log(req.body);
});




// //<--- William / July 27
app.get("/menu", (req, res) => {
  res.render("menu");
});

app.post("/menu", (req, res) => {
  console.log(req.body);
  // this should add the item selected to order total bottom and a local object that holds the order for use later in order.ejs when the customer confirms the order (right side)
  res.render("menu");
});


app.get("/proceedtocheckout", (req, res) => {
  res.redirect('order');
});

app.get("/order", (req, res) => {
  // you enter the order form information before you click submit order to confirm your order
  res.render("order");
});

app.post("/order", (req, res) => {
  console.log(req.body);
  // insert individual object keys into database
  //res.render('confirmation', {orderdata: req.body});
  // this should store the req.body in a local object that can be referenced by get(confirmation)

  res.redirect('confirmation');
  //save req.body object to database for twilio so we have the phone number (orderdata.inputPhone)
});

app.get("/placeyourorder", (req, res) => {
  res.redirect('confirmation');
});

app.get("/confirmation", (req, res) => {
  res.render("confirmation", {orderdata: req.body});
});

app.post("/confirmation", (req, res) => {
  res.render("confirmation");
});



/******* Listens for Port *******/
app.listen(PORT, () => {
  console.log("hello2")
  console.log(`Example app listening on port ${PORT}`);
});

