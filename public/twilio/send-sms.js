// //twilio set up - jul 28 william outbound sms
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     body: 'A new order has come in!',
//     from: '+16042601034',
//     to: process.env.MY_PHONE_NUMBER
//   })
//   .then((message) => console.log(message.sid));

// i need to scrabble my accountSid / authToken and to: phone number with process.env

const accountSid = 'AC8c0648d4a54322a372f5d272b3f67067';
const authToken = 'f36678d63908876bad9e73cb61bfe303';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'A restaurant order has come in',
     from: '+16042601034',
     to: '+16043563256'
   })
  .then(message => console.log(message.sid));
