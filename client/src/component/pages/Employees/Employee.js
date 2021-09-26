import {React, useState, useEffect} from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import '../../../../node_modules/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import { IoAddSharp } from "react-icons/io5";
import * as GitIcons from "react-icons/gi";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Employee = ()=>{

    const [Data1, setData] = useState([]);
    const { SearchBar } = Search;
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:5000/api/employee/getEmployee").then(res => {
            //console.log(res.data.reverse())
            let rettriveData = res.data.reverse()
            
            setData(rettriveData);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const deleteEmp = (EmployeeID)=>{
        axios.post("http://localhost:5000/api/employee/deleteEmployee", { EmployeeID: EmployeeID }).then(res => {
            alert(res.data);
            history.go(0)
        }).catch(err => {
            console.log(err);
        })
    }

    const columns = [
        {
            dataField: "EmployeeID",
            text: "Employee ID",
            headerStyle: (colum, colIndex) => {
                return { width: '100px', textAlign: 'center' };
            }
        },
        {
            dataField: "EmployeeName",
            text: "Employee Name",
            headerStyle: (colum, colIndex) => {
                return { width: '200px', textAlign: 'center' };
            }
        },

        {
            dataField: "phoneNo",
            text: "Phone No",
            headerStyle: (colum, colIndex) => {
                return { width: '100px', textAlign: 'center' };
            }
        },
        {
            dataField: "nidNo",
            text: "NID No",
            headerStyle: (colum, colIndex) => {
                return { width: '110px', textAlign: 'center' };
            }
        },

        {
            dataField: "address",
            text: "Address",
            headerStyle: (colum, colIndex) => {
                return { width: '200px', textAlign: 'center' };
            }
        },
        {
            dataField: "Branch",
            text: "Branch",
            headerStyle: (colum, colIndex) => {
                return { width: '100px', textAlign: 'center' };
            }
        },
        {
            dataField: "Designation",
            text: "Designation",
            headerStyle: (colum, colIndex) => {
                return { width: '', textAlign: 'center' };
            }
        },

        {
            dataField: 'link',
            text: <Link to='/addEmployee'><button className="btn btn-primary" style={{ fontSize: "13px" }}><IoAddSharp />Add Employee </button></Link>,
            formatter: (cell, row) => {
                return (
                    <div>
                        <Link to={`/viewEmployee/${row.EmployeeID}`}><button className="btn btn-success" style={{ fontSize: "13px", width: "", marginRight:"0.5rem", position: 'relative', textAlign:'left' }}><FaIcons.FaEye />View</button></Link>
                        <Link to={`/editEmployee/${row.EmployeeID}`}><button className="btn btn-primary" style={{ fontSize: "13px", width: "" }}><FaIcons.FaEye  />Edit</button></Link>
                        <Link ><button onClick={()=>deleteEmp(row.EmployeeID)} className="btn btn-danger" style={{ fontSize: "13px", width: "",marginTop:"0.5rem"  }}><AiIcons.AiFillDelete size="16px" />Delete Employee</button></Link>

                    </div>
                )
            },
            headerStyle: (colum, colIndex) => {
                return { width: '200px',  textAlign:'' };
            }
        }

    ]
    return(
        <ToolkitProvider
        keyField="EmployeeID"
        data={Data1}
        columns={columns}
        search
    >
        {
            props => (
                <div>
                    <h2 style={{ marginLeft: '-49rem' }}>Employee</h2>
                    <hr style={{ marginLeft: "14rem" }} />
                    <div style={{ width: "70rem", position: "relative", left: "14rem", marginTop: "" }}>
                        <SearchBar {...props.searchProps}
                            style={{position:'relative', right:'22.5rem', fontSize:'15px', height: '34px', width: "25rem" }}
                            placeholder='Employee ID/Name/Phone No'
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

export default Employee;