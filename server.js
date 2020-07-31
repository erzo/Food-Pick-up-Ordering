// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

//twilio set up - jul 28 william inbound sms
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//twilio set up - jul 28 william outbound sms
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



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
// const { connectionString } = require('./lib/db.js');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/users", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/order", orderRoutes(db));
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
  // console.log(req.body);
  //   // this should add the item selected to order total bottom and a local object that holds the order for use later in order.ejs when the customer confirms the order (right side)
  res.render("menu");
});


app.get("/proceedtocheckout", (req, res) => {
  res.redirect('order');
});

app.get("/order", (req, res) => {
  res.render("order");
});


/**************** NEW ITEM  **************************/

// //get request on page load
// app.get("/order", (req, res) => {
//   console.log("fetching order")
//   // console.log("db: ", db);
//   db.query(`SELECT * FROM pickup_orders;`)
//     .then(data => {
//       console.log("data", data);
//       const orders = data.rows;
//       // res.json({ orders });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

/**************** NEW ITEM  **************************/

app.post("/order", (req, res) => {
  console.log(req.body);
  client.messages
    .create({
      body: 'Your sushi order have been received by Super Kami Sushi. Please reply "YES" to this number to get your estimated pick up time.',
      from: '16042601034',
      to: process.env.WILLIAM_PHONE_NUMBER
      //to: process.env.FELIPE_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
  .then(() => res.redirect('confirmation'), { orderdata: req.body });
  // .then(() => res.render('confirmation', { orderdata: req.body }));
  // insert individual object keys into database
  // res.render('confirmation', { orderdata: req.body });
  // this should store the req.body in a local object that can be referenced by get(confirmation)

  // res.redirect('confirmation');
  //save req.body object to database for twilio so we have the phone number (orderdata.inputPhone)
});


//don't think post / get '/placeyourorder' is used anymore
// app.post("/placeyourorder", (req, res) => {
//   res.redirect('confirmation');
// });

// app.get("/placeyourorder", (req, res) => {
//   res.redirect('confirmation');
// });

app.get("/confirmation", (req, res) => {
  res.render("confirmation", { orderdata: req.body });
});

app.post("/confirmation", (req, res) => {
  res.render("confirmation");
});

// //twilio set up - jul 28 william estimateTime formula maker
const estimatedTime = function (number) {
  let orderTime = 0;
  if (number.length > 0 && number.length < 3) {
    orderTime = "20 minutes";
  } else if (number.length >= 3) {
    orderTime = "30-40 minutes";
  }
  return orderTime;
}


//for this to run ngrok has to be up WHILE the server is up as well
//ngrok http 8080 and then npm start will allow the text to work
// //twilio set up - jul 28 william inbound sms
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  // const util = require('util');
  // const setTimeoutPromise = util.promisify(setTimeout);

  twiml.message(`The estimated pick up time for your order is (MINUTES). We will message you again once your order is ready for pick up.`)

  // twiml.message(`Thank you for ordering with us. The estimated pick up time for your order will be ${estimatedTime}`)

  const reply = function () {
    // const twiml = new MessagingResponse();
    // twiml.message(`Your order has been completed. Please come to the Super Kami Sushi for pick up`)
    // console.log("test text")
    client.messages
      .create({
        body: 'Your order has been completed. Please come to Super Kami Sushi for pick up!',
        from: '16042601034',
        to: process.env.WILLIAM_PHONE_NUMBER
        //to: process.env.FELIPE_PHONE_NUMBER
      })
  }

  // setTimeoutPromise(40, 'foobar').then((value) => {
  // value === 'foobar' (passing values is optional)
  // This is executed after about 40 milliseconds.


  // setTimeout(10000, `Your order has been completed. Please come to the Super Kami Sushi for pick up`).then((twiml.message(value)) => {
  // });

  setTimeout(reply, 5000);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.post("/deleteorder", (req, res) => {

  console.log("Success");
  console.log("reqbody", req.body);
  console.log("reqbody", req.body.info);
  var reqData = (req.body);
// we now send the data.id which can represent the order.id and taking that we can delete from the order table the specific order
  res.status(200).end();
});

/******* Listens for Port *******/
app.listen(PORT, () => {
  // console.log("hello2")
  console.log(`Example app listening on port ${PORT}`);
});

