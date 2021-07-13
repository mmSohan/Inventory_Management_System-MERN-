const express =require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const patientUser = require('./routes/patientUser');
const order = require('./routes/order');
const cors = require('cors');
//const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({extended:'true'}));
app.use(express.json());
app.use(cors());
app.use('/api/patientUser', patientUser);
app.use('/api/Order', order);

app.get('/',(req,res)=>{
    res.send('hello world');
});



const port = process.env.PORT || 5000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

mongoose.connect('mongodb://localhost/pharmasolution')
.then(() => winston.info('connected to mongodb...'));

module.exports = server;
