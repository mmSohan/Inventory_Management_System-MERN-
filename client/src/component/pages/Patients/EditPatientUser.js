import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Link,useParams,useHistory } from 'react-router-dom';

const EditPatientUser =()=>{

    const [patientName, setPatientName] = useState('')
    const [careGiverName, setCareGiverName] = useState('')
    const [docName, setDocName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [nidPassDv, setNidPassDv] = useState('')
    const [address, setAddress] = useState('')
    const [del_address, setDel_Address] = useState('')
    const [check, setCheck] = useState(false)
    const [user, setUser] = useState([])

    const history = useHistory();

    const updatePatient=()=>{

      const updateInfo = {
        ...user,  
        patientName: patientName,
        careGiverName: careGiverName,
        docName: docName,
        phoneNo: phone,
        email: email,
        nidPassDv: nidPassDv,
        address: address,
        delAddress: del_address
      } 
      axios.post('http://localhost:5000/api/patientUser/updateUser',updateInfo).then(res=>{
          alert(res.data);
          history.push('/patient')
      }).catch(err=>{
          console.log(err);
      }) 

    }


    const checkIconHandler = () => {
        setCheck(!check)
        setDel_Address(address)
    }

    const param = useParams();

    useEffect(()=>{
        axios.post("http://localhost:5000/api/patientUser/getEditableUser",{patientID: param.patientID}).then(res=>{
            console.log(res.data[0]);
            const retriveData = res.data[0];
            setUser(retriveData);
            setPatientName(retriveData.patientName);
            setCareGiverName(retriveData.careGiverName);
            setDocName(retriveData.docName);
            setPhone(retriveData.phoneNo);
            setEmail(retriveData.email);
            setNidPassDv(retriveData.nidPassDv);
            setAddress(retriveData.address);
            setDel_Address(retriveData.delAddress);

        }).catch(err=>{
            console.log(err);
        })
    },[])

    return(

        //<h1>This log in id is {param.LogInId}</h1>
        <div>
        <div class="card container" style={{ marginLeft: '13rem', textAlign: "left" }}>
            <div class="card-header" id='C-header'>
                <h2>Edit Patient</h2>
            </div>
            <div class="card-body" id="C-body">
                <form>
                    <div className="container form-group" >
                        <label   >Patient Name</label>
                        <input className="form-control" placeholder="patient name"
                            value={patientName} onChange={(e) => (setPatientName(e.target.value))} />
                    </div>
                    <div className=" container form-group">
                        <label>Caregiver Name</label>
                        <input className="form-control" placeholder="Caregiver Name"
                            value={careGiverName} onChange={(e) => setCareGiverName(e.target.value)}
                        />
                    </div>
                    <div className="container form-group">
                        <label>Prescribing Doctor’s Name</label>
                        <input className="form-control" placeholder="Doctor’s Name"
                            value={docName} onChange={(e) => setDocName(e.target.value)}
                        />
                    </div>
                    <div className=" container form-group">
                        <label >Phone Number(+88) </label>
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
                        <label for="exampleFormControlTextarea1" >Address</label>
                        <textarea onChange={(e) => setAddress(e.target.value)} value= {address} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Address"></textarea>
                    </div>
                    <div className=" container form-check">
                        <input type="checkbox"
                            onClick={checkIconHandler} className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Same as Address</label>
                    </div>
                    <div class="container form-group">
                        <label for="exampleFormControlTextarea1">Delivery Address</label>
                        {
                            check ? <textarea class="form-control"
                                value={address}
                                id="exampleFormControlTextarea1" rows="3" placeholder="Delivery Address"></textarea> : <textarea class="form-control"
                                value={del_address}
                                onChange={(e) => setDel_Address(e.target.value)}
                                id="exampleFormControlTextarea1" rows="3" placeholder="Delivery Address"></textarea>
                        }

                    </div>
                    <div style={{ paddingTop: '2rem' }}>
                        <button type="button" className="btn btn-primary" onClick={updatePatient}>Update Info</button>
                    </div>

                </form>
            </div>

        </div>
    </div>
        
    );
}

export default EditPatientUser;
