import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Time.css'

function Time(props) {
  const {minutes, hours, days, onChange} = props;

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
        onChange={onChange}
        />
      <TextField 
        id="hours" 
        label="Hours" 
        variant="outlined" 
        style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
        type="number"
        value={hours}
        onChange={onChange}
        />
      <TextField 
        id="days" 
        name="days" 
        label="Days" 
        variant="outlined" 
        style={{ marginLeft: ".5rem" }}
        type="number"
        value={days}
        onChange={onChange}
      />
    </form>
  </div>
  )
}

export default Time;