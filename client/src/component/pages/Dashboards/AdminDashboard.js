import {React,useState, useEffect} from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import BootstrapTable from "react-bootstrap-table-next";
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import axios from 'axios';

import { AiFillMedicineBox } from "react-icons/ai";

const AdminDashboard = () => {

    const[noOfEmployee, SetNo] = useState('');
    const[noOfProduct, SetNum] = useState('');
    const[noOfOrder, SetOrder] = useState('');
    const[sells, SetSells] = useState();
    const [topSales, setTopSales] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/employee/getCount").then(res => {
            SetNo(res.data)
        }).catch(err => {
            console.log(err);
        })
    })

    useEffect(()=>{
        axios.get("http://localhost:5000/api/product/getCount").then(res => {
            SetNum(res.data)
        }).catch(err => {
            console.log(err);
        })
    })

    useEffect(()=>{
        axios.get("http://localhost:5000/api/Order/getCount").then(res=>{
            SetOrder(res.data)
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/Order/getTotalSell").then(res=>{
            
            SetSells(res.data[0].subTotal)
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/product/getTopSell").then(res=>{
            
           setTopSales(res.data)
           console.log(res.data)
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    const column = [
        {
            dataField: "ProductID",
            text: "Product ID",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center',backgroundColor: 'black', color: 'white' };
            }
        },
        {
            dataField: "ProductName",
            text: "Product Name",
            headerStyle: (colum, colIndex) => {
                return { width: '100px', textAlign: 'center',backgroundColor: 'black', color: 'white' };
            }
        },
        {
            dataField: "BatchNo",
            text: "Batch No",
            headerStyle: (colum, colIndex) => {
                return { width: '50px', textAlign: 'center',backgroundColor: 'black', color: 'white' };
            }
        },
        {
            dataField: "sales",
            text: "Sales",
            headerStyle: (colum, colIndex) => {
                return { width: '60px', textAlign: 'center',backgroundColor: 'black', color: 'white' };
            }
        },
        {
            dataField: "earning",
            text: "Earning",
            headerStyle: (colum, colIndex) => {
                return { width: '60px', textAlign: 'center',backgroundColor: 'black', color: 'white' };
            }
        },
        {
            dataField: "InStock",
            text: "In Stock",
            headerStyle: (colum, colIndex) => {
                return { width: '60px', textAlign: 'center',backgroundColor: 'black', color: 'white' };
            }
        },

        
    ];

    return (
        <div>
            <div class="card container" style={{ position: 'relative', left: '6.5rem', right:"1rem", top: '', textAlign: "" }}>
                <div class="card-header" id='C-header'>
                    <h2 style={{textAlign:'left'}}>Dashboard</h2>
                </div>
                <div className="row">
                    <Card
                        bg='info'
                        text="white"
                        style={{ width: '16rem', marginTop: '1rem', marginLeft: '2rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Total Sales</Card.Header>
                        <Card.Body>
                            <Card.Title> {`৳${sells}`} </Card.Title>
                            <Link style={{ color: "white" }}> View Details <FaIcons.FaArrowCircleRight /></Link>
                        </Card.Body>
                    </Card>

                    <Card
                        bg='danger'
                        text="white"
                        style={{ width: '16rem', marginTop: '1rem', marginLeft: '1rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Total Orders</Card.Header>
                        <Card.Body>
                            <Card.Title> <FaIcons.FaCartArrowDown /> {noOfOrder} </Card.Title>
                            <Link style={{ color: "white" }}> View Details <FaIcons.FaArrowCircleRight /></Link>
                        </Card.Body>
                    </Card>

                    <Card
                        bg='success'
                        text="white"
                        style={{ width: '16rem', marginTop: '1rem', marginLeft: '1rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Employees</Card.Header>
                        <Card.Body>
                            <Card.Title> <FaIcons.FaUserAlt />{noOfEmployee} </Card.Title>
                            <Link to='/employee' style={{ color: "white" }}> View Details <FaIcons.FaArrowCircleRight /></Link>
                        </Card.Body>
                    </Card>

                    <Card
                        bg='warning'
                        text="white"
                        style={{ width: '16rem', marginTop: '1rem', marginLeft: '1rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Products</Card.Header>
                        <Card.Body>
                            <Card.Title> <AiFillMedicineBox /> {noOfProduct} </Card.Title>
                            <Link to='/products' style={{ color: "white" }}> View Details <FaIcons.FaArrowCircleRight /></Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="row">
                    <Card
                        bg='light'
                        text='dark'
                        style={{ width: '33rem', marginTop: '1rem', marginLeft: '2rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Weekly Sales</Card.Header>
                        <Card.Body>
                            <BarChart />
                        </Card.Body>
                    </Card>

                    <Card
                        bg='light'
                        text='dark'
                        style={{ width: '33rem', marginTop: '1rem', marginLeft: '1rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Weekly Order</Card.Header>
                        <Card.Body>
                            <LineChart />
                        </Card.Body>
                    </Card>
                </div>

                <h4 >Top Sells</h4>
    
                <div style={{ width: "67rem", position: "relative", left: "1rem", marginTop: "" }}>
                <BootstrapTable 
                keyField='ProductNo' 
                data={ topSales  } 
                columns={ column } />
                </div>
            <br />
            <br />
            </div>
        </div>
    );
}

export default AdminDashboard;