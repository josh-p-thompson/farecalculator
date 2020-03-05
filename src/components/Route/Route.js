import React, { Component } from 'react';
import './Route.css'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

class Route extends Component {
    render() {
    const {onInputChange, onPickupChange, onDropoffChange, pickupOptions, dropoffOptions, onClose} = this.props;
    return (
        <div className="Route">
          <form noValidate autoComplete="off">
            <Autocomplete 
              id="pickup" 
              classes={{option: "Route-options"}}
              options={pickupOptions}
              getOptionLabel={option => option.name}
              autoComplete
              onInputChange={onInputChange}
              onChange={onPickupChange}
              renderInput={params => 
                <TextField 
                  {...params} 
                  label="Pickup" 
                  variant="outlined" 
                />
              }
              renderOption={option => <Typography id="pickup" noWrap>{option.name}</Typography>}
            />
            <Autocomplete 
              id="dropoff" 
              classes={{option: "Route-options"}}
              style={{ marginTop: "1rem"}} 
              options={dropoffOptions}
              getOptionLabel={option => option.name}
              autoComplete
              onInputChange={onInputChange}
              onChange={onDropoffChange}
              renderInput={params => 
                <TextField 
                  {...params} 
                  label="Dropoff" 
                  variant="outlined" 
                />
              }
              renderOption={option => <Typography id="dropoff" noWrap>{option.name}</Typography>}
            />
          </form>
        </div>
    )
    }
}

export default Route;


