require('dotenv').config();
const express = require('express')
const cors = require("cors")
require('./src/db/mongoose')
const app = express()
const userRoutes = require('./src/routes/user')
const yelpRoutes = require('./src/routes/yelp')
const http = require('http')
const https = require('https')
const fs = require('fs')
const multer = require('multer')

const upload = multer({dest :  'uploads/'})

const env = process.env.ENVIRONMENT;
const cert = process.env.SSL_CERT;
const priv_key = process.env.SSL_PRIV_KEY;
let port = process.env.LOCAL_PORT;

if (env == "PROD") {
    port = process.env.PROD_PORT;
  }

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(yelpRoutes)

app.get('/' , (req,res)=>{
  res.send("Working")
})

// app.listen(8000,()=>{
//     console.log('working on port'+ port)   
    
//       // Set your secret key. Remember to switch to your live secret key in production.
// // See your keys here: https://dashboard.stripe.com/apikeys
// // const stripe = require('stripe')('sk_test_51N1BF2LBB5YOlndbPtySIqNUMDQqzXTQhYhVmCj2W7l6SFleZIVgfgRzD4m3pt5DI2vyrgmPy9v1fakvt4Jge8mW00O4N8wFw4');

// // // Token is created using Stripe Checkout or Elements!
// // // Get the payment token ID submitted by the form:
// // const token = "tok_1N1ByDLBB5YOlndbu4So3m3M"; // Using Express

// // const charge = stripe.charges.create({
// //   amount: 999,
// //   currency: 'usd',
// //   description: 'Example charge',
// //   source: token,
// // });

// })

if (process.env.SSL == "true") {
  server = https.createServer(
    {
      cert: fs.readFileSync(cert),
      key: fs.readFileSync(priv_key),
    },
    app
  );
  server.listen(port, () => {
    console.log(`Server running at port at ${port}...`);

  });
} else {
  server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server running at port at11 ${port}...`);
  });
}