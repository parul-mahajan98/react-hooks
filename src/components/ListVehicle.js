import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Card, Table, Button, ButtonGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';




function ListVehicle(){
    const[vehicles, setVehicles] = useState([]);
    

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/vehicles')
        .then(response=>{
            setVehicles(response.data)
        })
        .catch(error=>{
            console.log(error.message)
        })
    },[])

         
    const deleteBtnHandler = useCallback((vehicleId)=>{
        axios.delete("http://localhost:8080/api/v1/vehicles/" + vehicleId)
        .then(response => {
            console.log(response.data);
            setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
            
        })
        .catch(error=>{
            console.log(error.message);
        })
    },[vehicles])
   
return(
    <div>
        <br/>
        
            
            <div className='container'>
            <Card className = { "border border-dark bg-dark text-white" } >
            <Card.Header >
                <div style={{float:"left"}}> 
                < i className = "fa fa-list" > </i> Vehicle List 
                </div> 
                <div style={{float:"right"}}> 
                <Link to="/add" className="btn btn-secondary">< i className = "fa fa-plus" > </i> Add </Link>
                </div> 
                
            </Card.Header > 
            <Card.Body >   
            <Table bordered hover striped variant = "dark" >
            <thead >
            <tr >
            <th > Vehicle_Name </th> 
            <th > Vehicle_Model </th> 
            <th > Vehicle_Year </th> 
            <th > Chassis_Number </th> 
            <th > Registration_Number </th> 
            <th > Fuel_Type </th> 
            <th > Actions </th> 
            </tr > 
            </thead> 
            <tbody>
            {vehicles.map(vehicle => (<tr key = { vehicle.id } >
                    <td > { vehicle.vehicle_Name } </td> 
                    <td > { vehicle.vehicle_Model} </td> 
                    <td > { vehicle.vehicle_Year } </td> 
                    <td > { vehicle.chassis_Number } </td> 
                    <td > { vehicle.registration_Number } </td> 
                    <td > { vehicle.fuel_Type } </td> 
                    <td>
                    <ButtonGroup >
                    <Link
                    to={"/edit/"+vehicle.id} className="btn btn-info">
                    < i className = "fa fa-edit" > </i>
                    </Link>
                    <Button variant = "danger"
                     onClick={()=>deleteBtnHandler(vehicle.id)} 
                    > < i className = "fa fa-trash" > </i></Button >
                    </ButtonGroup> 
                    
                    </td >  
            </tr>
            ))}
            </tbody>
            </Table>
            </Card.Body>
            </Card>
            </div>
    </div>
)

}
export default ListVehicle;