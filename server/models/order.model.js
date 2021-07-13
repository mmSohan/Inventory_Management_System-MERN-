const mongoose = require('mongoose');

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
        quantity: String,
        price: String
    }],
    subTotal: {
        type: Number,
        required: true
    },
    grandTotal:{
        type: Number,
        required: true
    },
    remark:{
        type: String
    }

})

const order = mongoose.model('order', orderSchema)

exports.order = order;