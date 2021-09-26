import  {React, useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewPatient = () => {

    const [patientName, setPatientName] = useState();
    const [docName, setDocName] = useState();
    const [careGiverName, setCareGiverName] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [email, setEmail] = useState();
    const [nidPassDri, setNidPassDri] = useState();
    const [address, setAddress] = useState();
    const [delAddress, setDelAddress] = useState();

    const param = useParams();

    useEffect(()=>{
        axios.post("http://localhost:5000/api/patientUser/getEditableUser",{patientID: param.patientID}).then(res=>{
            console.log(res.data[0]);
            const retriveData = res.data[0];
            setPatientName(retriveData.patientName);
            setCareGiverName(retriveData.careGiverName);
            setDocName(retriveData.docName);
            setPhoneNo(retriveData.phoneNo);
            setEmail(retriveData.email);
            setNidPassDri(retriveData.nidPassDv);
            setAddress(retriveData.address);
            setDelAddress(retriveData.delAddress);

        }).catch(err=>{
            console.log(err);
        })
    },[])

    return (
        //<h1>This is view patient</h1>
        <div>
        <div class="card container" style={{ marginLeft: '14rem', textAlign: "left" }}>
            <div class="card-header">
                <h2 class="card-title">Patient Details</h2>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Patient Name</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={patientName}/>
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">CareGiver Name</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={careGiverName}/>
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Doctor’s Name </label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={docName} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Phone Number  </label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={phoneNo} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Email Address</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value= {email} />
                         </div>
                        </div>
                        
                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">NID/Passport/Driving License Number </label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={nidPassDri} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value= {address} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Delivery Address</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value= {delAddress} />
                         </div>
                        </div>
                </form>
            </div>
            </div>
            <Link to="/patient"><button className="btn btn-danger" style={{marginTop:"2rem"}}>Back</button></Link>
            </div>

            );
}

            export default ViewPatient;