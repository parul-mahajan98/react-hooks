import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ListVehicleReducer from './components/ListVehicleReducer';
import VehicleReducer from './components/VehicleReducer';
//import UpdateVehicle from './components/UpdateVehicle';
import UpdateVehicleReducer from './components/UpdateVehicleReducer';

function App() {
  return (
    <Router >
        <Switch >
        <Route path = "/"
        exact component = { ListVehicleReducer }
        />
        <Route path = "/add"
         component = { VehicleReducer }
        /> 
        <Route path = "/edit/:id"
         component = { UpdateVehicleReducer}
        /> 

        </Switch>


    </Router>    
  );
}

export default App;
