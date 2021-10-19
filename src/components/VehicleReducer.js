import React,{useReducer,useState,useRef, useEffect} from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

const initialState = {
    vehicle: {},
    error: ''
}
const reducer = (state, action) => {
    switch(action.type){
        case 'POST_SUCCESS': return{
            vehicle: action.payload,
            error: ''
        }
        case 'POST_ERROR': return{
            vehicle: {},
            error: action.payload
        }
        default: 
            return state
    }
}

function VehicleReducer(props) {
    const inputRef = useRef(null)
    const [vehicle,setVehicle] = useState({vehicle_Name: '',
    vehicle_Model: '',
    vehicle_Year: '',
    chassis_Number:'',
    registration_Number:'',
    fuel_Type:''
    })
   const[state,dispatch] = useReducer(reducer,initialState)

   useEffect(()=>{
       inputRef.current.focus()
   })
    const submitVehicle = (e) => {
        e.preventDefault();
        
         axios.post("http://localhost:8080/api/v1/vehicles", vehicle)
            .then(response => {
                dispatch({type: 'POST_SUCCESS', payload: response.data})
                props.history.push('/');
            })
            .catch(error => {
                dispatch({type: 'POST_ERROR', payload: error.message})
            })

    }

    return (
        <div>
            <br/>
            {state.error ? <div className="text-center text-white">Error : {state.error}</div> :
            <div className = "container" > 
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header > < i className =  "fa fa-plus-square"   > </i> Add New Vehicle
            </Card.Header > 
            <Card.Body >
            <Form id = "vehicleFormId"
            onSubmit = {submitVehicle }
            onReset = {()=>initialState.vehicle} >
            <Row >
            <Col >

            <Form.Label > Vehicle_Name </Form.Label> 
            <Form.Control required type = "text"
            placeholder = "vehicle name"
            className = { "bg-dark text-white" }
            name = "vehicle_Name"
            value = { vehicle.vehicle_Name }
            ref = {inputRef}
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
            onChange = { (e) => {setVehicle({...vehicle,vehicle_Model:e.target.value}) } }
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
            type = "submit" > Save
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
            }
        </div>
    );
}

export default VehicleReducer;