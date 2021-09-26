import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator"
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import * as FaIcons from 'react-icons/fa';
import * as GitIcons from "react-icons/gi";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const Invoice = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [Data, setData] = useState([]);
    const { SearchBar } = Search;

    const searchOrder = () => {

    }

    useEffect(() => {
        let userInfo = localStorage.getItem('userInfo');
        const data = JSON.parse(userInfo)
        axios.get("http://localhost:5000/api/Invoice/getInvoice").then(res => {
            let d = [];
            let rettriveData = res.data.reverse()
            //setData(rettriveData);
            if(data.isAdmin === true){
                setData(rettriveData);
            }
            else if(data.userType[0].name === 'Employee'){
                rettriveData.forEach(element => {
                    if(element.orderData[0].spotName === data.userType[0].branch){
                        d.push(element)
                    }                        
                });
                setData(d)
            }
            //console.log(rettriveData);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const column = [
        { dataField: "invoiceNo", text: "Invoice No" },
        { 
            dataField: 'orderData[0].patientID',
             text: "Customer",
             formatter: (cell, row) => {
                //console.log(row);
                return <div>{`${row.orderData[0].patientID}-${row.orderData[0].patientName}`}</div>;
            }
            },
        { dataField: "orderData[0].orderNo", text: "Order No" },
        { dataField: "orderData[0].orderDate", text: "Order Date" },
        { dataField: "invoiceDate", text: "Invoice Date" },
        { dataField: "orderData[0].subTotal", text: "Sub Total" },
        { dataField: "orderData[0].grandTotal", text: "Grand Total" },
        { dataField: " ", text: "Status" },
        {
            dataField: 'link',
            text: "Action",
            formatter: (colContent, col) => {
                return (
                    <div>
                        <Link to={`/viewInvoice/${col.invoiceNo}`}><button className="btn btn-success" style={{ fontSize: "13px", textAlign:'left',width: "125px" }}><FaIcons.FaEye />View Invoice</button></Link>
                        <Link href="#"><button className="btn btn-danger" style={{ marginTop: ".5rem", fontSize: "13px", width: "125px",textAlign:'left' }}><GitIcons.GiCancel />Cancel Invoice</button></Link>   
                    </div>
                )
            },
            headerStyle: (colum, colIndex) => {
                return { width: '150px', textAlign: '' };
            }
        }
    ];

    return (
        // <div>
        //     <h2 style={{ marginLeft: '-52rem' }}>Invoice</h2>
        //     <hr style={{ marginLeft: "14rem" }} />
        //     <span>
        //         <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Invoice No" style={{ height: '34px', width: "25rem", marginLeft: '-27rem' }} />
        //         <button onClick={() => searchOrder(searchTerm)} disabled={!searchTerm} style={{ height: '34px', backgroundColor: '#6c757d', color: 'white', marginLeft: "1rem" }}>Search</button>
        //     </span>
        //     <div style={{ width: "68rem", position: "relative", left: "15rem", marginTop: "2rem" }}>
        //         <BootstrapTable
        //             keyField="invoiceNo"
        //             data={Data}
        //             columns={column}
        //             pagination={paginationFactory()}
        //         />
        //     </div>
        // </div> 

        <ToolkitProvider
            keyField="invoiceNo"
            data={Data}
            columns={column}
            search
        >
            {
                props => (
                    <div>
                        <h2 style={{ marginLeft: '-50rem' }}>Invoice</h2>
                        <hr style={{ marginLeft: "14rem" }} />
                        <div style={{ width: "70rem", position: "relative", left: "14rem", marginTop: "" }}>
                            <SearchBar {...props.searchProps}
                                style={{position:'relative', right:'22.5rem', fontSize:'15px', height: '34px', width: "25rem" }}
                                placeholder='Patient ID'
                            />
                            <hr />
                            <BootstrapTable
                                {...props.baseProps}
                            />
                        </div>
                    </div>
                )
            }
        </ToolkitProvider>
    );
}
export default Invoice;