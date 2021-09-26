import axios from 'axios';
import { React, useState, useEffect, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";


const ViewInvoice = () => {
    const param = useParams();
    const [orderNo, setOrderNo] = useState(0);
    const [invoiceNo, setInvoiceNo] = useState(0);
    const [invoiceDate, setInvoiceDate] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [spotName, setSpotName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [patientID, setPatientID] = useState('')
    const [orderBy, setOrderBy] = useState('');
    const [deliveryPoint, setDeliveryPoint] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState('')
    const [grandTotal, setGrandTotal] = useState(0);
    const [remark, setRemark] = useState('')
    const [products, setProducts] = useState([]);





    useEffect(() => {
        axios.post("http://localhost:5000/api/Invoice/getInvoiceData", { invoiceNo: parseInt(param.invoiceNo) }).then(res => {
            const retriveData = res.data;
            setInvoiceNo(retriveData.invoiceNo);
            setInvoiceDate(retriveData.invoiceDate)
            setOrderBy(retriveData.orderedBy)
            setOrderNo(retriveData.orderData[0].orderNo)
            setOrderDate(retriveData.orderData[0].orderDate)
            setSpotName(retriveData.orderData[0].spotName)
            setPatientName(retriveData.orderData[0].patientName)
            setPhoneNo(retriveData.orderData[0].phoneNo)
            setPatientID(retriveData.orderData[0].patientID)
            setDeliveryPoint(retriveData.orderData[0].deliveryPoint)
            setDeliveryDate(retriveData.orderData[0].deliveryDate)
            setDeliveryTime(retriveData.orderData[0].deliveryTime)
            setDeliveryAddress(retriveData.orderData[0].deliveryAddress)
            setSubTotal(retriveData.orderData[0].subTotal)
            setDeliveryCharge(retriveData.orderData[0].deliveryCharge)
            setGrandTotal(retriveData.orderData[0].grandTotal)
            setRemark(retriveData.orderData[0].remark)
            setProducts(retriveData.orderData[0].products)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const printInvoice = () => {

        var addFooters = (doc, length) =>{
            let d = length*5 + 120

            
        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Sub Total: ${subTotal}`, 145,d, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Delivery Charge: ${deliveryCharge}`, 145,d+8, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Grand Total: ${grandTotal}`, 145,d+16, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Remark: ${remark}`, 15,d, 'left')

        }

        const doc = new jsPDF('a4');

        doc.setFontSize(26);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'bold')
        doc.text("Company Name", 44,20, 'center')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text("[Street Address]", 15,30, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text("[City, State, Zip Code]", 15,35, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text("[Phone]", 15,40, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text("[Email Address]", 15,45, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text("[Company Wbsite]", 15,50, 'left')

        doc.setFontSize(26);
        doc.setTextColor(0,0,0);
        doc.setFont('helvetica', 'bold')
        doc.text("INVOICE", 170,20, 'center')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Customer ID: ${patientID}`, 15,65, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Customer NO: ${phoneNo}`, 15,70, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Customer Name: ${patientName}`, 15,75, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Delivery Address: ${deliveryAddress}`, 15,80, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text(`Invoice No: ${invoiceNo}`, 145,30, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text(`Invoice Date: ${invoiceDate}`, 145,35, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text(`Delivery Date: ${deliveryDate}`, 145,40, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('arial', 'normal')
        doc.text(`Delivery Time: ${deliveryTime}`, 145,45, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Order No: ${orderNo}`, 145,65, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Order Date: ${orderDate}`, 145,70, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Spot Name: ${spotName}`, 145,75, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Delivery Type: ${deliveryPoint}`, 145,80, 'left')

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('times', 'normal')
        doc.text(`Order By: ${orderBy}`, 145,85, 'left')

        const tableColumn = ["No", "productID", "Product Details", "Quantity", "Price", "Total Price"];
       //console.log(products)
       const tableRows = [];

      products.forEach((item,index)=>{
          const tableData = [
              index+1,
              item.productID,
              item.productName,
              item.quantity,
              item.price,
              item.Tprice
          ];
          tableRows.push(tableData);
      })

      const tableLength = tableRows.length + 2
      doc.autoTable(tableColumn, tableRows, { startY: 100 });
      addFooters(doc,tableLength)
      doc.save(`${patientName}_${patientID}_${invoiceNo}.pdf`)
      //doc.output(`${patientName}_${patientID}_${invoiceNo}.pdf`)
      //window.open(doc.output('datauristring'));
    }

    const tableRef = useRef();

    return (
        <div>
            <div class="card container" style={{ position: 'relative', left: '7.2rem', textAlign: "left" }} >
                    <div class="card-header" id='C-header'>
                        <h2>Invoice Details</h2>
                    </div>
                    <div class="card-body" id="C-body" >
                        <div className="col-md-12 col-sm-12 col-xs-12" >
                            <div className="form-group row">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="row">
                                        <label className="col-md-5 col-sm-5 col-xs-5 text-right" htmlFor="reference_no"><b>Customer ID:</b><span >{patientID}</span> </label>
                                    </div>
                                    <div style={{ paddingTop: "0.5rem" }}>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Customer No: </b> <span > {phoneNo} </span></label>
                                    </div>
                                    <div style={{ paddingTop: "1rem" }}>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Customer Name: </b> <span > {patientName} </span></label>
                                    </div>
                                    <div style={{ paddingTop: "1rem" }}>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Delivery Address: </b> <span > {deliveryAddress} </span></label>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="row">
                                        <label className="col-md-5 col-sm-5 col-xs-5 text-right" htmlFor="reference_no"><b>Order No: </b> <span > {orderNo} </span></label>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Order Date: </b> <span > {orderDate} </span></label>
                                    </div>
                                    <div className="row" style={{ paddingTop: "0.5rem" }}>
                                        <label className="col-md-5 col-sm-5 col-xs-5 text-right" htmlFor="reference_no"><b>Invoice No: </b> <span > {invoiceNo} </span></label>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Invoice Date: </b> <span > {invoiceDate} </span></label>
                                    </div>
                                    <div className="row" style={{ paddingTop: "1rem" }}>
                                        <label className="col-md-5 col-sm-5 col-xs-5 text-right" htmlFor="reference_no"><b>Spot Name: </b> <span > {spotName} </span></label>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Delivery Type: </b> <span > {deliveryPoint} </span></label>
                                    </div>
                                    <div style={{ paddingTop: "1rem" }}>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Ordered By: </b> <span >{orderBy} </span></label>
                                    </div>
                                    <div className="row" style={{ paddingTop: "1rem" }}>
                                        <label className="col-md-5 col-sm-5 col-xs-5 text-right" htmlFor="reference_no"><b>Delivery Date: </b> <span > {deliveryDate} </span></label>
                                        <label className="col-md-6 col-sm-6 col-xs-6 text-right" htmlFor="reference_no"><b>Delivery time: </b> <span > {deliveryTime} </span></label>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12" style={{ paddingTop: '2rem' }}>
                            <div className="form-group text-center  row" >
                                <div className="col-md-1 col-sm-1 col-xs-1"> <b> No </b> </div>
                                <div className="col-md-2 col-sm-2 "> <b> Product Code </b> </div>
                                <div className="col-md-3 col-sm-3"> <b> Description </b> </div>
                                <div className="col-md-1 col-sm-1 "> <b> Exp Date </b> </div>
                                <div className="col-md-1 col-sm-1 "> <b> Quantity </b> </div>
                                <div className="col-md-1 col-sm-1"> <b> TradePrice </b> </div>
                                <div className="col-md-1 col-sm-1 "> <b>Discount </b> </div>
                                <div className="col-md-1 col-sm-1 "> <b> Vat </b> </div>
                                <div className="col-md-1 col-sm-1 "> <b> Amount </b> </div>
                            </div>
                            <div className=""> <hr /> </div>

                        </div>
                        {

                            products.length !== 0 ? products.map((item, index) =>

                                <div className="form-group text-center  row" >
                                    <div className="col-md-1 col-sm-1 col-xs-1">{index + 1} </div>
                                    <div className="col-md-2 col-sm-2 "> {item.productID} </div>
                                    <div className="col-md-3 col-sm-3"> {item.productName} </div>
                                    <div className="col-md-1 col-sm-1 ">{item.expireDate}</div>
                                    <div className="col-md-1 col-sm-1 "> {item.quantity} </div>
                                    <div className="col-md-1 col-sm-1"> {item.price} </div>
                                    <div className="col-md-1 col-sm-1 "> {item.discount} </div>
                                    <div className="col-md-1 col-sm-1 "> {item.vat} </div>
                                    <div className="col-md-1 col-sm-1 "> <b>{item.Tprice} </b> </div>
                                    <div> <hr /> </div>
                                </div>
                            ) : null

                        }


                        <br />
                        <br />

                        <div className="form-group row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="row">
                                    <label className="col-md-4 col-sm-4 col-xs-6" htmlFor="description">Remark</label>
                                    <div className="col-md-8 col-sm-6 col-xs-12">
                                        <div className="input textarea"><label style={{ fontSize: '13px', fontWeight: '400' }} > {remark} </label></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12 pull-right">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="row" style={{ position: "relative", left: '10rem' }}>
                                        <label className="col-md-6 col-sm-4 col-xs-4 right-zero-padding" htmlFor="sub_total" style={{}}>Sub Total</label>
                                        <div className="col-md-6 col-sm-8 col-xs-8">
                                            <div className="row">
                                                <div className="input text"><label style={{ fontSize: '14px', fontWeight: '400' }} > {subTotal} </label></div>          </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ position: "relative", left: '10rem', top: '.5rem', bottom: '.5rem' }}>
                                        <label className="col-md-6 col-sm-4 col-xs-4 right-zero-padding" htmlFor="sub_total" style={{}}>Delivery Charge</label>
                                        <div className="col-md-6 col-sm-8 col-xs-8">
                                            <div className="row">

                                                <div className="input text"><label style={{ height: '30px', fontSize: '14px', fontWeight: '400' }} > {deliveryCharge} </label></div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ position: "relative", left: '10rem', top: '1rem' }}>
                                        <label className="col-md-6 col-sm-4 col-xs-5 right-zero-padding" htmlFor="sub_total" >Grand Total</label>
                                        <div className="col-md-6 col-sm-8 col-xs-8">
                                            <div className="row">
                                                <div className="input text"><label style={{ fontSize: '14px', fontWeight: '400' }}> {grandTotal} </label></div>          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ln_solid">
                            <hr />
                        </div>
                        <div className="form-group">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <Link> <button style={{ marginRight: '0.5rem' }} onClick={()=>printInvoice()} className="btn btn-primary"> Print</button> </Link>
                        <Link to='/invoice' ><button type="button" className="btn btn-danger" onclick="">Back</button></Link>
                    </div>
                    </div>
                </div>
                <br />
            </div>
        </div>

    );
}

// const Example = () => {
//     const componentRef = useRef();
//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//     });

//     return (
//         <div>
//             <div className="ln_solid"><hr /></div>
//             <ViewInvoice ref={componentRef} />
//             <div className="form-group">
//                 <div className="col-md-6 col-sm-6 col-xs-12">
//                     <button onClick={handlePrint} type="Submit" className="btn btn-primary orderSubmitBtn" style={{ marginRight: '0.5rem' }}  >Print</button> <Link to='/invoice' ><button type="button" className="btn btn-danger" onclick="">Back</button></Link>     </div>
//             </div>
//         </div>
//     );
// };




export default ViewInvoice;