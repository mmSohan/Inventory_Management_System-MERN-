const { PatientUser } = require('../models/patientUser.model');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.get('/getUser', async (req, res) => {

    const user = await PatientUser.find()
        .select('-password -docName -careGiverName -nidPassDv  -isAdmin')
        .sort('ID')

    res.send(user);
});

router.post('/getEditableUser', (req, res) => {
    PatientUser.find({ LogInId: req.body.LogInId }, (docs, err) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.send(err);
        }
    })
})

router.post('/searchPatient', (req, res) => {
    PatientUser.findOne({ phoneNo: req.body.phoneNo }, (docs, err) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.send(err);
        }
    })
})

router.post('/updateUser', async (req, res) => {

    const user = await PatientUser.findOneAndUpdate({ LogInId: req.body.LogInId }, {
        patientName: req.body.patientName,
        careGiverName: req.body.careGiverName,
        docName: req.body.docName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        nidPassDv: req.body.nidPassDv,
        address: req.body.address,
        delAddress: req.body.delAddress
    }, { new: true })

    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send('Post Update Successfully');
})

router.post('/addUser', async (req, res) => {

    //  const { error } = validateUser(req.body);

    // if (error) return res.status(400).send(error.details[0].message);

    let user = await PatientUser.findOne({ phoneNo: req.body.phoneNo });

    if (user) return res.status(400).send('Phone Number Already Registered.');

    user = new PatientUser(_.pick(req.body,
        ['patientName', 'LogInId', 'docName', 'careGiverName', 'phoneNo', 'email', 'password', 'nidPassDv', 'address', 'delAddress']));

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    console.log(req.body);

    await user.save(function (err) {
        if (!err) {
            res.send('New post added successfully..')
        }
        else {
            res.send(err)
        }
    })

});

router.post('/deleteUser', async (req, res) => {

    PatientUser.findOneAndRemove({ LogInId: req.body.LogInId }, function (err, docs) {
        if (!err) {
            res.send("User Deleted Successfully...")
        }
        else {
            res.send(err)
        }
    });
})

router.post('/logIn', async (req, res) => {
    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    // let user = await PatientUser.findOne({ phoneNo: req.body.phoneNo });
    // if (!user) return res.status(400).send('Invalid phone No or password.');

    // res.send('log is successfull')

    PatientUser.findOne({ phoneNo: req.body.phoneNo }, async (docs, err) => {
        if (!err) {
            const match = await bcrypt.compare(req.body.password, PatientUser.password);
            if (!match) return res.status(400).send('Invalid email or password.');
            res.send(docs);
        }
        else {
            res.send(err);
        }
    })
    //const token = user.generateAuthToken();

    // res.send(token);
});


module.exports = router;

