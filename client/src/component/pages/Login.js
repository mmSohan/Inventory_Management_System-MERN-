import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import '../pages/AddPatient.css';
import axios from "axios";
import Navbar from "../Navbar";

const Login = () => {

  const history = useHistory();
  const [phoneNo, setPhoneNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState([]);

  const logIn = () => {
    const postData = {
      phoneNo: phoneNo,
      password: password
    }
    //console.log(postData);

    let data = JSON.stringify(postData);
    localStorage.setItem('LogInInfo', data);

    axios.post("http://localhost:5000/api/patientUser/logIn", postData)
      .then(res => {
        alert("Log In Successful...");
        //console.log(res.data);
        setUser(res.data);
        //console.log(res.data.isAdmin);
        if(res.data.isAdmin === true){
          history.push('/adminDashboard');
        }
       else{
         history.push('/dashboard');
       }

      })
      .catch(err => {
        console.log(err)
      });



  }


  return (
    <div>
      <div className="login-wrapper">
        <div className="container py-5">
          <div className="login-form p-5 rounded-2">
            <h2 className="pb-3">Sign In</h2>
            <form>
              <div className="mb-3">
                <label for="phone" className="form-label">
                  Phone No
                </label>
                <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} type="tel" className="form-control" id="phone" name="phone" />
              </div>
              <div class="mb-3">
                <label for="password" className="form-label">
                  Password
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
              </div>
              <div className="d-grid ">
                <button className="btn  btn-submit p-2" type="button" onClick={logIn}>
                  CONTINUE
                </button>
              </div>
              <div className="d-flex justify-content-between py-3">
                <p className="">
                  New User?
                  <Link to="/signUp" className="ms-1">
                    Signup
                  </Link>
                </p>
                <a href="e">Forgot your password</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
