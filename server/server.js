const express =require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const patientUser = require('./routes/patientUser');
const order = require('./routes/order');
const invoice = require('./routes/invoice');
const employee = require('./routes/employee')
const product = require('./routes/product')
const cors = require('cors');

//const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({extended:'true'}));
app.use(express.json());
app.use(cors());
app.use('/api/patientUser', patientUser);
app.use('/api/Order', order);
app.use('/api/Invoice', invoice);
app.use('/api/employee', employee);
app.use ('/api/product',product);

app.get('/',(req,res)=>{
    res.send('hello world');
});



const port = process.env.PORT || 5000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

mongoose.connect('mongodb://localhost/pharmasolution')
.then(() => winston.info('connected to mongodb...'));

module.exports = server;
