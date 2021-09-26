

import { React, useEffect, useState } from 'react';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import '../../pages/AddPatient.css'
import axios from 'axios';

const DashBoard = () => {

    const [user, setUser] = useState([]);
    const [designation, setDesignation] = useState('');



    useEffect(() => {
        let LogInInfo = localStorage.getItem('LogInInfo');
        const data = JSON.parse(LogInInfo)
        axios.post("http://localhost:5000/api/patientUser/searchPatient", data)
            .then(res => {
                //console.log(res.data);
                setUser(res.data);
                setDesignation(res.data.userType[0].designation);
                //console.log(user);
            })
            .catch(err => {
                console.log(err)
            });


    }, []);


    return (
        <div className="right_col" role="main" style={{ height: '50px', marginLeft: '13.5rem', paddingRight: '.8rem', paddingTop: '1rem' }}>
            <div class="row">

                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel">
                        <div class="row">

                            <div class="table-responsive col-md-12 col-sm-12 col-xs-12">
                                <table class="table table-bordered" style={{ height: '100px' }} cellspacing="0" cellpadding="0" border="1">
                                    <thead>
                                        <tr>
                                            <th class="vcenter text-center" style={{ background: "#ededed" }} ><h3 style={{ textAlign: "center" }}>Personal Information</h3></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ lineHeight: "40px", fontSize: "14px" }}>
                                                    <div class="row">
                                                        <div class="col-md-8 col-sm-8 col-xs-8">
                                                            <div class="row">


                                                                <div class="col-md-4 col-sm-6 col-xs-6 text-right">Name : </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">{user.patientName}</div>
                                                                <div class="col-md-4 col-sm-6 col-xs-6 text-right">User Role : </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">
                                                                    Support User						    		</div>
                                                                <div class="col-md-4 col-sm-6 col-xs-6 text-right">Email : </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">{user.email}</div>
                                                                <div class="col-md-4 col-sm-6 col-xs-6 text-right">Mobile No : </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">{user.phoneNo}</div>
                                                                <div class="col-md-4 col-sm-6 col-xs-6 text-right">Designation : </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">{designation}</div>
                                                                <div class="col-md-4 col-sm-6 col-xs-6 text-right">Address : </div>
                                                                <div class="col-md-6 col-sm-6 col-xs-6">{user.address}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 col-sm-4 col-xs-4">
                                                            <img className="profile_img" style={{ maxWidth: "220px", maxHeight: "240px", width: "100%" }} src="https://zpbd-pss.com/img/profile_picture/default-user.png" alt="..." />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}
export default DashBoard;