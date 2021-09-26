import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import DashBoard from'./component/pages/Dashboards/DashBoard';
import Invoice from './component/pages/Invoices/Invoice';
import Order from './component/pages/Orders/Order';
import PatientUser from './component/pages/Patients/PatientUser';
import AddPatient from './component/pages/Patients/AddPatient';
import EditPatientUser from './component/pages/Patients/EditPatientUser';
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import ViewPatient from './component/pages/Patients/ViewPatient';
import AddOrder from './component/pages/Orders/AddOrder';
import { useEffect, useState } from 'react';
import ViewOrder from './component/pages/Orders/ViewOrder';
import ViewInvoice from './component/pages/Invoices/ViewInvoice';
import AdminDashboard from './component/pages/Dashboards/AdminDashboard';
import Employee from './component/pages/Employees/Employee';
import AddEmployee from './component/pages/Employees/AddEmployee';
import ViewEmployee from './component/pages/Employees/ViewEmployee';
import EditEmployee from './component/pages/Employees/EditEmployee';
import Product from './component/pages/Products/Product';
import ViewProduct from './component/pages/Products/ViewProduct';
import AddProduct from './component/pages/Products/AddProduct';
import EditProduct from './component/pages/Products/EditProduct';
function App() {

  const [userInfo, setUserInfo] = useState([]);
  const [personalInfo, setPersonalInfo]= useState([]);

  useEffect(()=>{
    setUserInfo(JSON.parse(localStorage.getItem("LogInInfo")))
    //setUserInfo(data);
  },[]);

  return (
    <div className="App">
      <Router>
        
        <Switch>
            <Route path='/adminDashboard' exact>
              <Navbar/>
              <AdminDashboard/>
            </Route>

            <Route path='/dashboard' exact>
            <Navbar/>
            <DashBoard/>
            </Route>

            <Route path='/invoice' exact>
              <Navbar/>
              <Invoice/>
            </Route>

            <Route path='/order' exact>
              <Navbar/>
              <Order/>
            </Route>

            <Route path='/patient' exact>
              <Navbar/>
              <PatientUser/>
            </Route>

            <Route  path="/addPatient" exact>
              <Navbar/>
              <AddPatient/>
            </Route>

            <Route path="/editPatient/:patientID" exact>
              <Navbar/>
              <EditPatientUser/>
            </Route>

            <Route path="/" exact >
              <Login/>
            </Route>

            <Route  path="/signUp" exact >
              <Register/>
            </Route>

            <Route path="/viewPatient/:patientID" exact>
             <Navbar/>
             <ViewPatient/>
            </Route>

            <Route path="/addOrder" exact>
              <Navbar/>
              <AddOrder/>
            </Route>

            <Route path="/viewOrder/:orderNo" exact>
              <Navbar/>
              <ViewOrder/>
            </Route>

            <Route path="/viewInvoice/:invoiceNo" exact>
             <Navbar/>
              <ViewInvoice/>
            </Route>

            <Route  path="/employee" exact>
              <Navbar/>
              <Employee/>
            </Route>
            <Route  path="/addEmployee" exact>
              <Navbar/>
              <AddEmployee/>
            </Route>

            <Route path="/viewEmployee/:EmployeeID" exact>
              <Navbar/>
              <ViewEmployee/>
            </Route>

            <Route path="/editEmployee/:EmployeeID" exact>
              <Navbar/>
              <EditEmployee/>
            </Route>

            <Route  path="/products" exact>
              <Navbar/>
              <Product/>
            </Route>

            <Route path="/viewProduct/:ProductID" exact>
              <Navbar/>
              <ViewProduct/>
            </Route>

            <Route path="/addProduct" exact>
              <Navbar/>
              <AddProduct/>
            </Route>

            <Route path="/editProduct/:ProductID" exact>
              <Navbar/>
              <EditProduct/>
            </Route>
    
        </Switch>
      </Router>
    </div>
  );
}

export default App;
