import{ React, useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewEmployee = ()=>{

    const [empID, setEmpId] = useState('')
    const [name, setName] = useState('');
    const [pnonNo, setPhonNo] = useState('');
    const [address, setAddress] = useState('');
    const [nid, setNid] = useState('');
    const [branch, setBranch] = useState('');
    const [designation, setDesignation] = useState('')
    const [salary, setSalary] = useState('')
    const history = useHistory();

    const param = useParams();

    useEffect(()=>{
        axios.post("http://localhost:5000/api/employee/getEditableEmployee",{EmployeeID: param.EmployeeID}).then(res=>{
            //console.log(res.data[0]);
            const retriveData = res.data;
            setEmpId(retriveData.EmployeeID);
            setName(retriveData.EmployeeName);
            setPhonNo(retriveData.phoneNo);
            setNid(retriveData.nidNo);
            setBranch(retriveData.Branch);
            setDesignation(retriveData.Designation);
            setAddress(retriveData.address);
            setSalary(retriveData.Salary);

        }).catch(err=>{
            console.log(err);
        })
    },[])

    return(
        <div>
        <div class="card container" style={{ marginLeft: '14rem', textAlign: "left" }}>
            <div class="card-header">
                <h2 class="card-title">Employee Details</h2>
            </div>
            <div class="card-body">
                <form action="">

                <div class="form-group row">
                        <label class="col-sm-2 col-form-label">EmployeeID</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value= {empID} />
                         </div>
                        </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Employee Name</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={name}/>
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Phone No</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={pnonNo}/>
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">NID No </label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={nid} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Branch</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={branch} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Designation</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value= {designation} />
                         </div>
                        </div>
                        
                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label"> Salary</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value={salary} />
                         </div>
                        </div>

                        <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text"class="form-control-plaintext"  value= {address} />
                         </div>
                        </div>
                </form>
            </div>
            </div>
            <Link to="/employee"><button className="btn btn-danger" style={{marginTop:"2rem"}}>Back</button></Link>
            </div>
    );
}

export default ViewEmployee;