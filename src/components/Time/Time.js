import React, { Component } from 'react';
import './Time.css'

import TextField from '@material-ui/core/TextField';

class Time extends Component {
    render() {
    const {minutes, hours, days, onChange, onMinutesChange, onHoursChange, onDaysChange} = this.props;
    return (
        <div className="Time">
          <form noValidate autoComplete="off" className="Time-form" >
            <TextField 
              id="minutes" 
              label="Minutes" 
              variant="outlined" 
              style={{ marginRight: ".5rem" }}
              type="number"
              value={minutes}
              onChange={onMinutesChange}
              />
            <TextField 
              id="hours" 
              label="Hours" 
              variant="outlined" 
              style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
              type="number"
              value={hours}
              onChange={onHoursChange}
              />
            <TextField 
              id="days" 
              name="days" 
              label="Days" 
              variant="outlined" 
              style={{ marginLeft: ".5rem" }}
              type="number"
              value={days}
              onChange={onDaysChange}
            />
          </form>
        </div>
    )
    }
}

export default Time;


