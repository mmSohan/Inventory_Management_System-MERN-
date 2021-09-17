const {Employee} =  require('../models/employee.model');
const express = require('express')
const router = express.Router();
const _ = require('lodash');

router.post('/addEmployee', async (req, res) => {

    let employee = await Employee.findOne({ EmployeeID: req.body.EmployeeID });

    if (employee) return res.status(400).send('Employee Already Registered.');

    employee = new Employee(_.pick(req.body,
        ['EmployeeID', 'EmployeeName', 'phoneNo', 'nidNo', 'address', 'Branch', 'Designation', 'Salary']));

    await employee.save(function (err) {
        if (!err) {
            res.send('New Employee Added successfully...')
        }
        else {
            res.send(err);
        }
    })

});

router.post('/getEditableEmployee', async(req,res)=>{

    let employee = await Employee.findOne({ EmployeeID: req.body.EmployeeID });

    if(!employee) return res.status(404).send('The Employee with the given ID was not found.');

    res.send(employee);
})

router.post('/updateEmployee', async(req,res)=>{
    let employee = await Employee.findOneAndUpdate({EmployeeID: req.body.EmployeeID},
        {
            EmployeeName: req.body.EmployeeName,
            phoneNo: req.body.phoneNo,
            nidNo: req.body.nidNo,
            address: req.body.address,
            Branch: req.body.Branch,
            Designation: req.body.Designation,
            Salary: req.body.Salary
        },
        {new: true})

        if (!employee) return res.status(404).send('The Employee with the given ID was not found.');
        res.send('Employee Update Successfully');
})

router.get('/getEmployee', async (req, res) => {

    const employee = await Employee.find()
        .sort('EmployeeID')

    res.send(employee);
});

router.get('/getCount', async (req, res) => {

    Employee.count({}, function(err, count){
        let c = count.toString()
        res.send(c);
        
    });
});

router.post('/deleteEmployee', async (req, res) => {

    Employee.findOneAndRemove({ EmployeeID: req.body.EmployeeID }, function (err, docs) {
        if (!err) {
            res.send("Employee Deleted Successfully...")
        }
        else {
            res.send(err)
        }
    });
})

module.exports = router