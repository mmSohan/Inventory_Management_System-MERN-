import { React, useState, useEffect } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { IoAddSharp } from "react-icons/io5";
import * as GitIcons from "react-icons/gi";
import { GrEdit } from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import '../../../../node_modules/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';


const PatientUser = () => {

    const [user, setUser] = useState([]);
    const { SearchBar } = Search;
    const history = useHistory();


    useEffect(() => {
            axios.get("http://localhost:5000/api/patientUser/getUser").then(res => {
                //console.log(res.data.reverse())
                setUser(res.data.reverse());
            }).catch(err => {
                console.log(err)
            })
    }, []);

    const deleteUser = (patientID) => {

        axios.post("http://localhost:5000/api/patientUser/deleteUser", { patientID: patientID }).then(res => {
            alert(res.data);
            history.go(0)
        }).catch(err => {
            console.log(err);
        })


    }


    const column = [
        {
            dataField: "patientName",
            text: "Patient Name",
            headerStyle: (colum, colIndex) => {
                return { width: '130px', textAlign: 'center' };
            }
        },
        {
            dataField: "patientID",
            text: "ID",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },
        {
            dataField: "phoneNo",
            text: "Mobile No",
            headerStyle: (colum, colIndex) => {
                return { width: '90px', textAlign: 'center' };
            }

        },
        {
            dataField: "email",
            text: "Email Address",
            headerStyle: (colum, colIndex) => {
                return { width: '150px', textAlign: 'center' };
            }
        },
        {
            dataField: "address",
            text: "Address",
            formatter: (cell, row) => {
                //console.log(row);
                return <div>{`${row.patientID}-${row.patientName} (${row.phoneNo})`}</div>;
            },
            headerStyle: (colum, colIndex) => {
                return { width: '200px', textAlign: 'center' };
            }

        },
        {
            dataField: "status",
            text: "Status",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },
        {
            dataField: 'link',
            text: <Link to='/addPatient'><button className="btn btn-primary" style={{ fontSize: "13px" }}><IoAddSharp />Add Patient </button></Link>,
            formatter: (cell, row) => {
                return (
                    <div>
                        <Link to={`/viewPatient/${row.patientID}`}><button className="btn btn-success" style={{ fontSize: "13px", width: "", marginRight:"0.5rem", position: 'relative', textAlign:'left' }}><FaIcons.FaEye />View</button></Link>
                        <Link to={`/editPatient/${row.patientID}`}><button className="btn btn-primary" style={{ fontSize: "13px", width: "" }}><AiIcons.AiOutlineEdit  />Edit</button></Link>
                        <Link ><button onClick={()=>deleteUser(row.patientID)} className="btn btn-danger" style={{ fontSize: "13px", width: "",marginTop:"0.5rem"  }}><AiIcons.AiFillDelete size="16px" />Delete Patient</button></Link>  

                    </div>
                )
            },
            headerStyle: (colum, colIndex) => {
                return { width: '150px', textAlign: 'center' };
            }

        }
    ];

    return (
       
        <ToolkitProvider
        keyField="patientID"
        data={user}
        columns={column}
        search
    >
        {
            props => (
                <div>
                    <h2 style={{ marginLeft: '-45rem' }}>Patient User</h2>
                    <hr style={{ marginLeft: "14rem" }} />
                    <div style={{ width: "69rem", position: "relative", left: "14rem", marginTop: "" }}>
                        <SearchBar {...props.searchProps}
                            style={{ position: 'relative', right: '22rem', fontSize: '15px', height: '34px', width: "25rem" }}
                            placeholder='Patient ID/Name/Mobile No'
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
export default PatientUser;