const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

// adjusting our request and response
app.use(cors());
app.use(bodyParser.json());
// These is for test
// ROUTE 
const expenserouter = require('./Routes/expense.js')
const incomerouter = require('./Routes/income.js')
const groupexpenserouter = require('./Routes/groupexpense.js')
const groupincomerouter = require('./Routes/groupincome.js')
const ikubexpenserouter = require('./Routes/ikubexpense.js')
const authrouter = require('./Routes/auth.js')
const postroutes = require('./Routes/post.js')


// Forwarding the urls to their appropriate route
app.use('/posts', postroutes)
app.use('/expenses', expenserouter)
app.use('/incomes', incomerouter)
app.use('/groupexpenses', groupexpenserouter)
app.use('/groupincomes', groupincomerouter)
app.use('/ikubexpenses', ikubexpenserouter)
app.use('/auth', authrouter)


app.get('/', (req, res) => {
    res.send("A Message from the server")

});


// Connect to db
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log("Connected to db")})

const Port = process.env.Port || 3000;
// listening to the server
app.listen(Port, () => {console.log("Connecting")});