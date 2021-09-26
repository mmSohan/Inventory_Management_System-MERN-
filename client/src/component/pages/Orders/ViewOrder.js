import { React, useState, useEffect } from 'react'
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';


const ViewOrder = () => {

    const param = useParams();
    const history = useHistory()
    const [orderNo, setOrderNo] = useState(0);
    const [invoiceNo, setInvoiceNo] = useState(0);
    const [invData, setInvData] = useState([]);
    const [userInfo, setUserInfo]= useState([]);
    const [orderDate, setOrderDate] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const [spotName, setSpotName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [deliveryPoint, setDeliveryPoint] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [remark, setRemark] = useState('')
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('')
    const [deliveryCharge, setDeliveryCharge] = useState('')
    const [userName, setUserName]= useState('');

    useEffect(()=>{
        axios.get("http://localhost:5000/api/Invoice/getCount").then(res=>{
            let count = parseInt(res.data)
            setInvoiceNo(count+1)
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    useEffect(() => {
        axios.post("http://localhost:5000/api/Order/getOrder", { orderNo: parseInt(param.orderNo) }).then(res => {
            //console.log(res.data);
            const retriveData = res.data;
            setInvData(res.data)
            setOrderNo(retriveData.orderNo);
            setOrderDate(retriveData.orderDate);
            setOrderTime(retriveData.orderTime);
            setSpotName(retriveData.spotName);
            setPatientName(retriveData.patientName);
            setDeliveryPoint(retriveData.deliveryPoint);
            setDeliveryDate(retriveData.deliveryDate);
            setDeliveryTime(retriveData.deliveryTime);
            setDeliveryAddress(retriveData.deliveryAddress);
            setSubTotal(retriveData.subTotal);
            setDeliveryCharge(retriveData.deliveryCharge);
            setGrandTotal(retriveData.grandTotal);
            setRemark(retriveData.remark);
            setProducts(retriveData.products);
            setStatus(retriveData.status);

            let userInfo = localStorage.getItem('userInfo');
            const d = JSON.parse(userInfo)
            setUserInfo(d);

        }).catch(err => {
            console.log(err);
        })
    }, [])
    //console.log(param)

    useEffect(()=>{
        let userInfo = localStorage.getItem('userInfo');
        const user1 = JSON.parse(userInfo)
        setUserName(user1.userType[0].name);
    },[])


    const InvoiceOrder = () => {

        axios.post("http://localhost:5000/api/Order/editStatus", { orderNo: parseInt(param.orderNo) }).then(res => { 
            alert(res.data);
        }).catch(err=>{
            console.log(err);
        })

        console.log(invData);
        const postInvoice = {

            invoiceNo: invoiceNo,
            invoiceDate: formatDate(new Date()),
            orderedBy: userInfo.patientName,
            orderData: invData  
        }

        axios.post("http://localhost:5000/api/Invoice/addInvoice", postInvoice).then(res=>{
            alert(res.data);
            history.push('/invoice');
        }).catch(err=>{
            console.log(err);
        })
    }

    const formatDate = (d) => {

        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        const dateFormat = `${month}/${day}/${year}`
        //setCrntDate(dateFormat);
        return dateFormat;
    }
    return (
        <div>
            <div class="card container" style={{ position: 'relative', left: '7rem', top: '1rem', textAlign: "left" }}>
                <div class="card-header" id='C-header'>
                    <h2>Order Details</h2>
                </div>
                <div class="card-body" id="C-body">
                    <div className="form-group row">
                        <label className="col-md-2 col-sm-2 col-xs-4" htmlFor="reference_no"><b>Order No</b> </label>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <div className="input text required" aria-required="true">{orderNo}</div>
                        </div>
                        <label className="col-md-1 col-sm-1 col-xs-2" htmlFor="order_date"><b>Date</b> </label>
                        <div className="col-md-3 col-sm-3 col-xs-5">
                            <div className="input text required" aria-required="true">{orderDate}</div>  </div>
                        <label className="col-md-1 col-sm-1 col-xs-2" htmlFor="order_time"><b>Time</b></label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            <div className="input text required" aria-required="true"> {orderTime} </div>  </div>
                    </div>
                    <div className="form-group row" style={{ position: 'relative', top: '1rem' }}>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="paims_spot_id"> <b>Spot</b>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-3">
                            {spotName}    </div>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="delivery_points"><b>Delivery Point</b>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            {deliveryPoint} </div>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="delivery_date" style={{}}><b>D.Date</b>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            {deliveryDate}
                        </div>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="delivery_time" style={{}}><b>D.Time</b>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            {deliveryTime}
                        </div>
                        <div>
                            <br />
                        </div>

                        <label className="col-md-2 col-sm-2 col-xs-2 right-zero-padding" htmlFor="delivery_time" style={{}}><b>Patient Name</b>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            {patientName}
                        </div>
                        <label className="col-md-2 col-sm-2 col-xs-2 right-zero-padding" htmlFor="delivery_time" style={{}}><b>Delivery Address</b>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            {deliveryAddress}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                </div>
                                <br />
                                <br />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                        </div>
                    </div>
                    <div className="form-group text-center row" style={{ marginTop: '1rem' }}>
                        <div className="col-md-2 col-sm-2 col-xs-5"> <b> Product Code </b> </div>
                        <div className="col-md-3 col-sm-3 col-xs-6"> <b> Description </b> </div>
                        <div className="col-md-2 col-sm-2 col-xs-5"> <b> Quantity </b> </div>
                        <div className="col-md-2 col-sm-2 col-xs-5"> <b> Price </b> </div>
                        <div className="col-md-2 col-sm-2 col-xs-5"> <b> Total </b> </div>
                    </div>
                    <div className=""> <hr /> </div>
                    {
                        products.length !== 0 ? products.map((item) =>
                            <div className="form-group text-center row" >
                                <div className="col-md-2 col-sm-2 col-xs-5">{item.productID} </div>
                                <div className="col-md-3 col-sm-3 col-xs-6">{item.productName}</div>
                                <div className="col-md-2 col-sm-2 col-xs-5">{item.quantity}</div>
                                <div className="col-md-2 col-sm-2 col-xs-5">{item.price}</div>
                                <div className="col-md-2 col-sm-2 col-xs-5">{item.Tprice}</div>
                                <hr style={{position:'relative' }} />
                            </div>
                        ) : null
                    }
                    <div className="form-group">
                        <div className="addProductDiv" />
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="row">
                                <label className="col-md-4 col-sm-4 col-xs-6" htmlFor="description"><b>Remark</b> </label>
                                <div className="col-md-8 col-sm-6 col-xs-12">
                                    <div className="input textarea">{remark}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 pull-right">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="row" style={{ position: "relative", left: '10rem' }}>
                                    <label className="col-md-6 col-sm-4 col-xs-4 right-zero-padding" htmlFor="sub_total"><b>Sub Total</b> </label>
                                    <div className="col-md-6 col-sm-8 col-xs-8">
                                        <div className="row">
                                            <div className="input text"> {subTotal} </div>          </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row" style={{ position: "relative", left: '10rem', top: '.5rem', bottom: '.5rem' }}>
                                    <label className="col-md-6 col-sm-4 col-xs-4 right-zero-padding" htmlFor="sub_total" style={{}}><b>Delivery Charge</b> </label>
                                    <div className="col-md-6 col-sm-8 col-xs-8">
                                        <div className="row">

                                            <div className="input text"> {deliveryCharge} </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row" style={{ position: "relative", left: '10rem', top: '1rem' }}>
                                    <label className="col-md-6 col-sm-4 col-xs-5 right-zero-padding" htmlFor="sub_total" style={{}}><b>Grand Total</b> </label>
                                    <div className="col-md-6 col-sm-8 col-xs-8">
                                        <div className="row">
                                            <div className="input text">{grandTotal}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="ln_solid"><hr /></div>
                    <div className="form-group">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            {
                                userName !== 'Patient User' ?
                                <button type="Submit" className="btn btn-primary orderSubmitBtn" id="goodsSubmitBtn" title="Invoice" style={{ marginRight: '1rem' }} onClick={() => InvoiceOrder()} >Invoice</button>:
                                null
                            }
                           
                            <Link to='/order'> <button type="button" className="btn btn-danger" onclick="cancel('Orders')">Back</button></Link>    </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default ViewOrder;