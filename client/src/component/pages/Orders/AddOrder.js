import Stack from '@material-ui/core/Stack';
import TimePicker from '@material-ui/lab/TimePicker';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css"
import 'react-clock/dist/Clock.css'
import "react-datepicker/dist/react-datepicker.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import '../../pages/Orders/AddOrder.css'
import * as GitIcons from "react-icons/gi";
import { React, useState, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';;



// const Medicine = [
//     { id: 1, value: '5000', label: 'mediceineI0-Name', totalPrice: 0 },
//     { id: 2, value: '6000', label: 'mediceineI1-Name1', totalPrice: 0 },
//     { id: 3, value: '7000', label: 'mediceineI2-Name2', totalPrice: 0 },
//     { id: 4, value: '8000', label: 'mediceineI3-Name3', totalPrice: 0 },
//     { id: 5, value: '9000', label: 'mediceineI4-Name4', totalPrice: 0 }
// ]

const AddOrder = () => {


    const normalCharge = 150;
    const emergencyCharge = 250;
    let sub = 0

    const history = useHistory();
    const currentDate = new Date()
    const [patient, setPatient] = useState([]);
    const [dCharge, setDcharge] = useState('');
    const [crntDate, setCrntDate] = useState(new Date());
    const [Data, setData] = useState([]);
    const [products, setProducts] =  useState([]);
    const [dawa, setDawa] = useState([]);
    const [Data1, setData1] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    //const [time, setTime] = useState('10:00');
    const [value, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
    const [medicine, setMedicine] = useState([]);
    const [deliveryPoint, setDeliveryPoint] = useState('');
    const [radio, setRadio] = useState(false);
    const [orderNo, setOrderNo] = useState('0')
    const [subTotal, setSubTotal] = useState()
    const [grandTotal, setGrandTotal] = useState()
    const [spot, setSpot] = useState()
    const [remark, setRemark] = useState('')
    const [user, setUser] = useState([]);
    const [userName, setUserName]= useState('');

    const confirmOrder = () => {

        console.log(Data1);
        medicine.map((item)=>
        //console.log(item)
       
        products.push({
            productID: item.productID,
            productName: item.ProductName,
            quantity: item.totalPrice/parseInt(item.value),
            price: item.value,
            expireDate: item.ExpireDate,
            tradePrice: item.TradePrice,
            discount: (item.Discount*(parseInt(item.totalPrice/parseInt(item.value)))),
            vat: (item.Vat*(parseInt(item.totalPrice/parseInt(item.value)))),
            Tprice: item.totalPrice
        })
        )
        
        var postData = {
            orderNo: orderNo,
            orderDate: crntDate,
            orderTime: currentDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: "2-digit", second: "numeric" }),
            spotName: spot,
            patientName: (Data1.label).slice(7),
            patientID: (Data1.label).slice(0,6),
            phoneNo: Data1.phoneNo,
            deliveryPoint: deliveryPoint,
            deliveryDate: formatDate(startDate),
            deliveryTime: value.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: "2-digit", second: "numeric" }),
            deliveryAddress: Data1.value,
            products: products,
            subTotal: subTotal,
            deliveryCharge: grandTotal- subTotal,
            grandTotal: grandTotal,
            remark: remark,
            status: 'Uninvoice'
        }

        console.log(postData);
        axios.post("http://localhost:5000/api/Order/addOrder", postData).then(res=>{
                alert(res.data);
                history.push('/order');
        }).catch(err=>{
            alert(err);
        })

    }

    useEffect(() => {
        axios.get("http://localhost:5000/api/patientUser/getUser").then(res => {
            //console.log(res.data.reverse())
            setPatient(res.data);
            let bal = res.data
            bal.forEach(element => {
                Data.push({ value: `${element.delAddress}`, label: `${element.patientID}-${element.patientName}`, phoneNo: `${element.phoneNo}`})
            });
            setCrntDate(formatDate(crntDate));
        }).catch(err => {
            console.log(err)
        })
    }, []);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/Order/getCount").then(res=>{
            let count = parseInt(res.data)
            setOrderNo(((count + 1).toString()).padStart(6, '0'));
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/product/getProduct").then(res => {
            //console.log(res.data.reverse())
            let rettriveData = res.data.reverse()
            //console.log(rettriveData);
            let r = [];
            rettriveData.forEach((element)=>{
                let d = {
                    productID: element.ProductID,
                    ProductName: element.ProductName,
                    label : `${element.ProductID}-${element.ProductName}`,
                    value: element.TotalPrice,
                    BatchNo: element.BatchNo,
                    ExpireDate: element.ExpireDate,
                    TradePrice:element.TradePrice,
                    Discount:element.Discount,
                    InStock:element.InStock,
                    Vat:element.Vat,
                    totalPrice: 0
                 }
                 r.push(d)

            })
            //console.log(r);
            setDawa(r);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    useEffect(()=>{
        let userInfo = localStorage.getItem('userInfo');
        const user1 = JSON.parse(userInfo)
            user.push({ value: `${user1.delAddress}`, label: `${user1.patientID}-${user1.patientName}`, phoneNo: `${user1.phoneNo}`})
        //setUser(user);
        setUserName(user1.userType[0].name);
    },[])

    const handelRadio = () => {
        setRadio(true);
        let answer = prompt('Type Patient Address:');
        console.log(answer);
        Data1.value = answer;
    }
    const handelRadio2 = () => {
        setRadio(false);
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

    //console.log(totalPrice);

    const handaler = (item, e) => {

        item.totalPrice = (parseInt(item.value) * (e.target.value));

        //console.log(medicine)

        const exist = medicine.find((x) => x.productID === item.productID)

        if (exist) {
            setMedicine(
                medicine.map((x) =>
                    x.productID === item.productID ? { ...exist, totalPrice: item.totalPrice } : x
                )
            );
        }
        else {
            setMedicine(...medicine)
        }

        medicine.map((x) =>
            sub += x.totalPrice
        )

        setSubTotal(sub);
        //setGrandTotal(sub+normalCharge)
        if (deliveryPoint == 'Home Delivery' && startDate.getDate() === new Date().getDate()) {
            setGrandTotal(sub + emergencyCharge);
        }
        else if (deliveryPoint == 'Home Delivery' && startDate.getDate() !== new Date().getDate()) {
            setGrandTotal(sub + normalCharge);
        }



    }







    return (
        <div>
            <div class="card container" style={{ position: 'relative', left: '6.5rem', top: '1rem', textAlign: "left" }}>
                <div class="card-header" id='C-header'>
                    <h2>Add Order</h2>
                </div>
                <div class="card-body" id="C-body">
                    <div className="form-group row">
                        <label className="col-md-2 col-sm-2 col-xs-4" htmlFor="reference_no">Order No</label>
                        <div className="col-md-3 col-sm-3 col-xs-6">
                            <div className="input text required" aria-required="true"><input type="text" name="reference_no" className="form-control valid" placeholder="Order No" autoComplete="off" required="required" readOnly="readonly" style={{ maxLength: '10', fontSize: '13px', fontWeight: '400' }} id="reference-no" aria-required="true" aria-invalid="false" value={orderNo} /></div>
                        </div>
                        <label className="col-md-1 col-sm-1 col-xs-2" htmlFor="order_date">Date <span className="required" aria-required="true" style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-md-3 col-sm-3 col-xs-5">
                            <div className="input text required" aria-required="true"><input style={{ fontSize: '13px', fontWeight: '400' }} type="text" name="order_date" className="form-control" id="orderDate" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}" placeholder="Date" autoComplete="off" required="required" onchange="invalidPatternMsgHtml(this);" oninvalid="invalidPatternMsgHtml(this);" readOnly="readonly" value={crntDate} aria-required="true" /></div>  </div>
                        <label className="col-md-1 col-sm-1 col-xs-2" htmlFor="order_time">Time <span className="required" aria-required="true" style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            <div className="input text required" aria-required="true"><input style={{ fontSize: '13px', fontWeight: '400' }} type="text" name="order_time" id="orderTime" className="form-control" placeholder="Date" autoComplete="off" required="required" readOnly="readonly" onchange="invalidPatternMsgHtml(this);" oninvalid="invalidPatternMsgHtml(this);" value={currentDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: "2-digit", second: "numeric" })} aria-required="true" /></div>  </div>
                    </div>
                    <div className="form-group row" style={{ position: 'relative', top: '1rem' }}>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="paims_spot_id">Spot <span className="required" aria-required="true" style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-3">
                            <select value={spot} onChange={(e)=> setSpot(e.target.value)} name="paims_spot_id" id className="form-control" autoComplete="off" required="required" aria-required="true" style={{ marginBottom: '1rem', fontSize: '15px', fontWeight: "400" }}><option value>Select</option><option value='Dhaka Spot'>Dhaka Spot</option><option value='Chittagong Spot'>Chittagong Spot</option><option value='Sylhet Spot'>Sylhet Spot</option><option value='Comilla Spot'>Comilla Spot</option><option value='Mymensingh Spot'>Mymensingh Spot</option><option value='Barisal Spot'>Barisal Spot</option><option value='Bogra Spot'>Bogra Spot</option><option value='Rangpur Spot'>Rangpur Spot</option><option value='Rajshahi Spot'>Rajshahi Spot</option><option value='Jessore Spot'>Jessore Spot</option><option value='Maizdee Spot'>Maizdee Spot</option><option value='Khulna Spot'>Khulna Spot</option><option value='Dhaka North'>Dhaka North</option></select>    </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {
                               userName === 'Patient User' ?
                               <Select className="basic-single" options={user} placeholder="Select Patient" onChange={setData1} />
                               :
                               <Select className="basic-single" options={Data} placeholder="Select Patient" onChange={setData1} />
                            }
                            

                        </div>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="delivery_points">Delivery Point <span className="required" aria-required="true" style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            <select value={deliveryPoint} onChange={(e) => setDeliveryPoint(e.target.value)} style={{ fontSize: '15px', fontWeight: "400" }} name="delivery_points" id="deliveryPoint" className="form-control" autoComplete="off" required="required" aria-required="true"><option value>Select</option><option value='Spot Delivery'>Spot Delivery</option><option value='Home Delivery'>Home Delivery</option></select>  </div>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="delivery_date" style={{}}>D.Date <span className="required" aria-required="true" style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-md-2 col-sm-2 col-xs-4">
                            <DatePicker id='datePicker' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <label className="col-md-1 col-sm-1 col-xs-2 right-zero-padding" htmlFor="delivery_time" style={{}}>D.Time <span className="required" aria-required="true" style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="col-md-3 col-sm-3">
                            
                                <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                    <Stack>
                                        <TimePicker
                                            
                                            value={value}
                                            onChange={setValue}
                                            renderInput={(params) => <TextField id = "timePicker" {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                </div>
                                <br />
                                <br />
                                <Select
                                    className="mb-3"
                                    options={dawa}
                                    placeholder="Select Medicine"
                                    onChange={setMedicine}
                                    isMulti
                                    isSearchable
                                />
                                {
                                    medicine.length === 0 ? <div className="col-md-12 col-sm-12 col-xs-12" >
                                        <label htmlFor="product" id="prod-label" style={{ color: 'red', fontFamily: "Arial" }}> <b> At least one product should be selected </b></label>
                                    </div> : null
                                }
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 col-xs-12">
                                    <label className><span> Delivery Address: </span></label>
                                </div>
                                <div className="col-md-8 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control-plaintext" value={Data1.value} />
                                </div>
                            </div>
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
                        medicine.length !== 0 ? medicine.map((item) =>
                            <div className="form-group text-center row" style={{ marginBottom: '1rem' }}>
                                <div className="col-md-2 col-sm-2 col-xs-5"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="" className="form-control" placeholder="Medicine ID" autoComplete="off" readOnly="readonly" value={item.productID } /></div>
                                <div className="col-md-3 col-sm-3 col-xs-6"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="" className="form-control" placeholder="Medicine Name" autoComplete="off" readOnly="readonly" value={item.ProductName} /></div>
                                <div className="col-md-2 col-sm-2 col-xs-5"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="" className="form-control" placeholder="Quantity" onChange={(e) => handaler(item, e)} /></div>
                                <div className="col-md-2 col-sm-2 col-xs-5"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="" className="form-control" placeholder="Price" autoComplete="off" readOnly="readonly" value={item.value} /></div>
                                <div className="col-md-2 col-sm-2 col-xs-5"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="" className="form-control" placeholder="Total" autoComplete="off" readOnly="readonly" value={item.totalPrice} /></div>
                            </div>
                        ) : null
                    }
                    <div className="form-group">
                        <div className="addProductDiv" />
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="row">
                                <label className="col-md-4 col-sm-4 col-xs-6" htmlFor="description">Remark</label>
                                <div className="col-md-8 col-sm-6 col-xs-12">
                                    <div className="input textarea"><textarea value={remark} onChange={(e)=>setRemark(e.target.value)} style={{ fontSize: '13px', fontWeight: '400' }} name="remarks" className="form-control" id="remarkId" placeholder="Remark" maxLength={500} rows={5} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 pull-right">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="row" style={{ position: "relative", left: '10rem' }}>
                                    <label className="col-md-6 col-sm-4 col-xs-4 right-zero-padding" htmlFor="sub_total" style={{}}>Sub Total</label>
                                    <div className="col-md-6 col-sm-8 col-xs-8">
                                        <div className="row">
                                            <div className="input text"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="sub_total" className="form-control subTotal" placeholder="Sub Total" autoComplete="off" readOnly="readonly" onchange="invalidPatternMsgHtml(this);" oninvalid="invalidPatternMsgHtml(this);" id="sub-total" value={subTotal} /></div>          </div>
                                    </div>
                                </div>
                                <div className="row" style={{ position: "relative", left: '10rem', top: '.5rem', bottom: '.5rem' }}>
                                    <label className="col-md-6 col-sm-4 col-xs-4 right-zero-padding" htmlFor="sub_total" style={{}}>Delivery Charge</label>
                                    <div className="col-md-6 col-sm-8 col-xs-8">
                                        <div className="row">
                                            {
                                                deliveryPoint == 'Home Delivery' && startDate.getDate() === new Date().getDate() ?

                                                    <div className="input text"><input style={{ height: '30px', fontSize: '14px', fontWeight: '400' }} type="text" name="delivery_charge" className="form-control deliveryCharge" placeholder="Delivery Charge" autoComplete="off" readOnly="readonly" value={emergencyCharge} /></div>
                                                    : <div className="input text"><input style={{ height: '30px', fontSize: '14px', fontWeight: '400' }} type="text" name="delivery_charge" className="form-control deliveryCharge" placeholder="Delivery Charge" autoComplete="off" readOnly="readonly" value={normalCharge} /></div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ position: "relative", left: '10rem', top: '1rem' }}>
                                    <label className="col-md-6 col-sm-4 col-xs-5 right-zero-padding" htmlFor="sub_total" style={{}}>Grand Total</label>
                                    <div className="col-md-6 col-sm-8 col-xs-8">
                                        <div className="row">
                                            <div className="input text"><input style={{ fontSize: '14px', fontWeight: '400' }} type="text" name="sub_total" className="form-control subTotal" placeholder="Grand Total" autoComplete="off" readOnly="readonly" onchange="invalidPatternMsgHtml(this);" oninvalid="invalidPatternMsgHtml(this);" id="sub-total" value={grandTotal} /></div>          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12 col-sm-12 col-xs-12"><b>Note:</b> Price is including VAT.</div>
                    </div>
                    {
                        deliveryPoint == 'Home Delivery' ? <div className="form-group changeDeliveryAddr row" >
                            <label className="col-md-3 col-sm-3 col-xs-6" htmlFor="changeAddress">Want to Change Address?</label>
                            <div className="col-md-6 col-sm-6 col-xs-6 ">
                                <label className="col-md-4" htmlFor="changeaddress-1"><input onClick={handelRadio} type="radio" name="changeAddress" defaultValue={1} id="changeaddress-1" /> Yes</label><label className="col-md-4" htmlFor="changeaddress-2"><input type="radio" name="changeAddress" defaultValue={2} id="changeaddress-2" onClick={handelRadio2} /> No</label>  </div>
                        </div> : null
                    }

                    <div className="ln_solid"><hr /></div>
                    <div className="form-group">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <button type="Submit" className="btn btn-primary orderSubmitBtn" id="goodsSubmitBtn" title="Add" disabled={medicine.length === 0} style={{ marginRight: '1rem' }} onClick={() => confirmOrder()} >Confirm &amp; Exit</button> <Link to='/order' ><button type="button" className="btn btn-danger" onclick="">Back</button></Link>     </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default AddOrder;