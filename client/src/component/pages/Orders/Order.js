import { React, useState, useEffect } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { IoAddSharp } from "react-icons/io5";
import * as GitIcons from "react-icons/gi";
import { Link, useHistory } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import '../../../../node_modules/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "../../pages/AddPatient.css"
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Order = () => {
    const [cancelReason, setCancelReason] = useState('')
    const [Data, setData] = useState([]);
    const currentDate = new Date()
    const { SearchBar } = Search;
    const history = useHistory();

    const handelCancel = (orderNo) => {
        let answer = prompt('Type Reason for canceling:');

        const data = {
            orderNo: orderNo,
            status: `Cancel Order(${answer})`
        }
        axios.post("http://localhost:5000/api/Order/cancelOrder", data).then(res => {
            alert(res.data);
            history.go(0)

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        let userInfo = localStorage.getItem('userInfo');
        const data = JSON.parse(userInfo)
        axios.get("http://localhost:5000/api/Order/getOrder").then(res => {
            //console.log(res.data.reverse())
            let d = [];
            let rettriveData = res.data.reverse()
            if(data.isAdmin === true){
                setData(rettriveData);
            }
            else if(data.userType[0].name === 'Employee'){
                rettriveData.forEach(element => {
                    if(element.spotName === data.userType[0].branch){
                        d.push(element)
                    }                        
                });
                setData(d)
            }
            else if(data.userType[0].name === 'Patient User'){
                //console.log('come here')
                rettriveData.forEach(element => {
                    if(element.patientID === data.patientID){
                        d.push(element)
                       
                    }                        
                });
                setData(d)
            }

            
        }).catch(err => {
            console.log(err)
        })
    }, []);

    // const Data = [
    //     {
    //         orderID: 1, date: currentDate.getDate() + "/" + (currentDate.getMonth() + 1)
    //             + "/" + currentDate.getFullYear(), time: currentDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: "2-digit", second: "numeric" }), spot: "Dhaka", patient: "sohan (01721553842)",
    //         subTotal: "1000", grandTotal: "1150", status: "Uninvoice"
    //     }
    // ];


    const column = [
        {
            dataField: "orderNo",
            text: "Order No",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },
        {
            dataField: "orderDate",
            text: "Date",
            headerStyle: (colum, colIndex) => {
                return { width: '90px', textAlign: 'center' };
            }
        },
        {
            dataField: "orderTime",
            text: "Time",
            headerStyle: (colum, colIndex) => {
                return { width: '90px', textAlign: 'center' };
            }

        },
        {
            dataField: "spotName",
            text: "Spot",
            headerStyle: (colum, colIndex) => {
                return { width: '90px', textAlign: 'center' };
            }
        },
        {
            dataField: "patientID",
            text: "Patient",
            formatter: (cell, row) => {
                //console.log(row);
                return <div>{`${row.patientID}-${row.patientName} (${row.phoneNo})`}</div>;
            },
            headerStyle: (colum, colIndex) => {
                return { width: '200px', textAlign: 'center' };
            }

        },
        {
            dataField: "subTotal",
            text: "SubTotal",
            headerStyle: (colum, colIndex) => {
                return { width: '100px', textAlign: 'center' };
            }
        },
        {
            dataField: "grandTotal",
            text: "GrandTotal",
            headerStyle: (colum, colIndex) => {
                return { width: '100px', textAlign: 'center' };
            }
        },
        {
            dataField: "status",
            text: "Status",
            headerStyle: (colum, colIndex) => {
                return { width: '150px', textAlign: 'center' };
            }
        },
        {
            dataField: 'link',
            text: <Link to='/addOrder'><button className="btn btn-primary" style={{ fontSize: "13px" }}><IoAddSharp />Add Order </button></Link>,
            formatter: (cell, row) => {
                return (
                    <div>
                        <Link to={`/viewOrder/${row.orderNo}`}><button className="btn btn-success" style={{ fontSize: "13px", width: "117px" }}><FaIcons.FaEye />View Order</button></Link>
                        {
                            row.status === 'Uninvoice' ?
                                <Link href="#"><button onClick={() => handelCancel(row.orderNo)} className="btn btn-danger" style={{ marginTop: ".5rem", fontSize: "13px", width: "117px" }}><GitIcons.GiCancel />Cancel Order</button></Link>
                                : null
                        }

                    </div>
                )
            },
            headerStyle: (colum, colIndex) => {
                return { width: '150px', textAlign: 'center' };
            }

        }
    ];
    return (
        // <div>
        //     <h2 style={{ marginLeft: '-52rem' }}>Order</h2>
        //     <hr style={{ marginLeft: "14rem" }} />
        //     <span>
        //         <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Patient code/Mobile no/Email" style={{ height: '34px', width: "25rem", marginLeft: '-27rem' }} />
        //         <button onClick={() => searchOrder(searchTerm)} disabled={!searchTerm} style={{ height: '34px', backgroundColor: '#6c757d', color: 'white', marginLeft: "1rem" }}>Search</button>
        //     </span>
        //     <div style={{ width: "68rem", position: "relative", left: "15rem", marginTop: "2rem" }}>
        //         <BootstrapTable
        //             keyField="orderNo"
        //             data={Data}
        //             columns={column}
        //             pagination={paginationFactory()}
        //         />
        //     </div>
        // </div>
        <ToolkitProvider
            keyField="orderNo"
            data={Data}
            columns={column}
            search
        >
            {
                props => (
                    <div>
                        <h2 style={{ marginLeft: '-52rem' }}>Order</h2>
                        <hr style={{ marginLeft: "14rem" }} />
                        <div style={{ width: "70rem", position: "relative", left: "14rem", marginTop: "" }}>
                            <SearchBar {...props.searchProps}
                                style={{ position: 'relative', right: '22.5rem', fontSize: '15px', height: '34px', width: "25rem" }}
                                placeholder='Order ID/Date/Spot'
                            />
                            <hr />
                            <BootstrapTable
                                pagination={paginationFactory()}
                                {...props.baseProps}
                            />
                        </div>
                    </div>
                )
            }
        </ToolkitProvider>
    );
}
export default Order;