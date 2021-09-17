const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNo:{
        type: Number,
        minlength: 1,
        required: true
    },
    invoiceDate:{
        type: String,
        required: true,
    },
    orderedBy: {
        type: String,
        required: true
    },
    orderData:[{
        orderNo:Number,
        orderDate: String,
        orderTime: String,
        spotName: String,
        patientName: String,
        patientID: String,
        phoneNo: String,
        deliveryPoint: String,
        deliveryDate: String,
        deliveryTime: String,
        deliveryAddress: String,
        subTotal: Number,
        deliveryCharge: Number,
        grandTotal: Number,
        remark: String,
        status: String,
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
        }]

    }]
})

const Invoice = mongoose.model('Invoice', invoiceSchema);

exports.Invoice = Invoice;