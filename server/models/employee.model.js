const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    EmployeeID:{
        type: String,
        minLength: 6,
        required: true
    },
    EmployeeName:{
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    phoneNo:{
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    },
    nidNo:{
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    },
    address:{
        type: String,
        minLength: 3,
        maxLength: 220,
        required: true
    },
    Branch:{
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    Designation:{
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    Salary:{
        type: String,
        minLength: 3,
        maxLength: 10,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

exports.Employee = Employee;