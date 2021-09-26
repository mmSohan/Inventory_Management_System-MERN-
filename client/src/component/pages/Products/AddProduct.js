import { React, useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios'
import '../AddPatient.css'

function AddProduct() {

    const [ProductID, setProductID] = useState('')
    const [ProductName, setProductName] = useState('');
    const [BatchNo, setBatchNo] = useState('');
    const [TradePrice, setTradePrice] = useState(0);
    const [InStock, setInStock] = useState(0);
    const [Discount, setDiscount] = useState(0)
    const [Vat, setVat] = useState(0)
    const [ExpireDate, setExpireDate] = useState(new Date());
    const history = useHistory();

    const submitProduct = ()=>{
        var postData = {

            ProductID: ProductID,
            ProductName: ProductName,
            BatchNo: BatchNo,
            ExpireDate: formatDate(ExpireDate),
            TradePrice: TradePrice,
            InStock: InStock,
            Discount: Discount,
            Vat: Vat,
            TotalPrice: ((parseInt(TradePrice) + parseInt(Vat)) - parseInt(Discount))
        }

        axios.post("http://localhost:5000/api/product/addProduct", postData).then(res => {
            alert(res.data);
            history.push('/products');
        }).catch(err => {
            console.log(err);
        })
    };

    const formatDate = (d) => {
       
        var month = '' + (d.getMonth() + 1),
             day = '' + d.getDate(),
             year = d.getFullYear();
 
         if (month.length < 2)
             month = '0' + month;
         if (day.length < 2)
             day = '0' + day;
 
         const dateFormat = `${month}/${day}/${year}`
         return dateFormat;
     }

    return (
        <div className="container" style={{ position: 'relative', left: "4rem" }}>
            <Card
                bg='light'
                text='dark'
                style={{ width: '71rem', marginTop: '1rem', marginLeft: '2rem' }}
                className="mb-2"
            >
                <Card.Header> <h4 style={{ textAlign: 'left' }}>Add Product</h4> </Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Product ID</h6> </Form.Label>
                                <Form.Control value={ProductID} onChange={(e) => setProductID(e.target.value)} placeholder="ID" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Product Name</h6> </Form.Label>
                                <Form.Control value={ProductName} onChange={(e) => setProductName(e.target.value)} placeholder="name" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Batch No</h6> </Form.Label>
                                <Form.Control value={BatchNo} onChange={(e) => setBatchNo(e.target.value)} placeholder="batch no" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Expire Date</h6> </Form.Label>
                                <DatePicker  id='datePicker' selected={ExpireDate} onChange={(date) => setExpireDate(date)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6 >In Stock</h6> </Form.Label>
                                <Form.Control value={InStock} onChange={(e) => setInStock(e.target.value)} placeholder="In Stock" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Trade Price</h6> </Form.Label>
                                <Form.Control value={TradePrice} onChange={(e) => setTradePrice(e.target.value)} placeholder="trade price" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Discount</h6> </Form.Label>
                                <Form.Control value={Discount} onChange={(e) => setDiscount(e.target.value)} placeholder="discount" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Vat</h6> </Form.Label>
                                <Form.Control value={Vat} onChange={(e) => setVat(e.target.value)} placeholder="vat" />
                            </Form.Group>

                        </Row>

                        <Button onClick={() => submitProduct()} className='primary' style={{ position: 'relative', right: '32rem' }}>Submit</Button>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AddProduct
