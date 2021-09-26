import React, { useEffect, useState } from "react"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import * as FaIcons from 'react-icons/fa';
import uniqid from 'uniqid';
import generator from 'generate-password'
import axios from 'axios'
import { useHistory } from "react-router-dom";
const AddPatient = () => {

    const [patientName, setPatientName] = useState('')
    const [patientID, setPatientID] = useState('0')
    const [careGiverName, setCareGiverName] = useState('')
    const [docName, setDocName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState("")
    const [nidPassDv, setNidPassDv] = useState("")
    const [address, setAddress] = useState('')
    const [del_address, setDel_Address] = useState('')
    const [check, setCheck] = useState(false)
    const history = useHistory()


    const checkIconHandler = () => {
        setCheck(!check)
        setDel_Address(address)
    }

    //console.log(patientID);

    useEffect(()=>{
        generatePatientID();
    })

    const submitPost = () => {

        var password = generator.generate({
            length: 10,
            numbers: true,
            uppercase: true
        });
        var userType = {
            name: 'Patient User',
            designation: 'Patient User',
            branch: ' '
        }
        var postData = {
            patientName: patientName,
            patientID : patientID,
            careGiverName: careGiverName,
            docName: docName,
            phoneNo: phone,
            email: email,
            nidPassDv: nidPassDv,
            address: address,
            delAddress: del_address,
            LogInId: uniqid(),
            password: password,
            userType: userType
        }
        
        console.log(postData);
        
        axios.post("http://localhost:5000/api/patientUser/addUser", postData)
        .then(res=>{
            alert(res.data);
            history.push('/patient');
        })
        .catch(err=>{
            alert(err)
        });
    }

    const generatePatientID = ()=>{
        axios.get("http://localhost:5000/api/patientUser/getCount").then(res=>{
            let count = parseInt(res.data)
            setPatientID(((count + 1).toString()).padStart(6, '0') );
        }).catch(err=>{
            console.log(err);
        })
    }

    return (

        <div>
            <div class="card container" style={{ marginLeft: '13rem', textAlign: "left" }}>
                <div class="card-header" id='C-header'>
                    <h2>Add Patient</h2>
                </div>
                <div class="card-body" id="C-body">
                    <form>
                        <div className="container form-group" >
                            <label   >Patient Name<FaIcons.FaAsterisk fontSize="10px" color='red'/></label>
                            <input className="form-control" placeholder="patient name"
                                value={patientName} onChange={(e) => (setPatientName(e.target.value))} />
                        </div>
                        <div className=" container form-group">
                            <label>Caregiver Name<FaIcons.FaAsterisk fontSize="10px" color='red'/></label>
                            <input className="form-control" placeholder="Caregiver Name"
                                value={careGiverName} onChange={(e) => setCareGiverName(e.target.value)}
                            />
                        </div>
                        <div className="container form-group">
                            <label>Prescribing Doctor’s Name<FaIcons.FaAsterisk fontSize="10px" color='red'/></label>
                            <input className="form-control" placeholder="Doctor’s Name"
                                value={docName} onChange={(e) => setDocName(e.target.value)}
                            />
                        </div>
                        <div className=" container form-group">
                            <label >Phone Number(+88) <FaIcons.FaAsterisk fontSize="10px" color='red'/></label>
                            <input className="form-control" placeholder="Phone Number"
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className=" container form-group">
                            <label for="exampleInputEmail1">Email Address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className=" container form-group">
                            <label>NID/Passport/Driving License Number</label>
                            <input className="form-control" placeholder="NID/Passport/Driving License Number"
                                value={nidPassDv} onChange={(e) => setNidPassDv(e.target.value)}
                            />
                        </div>
                        <div class="container form-group">
                            <label for="exampleFormControlTextarea1" >Address<FaIcons.FaAsterisk fontSize="10px" color='red'/></label>
                            <textarea onChange={(e) => setAddress(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Address"></textarea>
                        </div>
                        <div className=" container form-check">
                            <input type="checkbox"
                                onClick={checkIconHandler} className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Same as Address</label>
                        </div>
                        <div class="container form-group">
                            <label for="exampleFormControlTextarea1">Delivery Address<FaIcons.FaAsterisk fontSize="10px" color='red'/></label>
                            {
                                check ? <textarea class="form-control"
                                    value={address}
                                    id="exampleFormControlTextarea1" rows="3" placeholder="Delivery 
                            Address"></textarea> : <textarea class="form-control"
                                    value={del_address}
                                    onChange={(e) => setDel_Address(e.target.value)}
                                    id="exampleFormControlTextarea1" rows="3" placeholder="Delivery Address"></textarea>
                            }

                        </div>
                        <div style={{ paddingTop: '2rem' }}>
                            <button type="button" className="btn btn-primary" onClick={submitPost}>Submit</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>


    );
}
export default AddPatient;