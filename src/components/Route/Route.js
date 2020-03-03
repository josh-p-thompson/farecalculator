import React, { Component } from 'react';
import './Route.css'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

class Route extends Component {
    render() {
    const {pickupLocation, dropoffLocation, onChange, pickupOptions, dropoffOptions} = this.props;
    return (
        <div className="Route">
          <form noValidate autoComplete="off">
            <Autocomplete 
              id="pickup-location" 
              classes={{option: "Route-options"}}
              options={pickupOptions.map(location => location.name)}
              freeSolo
              renderInput={params => 
                <TextField 
                  {...params} 
                  label="Pickup" 
                  variant="outlined" 
                  // InputProps={{ ...params.InputProps, type: 'search' }}
                  onChange={onChange} 
                  value={pickupLocation} 
                  name="pickup" 
                />
              }
              renderOption={option => <Typography noWrap>{option}</Typography>}
            />
            <Autocomplete 
              id="dropoff-location" 
              classes={{option: "Route-options"}}
              style={{ marginTop: "1rem"}} 
              options={dropoffOptions.map(location => location.name)}
              freeSolo
              renderInput={params => 
                <TextField 
                  {...params} 
                  label="Dropoff" 
                  variant="outlined" 
                  // InputProps={{ ...params.InputProps, type: 'search' }} 
                  onChange={onChange} value={dropoffLocation} 
                  name="dropoff" 
                />
              }
              renderOption={option => <Typography noWrap>{option}</Typography>}
            />
          </form>
        </div>
    )
    }
}

export default Route;


