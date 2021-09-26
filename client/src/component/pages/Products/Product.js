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


const Product = ()=>{

    const [Data1, setData] = useState([]);
    const { SearchBar } = Search;
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:5000/api/product/getProduct").then(res => {
            //console.log(res.data.reverse())
            let rettriveData = res.data.reverse()
            
            setData(rettriveData);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    // const Data = [
    //     {
    //         ProductID: "medicineID-0", ProductName: "medicine-Name1", BatchNo: "NPZ3I",
    //         ExpireDate: "7th-July-2021", TradePrice: "3000", InStock: "1200", Discount:"0.00", Vat:"123", TotalPrice: "3123"
    //     },
    //     {
    //         ProductID: "medicineID-1", ProductName: "medicine-Name2", BatchNo: "NPZ4I",
    //         ExpireDate: "7th-July-2021", TradePrice: "4000",InStock: "1300", Discount:"0.00", Vat:"123", TotalPrice: "4123"
    //     },


    // ];

    const deletePro = (ProductID)=>{

        axios.post("http://localhost:5000/api/product/deleteProduct", { ProductID: ProductID }).then(res => {
            alert(res.data);
            history.go(0)
        }).catch(err => {
            console.log(err);
        })
    };

    const columns = [
        {
            dataField: "ProductID",
            text: "Product ID",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },

        {
            dataField: "ProductName",
            text: "Product Name",
            headerStyle: (colum, colIndex) => {
                return { width: '200px', textAlign: 'center' };
            }
        },
        {
            dataField: "BatchNo",
            text: "Batch No",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },
        {
            dataField: "ExpireDate",
            text: "Expire Date",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },

        {
            dataField: "TradePrice",
            text: "Trade Price",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },
        {
            dataField: "InStock",
            text: "In Stock",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },

        {
            dataField: "TotalPrice",
            text: "Total Price",
            headerStyle: (colum, colIndex) => {
                return { width: '80px', textAlign: 'center' };
            }
        },

        {
            dataField: 'link',
            text: <Link to='/addProduct'><button className="btn btn-primary" style={{ fontSize: "13px" }}><IoAddSharp />Add Product </button></Link>,
            formatter: (cell, row) => {
                return (
                    <div>
                        <Link to={`/viewProduct/${row.ProductID}`}><button className="btn btn-success" style={{ fontSize: "13px", width: "", marginRight:"0.5rem", position: 'relative', textAlign:'left' }}><FaIcons.FaEye />View</button></Link>
                        <Link to={`/editProduct/${row.ProductID}`}><button className="btn btn-primary" style={{ fontSize: "13px", width: "" }}><FaIcons.FaEye  />Edit</button></Link>
                        <Link ><button onClick={()=>deletePro(row.ProductID)} className="btn btn-danger" style={{ fontSize: "13px", width: "",marginTop:"0.5rem"  }}><AiIcons.AiFillDelete size="16px" />Delete Product</button></Link>

                    </div>
                )
            },
            headerStyle: (colum, colIndex) => {
                return { width: '180px',  textAlign:'' };
            }
        }

    ]
    return(
        <ToolkitProvider
        keyField="ProductID"
        data={Data1}
        columns={columns}
        search
    >
        {
            props => (
                <div>
                    <h2 style={{ marginLeft: '-49rem' }}>Products</h2>
                    <hr style={{ marginLeft: "14rem" }} />
                    <div style={{ width: "70rem", position: "relative", left: "14rem", marginTop: "" }}>
                        <SearchBar {...props.searchProps}
                            style={{position:'relative', right:'22.5rem', fontSize:'15px', height: '34px', width: "25rem" }}
                            placeholder='Product ID/Name/Batch No'
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
    )
}

export default Product;