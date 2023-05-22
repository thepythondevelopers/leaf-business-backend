const express = require("express");
const Mailgen = require('mailgen')
// const router =
const router = new express.Router();
const nodemailer = require('nodemailer');

const stripe = require("stripe")(
  "sk_test_51LD42cSJb05mAKIhulGhSsRo6e7v8OAA4IdkNBkCQPwIacUSOFybWXogCp3m1aDJ3CGrKvsPIk6gS2hGGJbAwjjN00LEG1yqfb"
);

const uuid = require("uuid").v4;

router.post("/api/send-email",async(req,res)=>{
  console.log("email::",req.body.email);

  let config = {
    service : 'gmail',
    auth : {
      user:'qa.pamsar@gmail.com',
      pass:'mqfnssojgtnghbyb'
    }
  }
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;

var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd}
if(mm<10){mm='0'+mm}
var today = dd+'/'+mm+'/'+yyyy;
  let transporter=nodemailer.createTransport(config);
  let message = {
    from:'qa.pamsar@gmail.com',
    to:req.body.email,
    subject:"Promotion created",
    html:`
    <h2>Promotion Details</h2>
    <p>Payment for the promotion on leaf bussiness is successfull</p>
    <ul>
      <li><strong>Date: </strong>${today}</li>
      <li><strong>Name: </strong>${req.body.name}</li>
      <li><strong>User Address: </strong>${req.body.address}</li>
      <li><strong>User Postal Code: </strong>${req.body.postal_code}</li>
      <li><strong>User State: </strong>${req.body.state}</li>
      <li><strong>User Country: </strong>${req.body.country}</li>
      <li><strong>User Email: </strong>${req.body.email}</li>
      <li><strong>Business Name: </strong>${req.body.buss_name}</li>
      <li><strong>Business Address: </strong>${req.body.buss_address}</li>
      <li><strong>Business City: </strong>${req.body.buss_city}</li>
      <li><strong>Business Country: </strong>${req.body.buss_country}</li>
      <li><strong>Payment ID: </strong>${req.body.payment_id}</li>
      <li><strong>Payment made: </strong>${req.body.amount}</li>
      <li><strong>Promotion Start Date: </strong>${req.body.start_date}</li>
      <li><strong>Promotion End Date: </strong>${req.body.end_date}</li>
    </ul>
    `
  }
  transporter.sendMail(message).then(()=>{
    res.json({msg:"you should receive an email"})
  }).catch(error=>{
    res.status(500).json({error})
  })
  //res.status(201).json("getBill Successfully...!");
})

router.post("/api/create-token", async (req, res) => {
  const token = await stripe.tokens.create({
    card: {
      number: req.body.number,
      exp_month: req.body.exp_month,
      exp_year: req.body.exp_year,
      cvc: req.body.cvc,
    },
  });

  res.json({
    //ConfirmPaymentIntent: ConfirmPaymentIntent,
    token: token,
  });
});

router.post("/api/checkout", async (req, res) => {
    console.log("request::",req);
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    address: {
      line1: req.body.address,
      postal_code: req.body.postal_code,
      state: req.body.state,
      country: req.body.country,
    },
  });
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2019-02-11" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount*100,
    currency: "usd",
    customer: customer.id,
    description: "Payment to the supplier",
    automatic_payment_methods: { enabled: false },
  });
  console.log("payment intent::", paymentIntent.client_secret);

  /*const ConfirmPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    { payment_method_types: ["card"] }
  );*/

  res.json({
    //ConfirmPaymentIntent: ConfirmPaymentIntent,
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

const handleErrors = (err) => {
  const errors = { email: "" };
  Object.values(err.errors).forEach((errEle) => {
    errProperties = errEle.properties;
    errors["message"] = errProperties.message;
  });
  return errors;
};

module.exports = router;
