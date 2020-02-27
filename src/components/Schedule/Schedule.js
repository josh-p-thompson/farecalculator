import React, { Component } from 'react';

import DatePicker from '../DatePicker/DatePicker.js'; 

class Schedule extends Component {
    render() {
    const {pickupDateSelected, onPickupDateChange, dropoffDateSelected, onDropoffDateChange} = this.props;
    return (
        <div className="Schedule">
            <DatePicker 
              dateSelected={pickupDateSelected}
              onDateChange={onPickupDateChange}
              label="Pickup"
            />
            <DatePicker 
              dateSelected={dropoffDateSelected}
              onDateChange={onDropoffDateChange}
              label="Dropoff"
            />
        </div>
    )
    }
}

export default Schedule;


