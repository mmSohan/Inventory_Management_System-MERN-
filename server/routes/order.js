const { order } = require('../models/order.model')
const express = require('express')
const router = express.Router();
const _ = require('lodash');

router.post('/addOrder', async (req, res) => {

    let order1 = await order.findOne({ orderNo: req.body.orderNo });

    if (order1) return res.status(400).send('Order Already Posted.');

    order1 = new order(_.pick(req.body,
        ['orderNo', 'orderDate', 'orderTime', 'spotName', 'patientName', 'deliveryPoint', 'deliveryDate', 'deliveryTime', 'deliveryAddress', 'products', 'subTotal', 'grandTotal', 'remark']));

    //console.log(req.body);

    await order1.save(function (err) {
        if (!err) {
            res.send('New order added successfully..')
        }
        else {
            res.send(err)
        }
    })
});

router.get('/getCount', async (req, res) => {

    order.count({}, function(err, count){
        //console.log(count);
        let c = count.toString()
        res.send(c);
        
    });
});

router.get('/getOrder', async (req, res) => {

    const order1 = await order.find()
        .select('-products -deliveryPoint -deliveryDate -deliveryTime  -deliveryAddress -remark')
        .sort('orderNo')

    res.send(order1);
});


module.exports = router;