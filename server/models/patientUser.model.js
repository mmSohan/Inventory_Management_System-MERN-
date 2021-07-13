const Joi = require('joi')
const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({

    patientName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    docName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    careGiverName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    email: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    nidPassDv: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    delAddress: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    LogInId: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

const PatientUser = mongoose.model('PatientUser', patientSchema);

// function validateUser(patientUser) {
//     const schema = {
//         patientName: Joi.string().min(3).max(50).required(),
//         docName: Joi.string().min(3).max(50).required(),
//         careGiverName: Joi.string().min(3).max(50).required(),
//         phoneNo: Joi.string().min(5).max(15).required(),
//         email: Joi.string().min(5).max(255).email().optional(),
//         password: Joi.string().min(5).max(1024).required(),
//         nidPassDv: Joi.string().min(5).max(50).optional(),
//         address: Joi.string().min(5).max(500).required(),
//         delAddress: Joi.string().min(5).max(500).required(),
//         logInId: Joi.string(),

//     };

//     return Joi.validate(patientUser, schema);
// }

exports.PatientUser = PatientUser;
// exports.validateUser = validateUser;

