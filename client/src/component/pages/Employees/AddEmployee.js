import { React, useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';


const AddEmployee = () => {

    const [empID, setEmpId] = useState('')
    const [name, setName] = useState('');
    const [pnonNo, setPhonNo] = useState('');
    const [address, setAddress] = useState('');
    const [nid, setNid] = useState('');
    const [branch, setBranch] = useState('');
    const [designation, setDesignation] = useState('')
    const [salary, setSalary] = useState('')
    const history = useHistory();

    useEffect(() => {
        generateEmployeetID();
    }, [])

    const BranchName = [
        { id: 1, value: 'Dhaka Spot', label: 'Dhaka Spot' },
        { id: 2, value: 'Chittagong Spot', label: 'Chittagong Spot' },
        { id: 3, value: 'Sylhet Spot', label: 'Sylhet Spot' },
        { id: 4, value: 'Comilla Spot', label: 'Comilla Spot' },
        { id: 5, value: 'Mymensingh Spot', label: 'Mymensingh Spot' },
        { id: 6, value: 'Barisal Spot', label: 'Barisal Spot' },
        { id: 7, value: 'Bogra Spot', label: 'Bogra Spot' },
        { id: 8, value: 'Rangpur Spot', label: 'Rangpur Spot' },
        { id: 9, value: 'Rangpur Spot', label: 'Rangpur Spot' },
        { id: 10, value: 'Rajshahi Spot', label: 'Rajshahi Spot' },
        { id: 11, value: 'Maizdee Spot', label: 'Maizdee Spot' },
        { id: 12, value: 'Jessore Spot', label: 'Jessore Spot' },
        { id: 12, value: 'Khulna Spot', label: 'Khulna Spot' },
        { id: 12, value: 'Dhaka North', label: 'Dhaka North' }

    ];

    const generateEmployeetID = () => {
        axios.get("http://localhost:5000/api/employee/getCount").then(res => {
            let count = parseInt(res.data)
            setEmpId(((count + 1).toString()).padStart(6, '0'));
        }).catch(err => {
            console.log(err);
        })
    };

    const submitEmployee = () => {

        var postData = {
            EmployeeID: empID,
            EmployeeName: name,
            phoneNo: pnonNo,
            nidNo: nid,
            address: address,
            Branch: branch.label,
            Designation: designation,
            Salary: salary
        }

        console.log(postData);

        axios.post("http://localhost:5000/api/employee/addEmployee", postData).then(res => {
            alert(res.data);
            history.push('/employee');
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div className="container" style={{ position: 'relative', left: "4rem" }}>
            <Card
                bg='light'
                text='dark'
                style={{ width: '71rem', marginTop: '1rem', marginLeft: '2rem' }}
                className="mb-2"
            >
                <Card.Header> <h4 style={{ textAlign: 'left' }}>Add Employee</h4> </Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Name</h6> </Form.Label>
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Phone No</h6> </Form.Label>
                                <Form.Control value={pnonNo} onChange={(e) => setPhonNo(e.target.value)} placeholder="Phone No" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Address</h6> </Form.Label>
                                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>NID</h6> </Form.Label>
                                <Form.Control value={nid} onChange={(e) => setNid(e.target.value)} placeholder="National ID Card No" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6 >Branch</h6> </Form.Label>
                                <Select
                                    className="mb-3"
                                    options={BranchName}
                                    placeholder="Select Branch"
                                    onChange={setBranch}
                                    isSearchable
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Designation</h6> </Form.Label>
                                <Form.Control value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="" style={{ textAlign: 'left' }}>
                                <Form.Label > <h6>Salary</h6> </Form.Label>
                                <Form.Control value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
                            </Form.Group>

                        </Row>

                        <Button onClick={() => submitEmployee()} className='primary' style={{ position: 'relative', right: '32rem' }}>Submit</Button>

                    </Form>
                </Card.Body>
            </Card>
        </div>

    );
}

export default AddEmployee;