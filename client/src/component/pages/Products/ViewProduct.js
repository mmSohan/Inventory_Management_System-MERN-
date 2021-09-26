import { React, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function ViewProduct() {

    const [ProductID, setProductID] = useState('')
    const [ProductName, setProductName] = useState('');
    const [BatchNo, setBatchNo] = useState('');
    const [TradePrice, setTradePrice] = useState(0);
    const [InStock, setInStock] = useState(0);
    const [Discount, setDiscount] = useState(0)
    const [Vat, setVat] = useState(0)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [ExpireDate, setExpireDate] = useState(new Date());
    const history = useHistory();
    const param = useParams();

    useEffect(()=>{
        axios.post("http://localhost:5000/api/product/getEditableProduct",{ProductID: param.ProductID}).then(res=>{
            //console.log(res.data[0]);
            const retriveData = res.data;
            setProductID(retriveData.ProductID);
            setProductName(retriveData.ProductName);
            setBatchNo(retriveData.BatchNo);
            setTradePrice(retriveData.TradePrice);
            setInStock(retriveData.InStock);
            setDiscount(retriveData.Discount);
            setVat(retriveData.Vat);
            setTotalPrice(retriveData.TotalPrice);
            setExpireDate(retriveData.ExpireDate);

        }).catch(err=>{
            console.log(err);
        })
    },[])

    return (
        <div>
            <div class="card container" style={{ marginLeft: '14rem', textAlign: "left" }}>
                <div class="card-header">
                    <h2 class="card-title">Products Details</h2>
                </div>
                <div class="card-body">
                    <form action="">

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Product ID</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={ProductID} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Product Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={ProductName} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Batch No</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={BatchNo} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"> Trade Price </label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={TradePrice} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">In Stock</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={InStock} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Discount</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={Discount} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"> Vat</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={Vat} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Total price</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={TotalPrice} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">ExpireDate</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control-plaintext" value={ExpireDate} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Link to="/products"><button className="btn btn-danger" style={{ marginTop: "2rem" }}>Back</button></Link>
        </div>
    )
}

export default ViewProduct
