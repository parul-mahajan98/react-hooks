import React, { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import { Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const initialState = {
    loading: false,
    vehicles: [],
    error: ''
}
const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': return{
            loading: true,
            vehicles: [],
            error: ''
        }
        case 'FETCH_SUCCESS': return{
            loading: false,
            vehicles: action.payload,
            error: ''
        }
        case 'FETCH_ERROR': return{
            loading: false,
            vehicles: [],
            error: action.payload
        }
        case 'DELETE_SUCCESS': return{
            loading: false,
            vehicles: action.payload,
            error: ''
        }
        case 'DELETE_ERROR': return{
            loading: false,
            vehicles: [],
            error: action.payload
        }
        default: 
            return state
    }
}

function ListVehicleReducer(){
    
    const [state,dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{
        dispatch({type: 'FETCH_REQUEST'})
        axios.get('http://localhost:8080/api/v1/vehicles')
        .then(response=>{
            dispatch({type: 'FETCH_SUCCESS', payload: response.data})
        })
        .catch(error=>{
            dispatch({type: 'FETCH_ERROR', payload: error.message})
        })
    },[])

         
    const deleteBtnHandler = useCallback((vehicleId)=>{
        axios.delete("http://localhost:8080/api/v1/vehicles/" + vehicleId)
        .then(response => {
            dispatch({type: 'DELETE_SUCCESS' , payload: state.vehicles.filter(vehicle => vehicle.id !== vehicleId)})
            
        })
        .catch(error=>{
            dispatch({type: 'DELETE_ERROR', payload: error.message})
        })
    },[state.vehicles])
   
return(
    <div>
        <br/>
        {state.error ? <div className="text-center text-white">Error : {state.error}</div> : null }
            {state.loading ? <div className="text-center text-white">Loading...</div> : 
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
            {state.vehicles.map(vehicle => (<tr key = { vehicle.id } >
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
            }
        
            
    </div>
)

}
export default ListVehicleReducer;