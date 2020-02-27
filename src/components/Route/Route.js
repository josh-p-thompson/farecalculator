import React, { Component } from 'react';
import './Route.css'

import TextField from '@material-ui/core/TextField';

class Route extends Component {
    render() {
    const {pickupLocation, dropoffLocation, onChange} = this.props;
    return (
        <div className="Route">
          <form noValidate autoComplete="off">
            <TextField 
              id="pickup-location" 
              label="Pickup" 
              variant="outlined" 
              name="pickupLocation"
              fullWidth
              value={pickupLocation} 
              onChange={onChange}
            />
            <TextField 
              id="dropoff-location" 
              label="Dropoff" 
              variant="outlined" 
              name="dropoffLocation"
              fullWidth 
              style={{ marginTop: "1rem"}} 
              value={dropoffLocation}
              onChange={onChange}
            />
          </form>
        </div>
    )
    }
}

export default Route;


