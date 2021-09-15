const {Invoice} = require('../models/invoice.model');
const express = require('express')
const router = express.Router();
const _ = require('lodash');

router.post('/addInvoice', async (req, res) => {

    let invoice = await Invoice.findOne({ invoiceNo: req.body.invoiceNo });

    if (invoice) return res.status(400).send('Already Invoiced.');

    invoice = new Invoice(_.pick(req.body,
        ['invoiceNo', 'invoiceDate', 'orderedBy', 'orderData']));

    //console.log(req.body);

    await invoice.save(function (err) {
        if (!err) {
            res.send('New invoice added successfully..')
        }
        else {
            res.send(err);
        }
    })

});

router.get('/getInvoice', async (req, res) => {

    const invoice = await Invoice.find()
        .sort('invoiceNo')

    res.send(invoice);
});

router.post('/getInvoiceData', async (req,res)=>{
    Invoice.findOne({ invoiceNo: req.body.invoiceNo }, (docs, err) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.send(err);
        }
    })
})
router.get('/getCount', async (req, res) => {

    Invoice.count({}, function(err, count){
        //console.log(count);
        let c = count.toString()
        res.send(c);
        
    });
});

module.exports = router;