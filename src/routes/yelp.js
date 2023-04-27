const express = require('express');
const { searchBusiness } = require("../controllers/yelp");
// const router = 
const router = new express.Router()

router.post('/api/search-business', searchBusiness )
// router.post('/api/login' , login)




module.exports = router