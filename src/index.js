const express = require('express')

const cors = require("cors")
require('./db/mongoose')
const app = express()
const userRoutes = require('./routes/user')

app.use(express.json())
app.use(cors())
app.use(userRoutes)



app.listen(8000,()=>{
    console.log('working on port 8000')
})

