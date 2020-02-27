import React, { Component } from 'react';
import './DatePicker.css'

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

class DatePicker extends Component {
    render() {
    const {dateSelected, onDateChange, label} = this.props;
    return (
        <div className="DatePicker">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker 
                value={dateSelected} 
                onChange={(newValue) => onDateChange(newValue)} 
                label={label}
                inputVariant="outlined"
                style={{width: "100%", }}
              />
            </MuiPickersUtilsProvider>
        </div>
    )
    }
}

export default DatePicker;


