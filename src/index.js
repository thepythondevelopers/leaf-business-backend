require('dotenv').config();
const express = require('express')
const cors = require("cors")
require('./db/mongoose');
const bodyparser = require('body-parser');
const app = express()
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const userRoutes = require('./routes/user')
const paymentRoutes = require('./routes/payment')

const env = process.env.ENVIRONMENT;
const cert = process.env.SSL_CERT;
const priv_key = process.env.SSL_PRIV_KEY;
let port = process.env.LOCAL_PORT;
console.log(port);

if (env == "PROD") {
    port = process.env.PROD_PORT;
  }

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(paymentRoutes)




app.listen(port,()=>{
    console.log('working on port'+ port)
})

