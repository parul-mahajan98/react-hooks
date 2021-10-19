import React,{useEffect, useState} from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

function UpdateVehicle(props) {
    const initialState = {
        vehicle_Name: '',
        vehicle_Model: '',
        vehicle_Year: '',
        chassis_Number:'',
        registration_Number:'',
        fuel_Type:''
    }
    const[vehicle, setVehicle] = useState(initialState); 
    useEffect(() => {
        const vehicleId = +props.match.params.id;
        findVehicleById(vehicleId);
        
    },[props.match.params.id])
    
    const findVehicleById = (vehicleId) => {
        axios.get("http://localhost:8080/api/v1/vehicles/" + vehicleId)
            .then(response => {
                if (response.data !== null) {
                    setVehicle({
                        id: response.data.id,
                        vehicle_Name: response.data.vehicle_Name,
                        vehicle_Model: response.data.vehicle_Model,
                        vehicle_Year: response.data.vehicle_Year,
                        chassis_Number: response.data.chassis_Number,
                        registration_Number: response.data.registration_Number,
                        fuel_Type: response.data.fuel_Type
                    });
                }
            }).catch(error => {
                console.log("Error: " + error);
            });
    }

    const updateVehicle = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:8080/api/v1/vehicles/${vehicle.id}`, vehicle)
        .then(response => {
            
            setVehicle({
                id: response.data.id,
                vehicle_Name: response.data.vehicle_Name,
                vehicle_Model: response.data.vehicle_Model,
                vehicle_Year: response.data.vehicle_Year,
                chassis_Number: response.data.chassis_Number,
                registration_Number: response.data.registration_Number,
                fuel_Type: response.data.fuel_Type,
            })
            props.history.push('/');
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    

    return (
        <div>
            <br/>
            <div className = "container" > 
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > < i className =  "fa fa-edit" > </i> Update Vehicle
            </Card.Header > 
            <Card.Body >
            <Form id = "vehicleFormId"
            onSubmit = {updateVehicle}
            onReset = { ()=>{setVehicle(initialState)} } >
            <Row >
            <Col >

            <Form.Label > Vehicle_Name </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle name"
            className = { "bg-dark text-white" }
            name = "vehicle_Name"
            value = { vehicle.vehicle_Name }
            onChange = { (e) => {setVehicle({...vehicle,vehicle_Name:e.target.value})} }
            
            / > 
            </Col >

            <Col >
            <Form.Label > Vehicle_Model </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle_model"
            className = { "bg-dark text-white" }
            name = "vehicle_Model"
            value = { vehicle.vehicle_Model }
            onChange = { (e) => {setVehicle({...vehicle,vehicle_Model:e.target.value})} }
            / > 
            </Col > 
            </Row >

            <Row >
            <Col >
            <Form.Label > Vehicle_Year </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle year"
            className = { "bg-dark text-white" }
            name = "vehicle_Year"
            value = { vehicle.vehicle_Year }
            onChange = { (e) => {setVehicle({...vehicle,vehicle_Year:e.target.value})} }
            / > 
            </Col > 
            <Col >
            <Form.Label > Chassis_Number </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "chassis number"
            className = { "bg-dark text-white" }
            name = "chassis_Number"
            value = { vehicle.chassis_Number }
            onChange = { (e) => {setVehicle({...vehicle,chassis_Number:e.target.value})} }
            / > 
            </Col >
            </Row> 
            <Row >
            <Col >
            <Form.Label > Registration_Number </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "registration number"
            className = { "bg-dark text-white" }
            name = "registration_Number"
            value = { vehicle.registration_Number }
            onChange = { (e) => {setVehicle({...vehicle,registration_Number:e.target.value})} }
            / > 
            </Col > 
            <Col >
            <Form.Label > Fuel_Type </Form.Label> 
            <Form.Control as = "select"
            required className = { "bg-dark text-white" }
            name = "fuel_Type"
            value = { vehicle.fuel_Type }
            onChange = { (e) => {setVehicle({...vehicle,fuel_Type:e.target.value})} } >
            <option selected>Select Fuel Type</option>
            <option > PETROL </option> 
            <option > DIESEL </option> 
            <option > CNG </option>

            </Form.Control>
            </Col >
            </Row> 
            <br / >

            <div >
            <Button variant = "success"
            type = "submit" > Update
            </Button>    
            <Button variant = "primary"
            type = "reset"
            style = {
                { marginLeft: "10px" }
            } >
            Reset 
            </Button> 
            <Link to="/" className="btn btn-danger" style = {
                { marginLeft: "10px" }
            } >Cancel</Link>
            

            </div>
            </Form > 
            </Card.Body> 
            </Card > 
            </div>
        </div>
    );
}

export default UpdateVehicle;