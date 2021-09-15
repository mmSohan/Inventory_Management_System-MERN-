const {Product} =  require('../models/product.model')
const express = require('express')
const router = express.Router();
const _ = require('lodash');

router.post('/addProduct', async (req, res) => {

    let product = await Product.findOne({ ProductID: req.body.ProductID });

    if (product) return res.status(400).send('Product Already Added.');

    product = new Product(_.pick(req.body,
         ['ProductID', 'ProductName', 'BatchNo', 'ExpireDate',
          'TradePrice', 'InStock', 'Discount', 'Vat', 'TotalPrice']));

    await product.save(function (err) {
        if (!err) {
            res.send('New Product Added successfully...')
        }
        else {
            res.send(err);
        }
    })

});

router.post('/updateProduct', async(req,res)=>{
    let product = await Product.findOneAndUpdate({ProductID: req.body.ProductID},
        {
            ProductName: req.body.ProductName,
            BatchNo: req.body.BatchNo,
            ExpireDate: req.body.ExpireDate,
            TradePrice: req.body.TradePrice,
            InStock: req.body.InStock,
            Discount: req.body.Discount,
            Vat: req.body.Vat,
            TotalPrice: req.body.TotalPrice
        },
        {new: true})

        if (!product) return res.status(404).send('The Product with the given ID was not found.');
        res.send('Product Update Successfully');
})

router.get('/getProduct', async (req, res) => {

    const product = await Product.find()
        .sort('ProductID')

    res.send(product);
});

router.get('/getCount', async (req, res) => {

    Product.count({}, function(err, count){
        let c = count.toString()
        res.send(c);
        
    });
});

router.post('/getEditableProduct', async(req,res)=>{

    let product = await Product.findOne({ ProductID: req.body.ProductID });

    if(!product) return res.status(404).send('The Product with the given ID was not found.');

    res.send(product);
})

router.post('/deleteProduct', async (req, res) => {

    Product.findOneAndRemove({ ProductID: req.body.ProductID }, function (err, docs) {
        if (!err) {
            res.send("Product Deleted Successfully...")
        }
        else {
            res.send(err)
        }
    });
})
router.get('/getTopSell', async (req,res)=>{
    const product = await Product.find()
    .select('-ExpireDate -TradePrice -Discount -Vat -TotalPrice')
    .sort('-sales')

 res.send(product);
})




module.exports = router
