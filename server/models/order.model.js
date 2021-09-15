const mongoose = require('mongoose');
const {Product} =  require('../models/product.model')

const orderSchema = new mongoose.Schema({
    orderNo:{
        type: Number,
        minlength: 1,
        required: true
    },

    orderDate:{
        type: String,
        required: true
    },
    orderTime: {
        type: String,
        required: true
    },
    spotName:{
        type: String,
        required: true
    },
    patientName:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    patientID:{
        type: String,
        minlength: 6,
        required: true

    },
    phoneNo:{
        type: String,
        required: true
    },
    deliveryPoint:{
        type:String,
        required: true
    },
    deliveryDate:{
        type:String,
        required: true
    },
    deliveryTime:{
        type:String,
        required: true
    },
    deliveryAddress:{
        type:String,
        required: true
    },
    products:[{
        productID: String,
        productName: String,
        quantity: Number,
        price: Number,
        expireDate: String,
        tradePrice: Number,
        discount: Number,
        vat: Number,
        Tprice: Number
    }],
    subTotal: {
        type: Number,
        required: true
    },
    deliveryCharge:{
        type: Number,
        required: true
    },
    grandTotal:{
        type: Number,
        required: true
    },
    remark:{
        type: String
    },
    status:{
        type: String,
        required: true
    }

})

// orderSchema.pre('save', async function(next){
//     const OrderSchema = this
//     const products = OrderSchema.products

//     for(var i =0; i<products.length; i++){

//         let p = await Product.findOne({ProductID: products[i].productID});

//           await Product.findOneAndUpdate({ProductID: products[i].productID},
//             { InStock : p.InStock - products[i].quantity},
//             { new: true }
//             )
//     }

//     // const service = await Service.findById(serviceAppointment.service._id)
    
//     // await Service.findByIdAndUpdate(
//     //     service._id,
//     //     { totalServiceSell : service.totalServiceSell +quantity },
//     //     { new: true }
//     // );

//     next() 
// })

const order = mongoose.model('order', orderSchema)

exports.order = order;
exports.orderSchema = orderSchema;