const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    ProductID:{
        type: String,
        minLength: 5,
        required: true
    },
    ProductName:{
        type: String,
        minLength: 5,
        required: true   
    },
    BatchNo:{
        type: String,
        minLength: 3,
        required: true   
    },
    ExpireDate:{
        type: String,
        required: true 
    },
    TradePrice:{
        type: Number,
        required: true
    },
    InStock:{
        type: Number,
        required: true 
    },
    Discount:{
        type: Number,
        required: true  
    },
    Vat:{
        type: Number,
        required: true 
    },
    TotalPrice:{
        type: Number,
        required: true   
    },
    sales:{
        type: Number,
        default: 0
    },
    earning:{
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('product', productSchema);

exports.Product = Product