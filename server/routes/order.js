const { order } = require('../models/order.model')
const {Product} =  require('../models/product.model')
const { orderSchema } = require('../models/order.model')
const express = require('express')
const router = express.Router();
const _ = require('lodash');
const { route } = require('./product');

router.post('/addOrder', async (req, res) => {

    let order1 = await order.findOne({ orderNo: req.body.orderNo });

    if (order1) return res.status(400).send('Order Already Posted.');

    order1 = new order(_.pick(req.body,
        ['orderNo', 'orderDate', 'orderTime', 'spotName', 'patientName', 'patientID', 'phoneNo', 'deliveryPoint',
            'deliveryDate', 'deliveryTime', 'deliveryAddress', 'products', 'subTotal', 'deliveryCharge', 'grandTotal',
            'remark', 'status']));

    //console.log(req.body);
    const products = order1.products

    for(var i =0; i<products.length; i++){

        let p = await Product.findOne({ProductID: products[i].productID});

          await Product.findOneAndUpdate({ProductID: products[i].productID},
            { InStock : p.InStock - products[i].quantity, 
              sales: p.sales + products[i].quantity,
              earning: p.earning + products[i].Tprice})}

    await order1.save(function (err) {
        if (!err) {
            res.send('New order added successfully..')
        }
        else {
            res.send(err)
        }
    })

      
        // try {
        //     let order1 = await order.findOne({ orderNo: req.body.orderNo });

        //     if (order1) return res.status(400).send('Order Already Posted.');
        //     console.log(req.body);
        //     const OrderSchema = new orderSchema (req.body)
        //     await OrderSchema.save()
        //     res.status(201).send('New order added successfully..')
        // } catch(e){
        //     res.status(400).send(e)
        // }

});

router.get('/getCount', async (req, res) => {

    order.count({}, function (err, count) {
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

router.post('/getOrder', async (req, res) => {
    order.findOne({ orderNo: req.body.orderNo }, (docs, err) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.send(err);
        }
    })
})

router.post('/editStatus', async (req, res) => {
    order.findOneAndUpdate({ orderNo: req.body.orderNo },
        { status: 'Invoice' },
        { returnOriginal: false },
        function (err, docs) {
            if (!err) {
                res.send('Edit status Successfully');
            }
            else {
                res.send(err);
            }
        }
    );
})

router.post('/cancelOrder', async (req, res) => {
    order.findOneAndUpdate({ orderNo: req.body.orderNo },
        { status: req.body.status },
        { returnOriginal: false },
        function (err, docs) {
            if (!err) {
                res.send('Order Cancel Successfully');
            }
            else {
                res.send(err);
            }
        }
    );
})

router.get('/getTotalSell', async (rq, res) => {

    order.aggregate([
        { $match: { status: "Invoice" } },
        {
            $group: {
                _id: " ",
                subTotal: { $sum: "$subTotal" }
            }
        }
    ], function (err, order) {
        if (err)
            res.send(err);
        res.send(order);
    });
})

router.get('/getTopSell', async (req, res) => {
  order.aggregate([
    { 
        $project: {
            // createdAt:{$gte:ISODate("08/29/2021"),$lt:ISODate("2020-05-01")},
            total_line_amount: { 
                $reduce: { 
                    input: { $ifNull: [ "$products", [] ] }, 
                    initialValue: 0, 
                    in: { 
                        $add: [ 
                            "$$value", 
                            { $multiply: [ "$$this.price", "$$this.quantity" ] } 
                        ] 
                    }
                }
            },
            "orderDate":"$orderDate"
        }
    }
  ],function(err,order){
    if (err)
    res.send(err);
res.send(order);
  });
})



module.exports = router;