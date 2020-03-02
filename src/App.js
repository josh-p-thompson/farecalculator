import React, { Component } from 'react';
import './App.css';

import FareNavigation from './components/FareNavigation/FareNavigation.js';
import Schedule from './components/Schedule/Schedule.js';
import Route from './components/Route/Route.js';
import Time from './components/Time/Time.js';
import Receipt from './components/Receipt/Receipt.js';

import { differenceInMinutes } from 'date-fns'

const today = new Date();

class App extends Component {
  state = {
    navSelected: 0, 
    pickupDateSelected: today, 
    dropoffDateSelected: today, 
    minutesApart: 0,
    pickupLocation: "",
    dropoffLocation: "",
    minutes: 0, 
    minutesCost: 0, 
    hours: 0, 
    hoursCost: 0, 
    days: 0,
    daysCost: 0,
    totalCost: 0,
  }

  onNavClick = (newValue) => {
    this.setState({
      navSelected: newValue,
    })
  }

  onPickupDateChange = (newValue) => {
    this.setState({
      pickupDateSelected: newValue,
    })
  }

  onDropoffDateChange = (newValue) => {
    // calculate difference in minutes, hours, and days
    let minDiff = differenceInMinutes(newValue, this.state.pickupDateSelected); 
    let hours = Math.floor(minDiff / 60)
    let minutes = minDiff - (hours * 60)
    let days = Math.floor(hours / 24)
    hours = hours - (days * 24)

    this.setState({
      dropoffDateSelected: newValue,
      minutesApart: minDiff,
      minutes: minutes, 
      hours: hours,
      days: days,
    }, this.calculateCosts)
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onMinutesChange = event => {
    let minutes = parseInt(event.target.value);
    if (minutes === 60) {
      minutes = 0;
    } else if (minutes === -1) {
      minutes = 59
    }
    this.setState({minutes: minutes}, this.calculateCosts)
  }

  onHoursChange = event => {
    let hours = parseInt(event.target.value); 
    if (hours === 24) {
      hours = 0;
    } else if (hours === -1) {
      hours = 23;
    }
    this.setState({hours: hours}, this.calculateCosts)
  }

  onDaysChange = event => {
    const d = event.target.value; 
    if (d >= 0) {
      this.setState({days: d}, this.calculateCosts)
    }
  }

  calculateCosts = () => {
    let daysCost = this.state.days * 85;
    
    // determine total hours + minutes
    const hrsMins = this.state.hours * 60 + this.state.minutes;
    const minsCap = 15;
    let hrsCap = 55;

    // set minutesCost
    let minutesCost = this.state.minutes * .40;
    if (minutesCost > 15) {
      minutesCost = 15;
    }

    // set hoursCost
    let hoursCost = this.state.hours * 15; 
    if (hoursCost > 85) { 
      hoursCost = 85;
    }

    // account for 8 hour pricing
    if (hrsMins <= 60*8) {
      if (hoursCost > 55) {
        minutesCost = 0; 
        hoursCost = 55; 
      } else if ((hoursCost + minutesCost) > 55) {
        minutesCost = 55 - hoursCost;
      }
    } else {
      if (hoursCost === 85) {
        minutesCost = 0;
      }
    }

    this.setState({
      minutesCost: minutesCost, 
      hoursCost: hoursCost,
      daysCost: daysCost,
      totalCost: minutesCost + hoursCost + daysCost,
    })
  }


  render() {
    return (  
      <div className="App">
        <div className="FareEstimator">
          <div className="FareEstimator-navigation">
            <FareNavigation 
              navSelected={this.state.navSelected}
              onNavClick={this.onNavClick}
            />
          </div>
          {
            (this.state.navSelected === 0) ? (
              <Route 
                pickupLocation={this.state.pickupLocation}
                dropoffLocation={this.state.dropoffLocation}
                onChange={this.onInputChange}
              />
            ) : (this.state.navSelected === 1) ? (
              <Schedule
                onPickupDateChange={this.onPickupDateChange}
                pickupDateSelected={this.state.pickupDateSelected}
                dropoffDateSelected={this.state.dropoffDateSelected}
                onDropoffDateChange={this.onDropoffDateChange}
              />
            ) : (
              <Time
                {...this.state}
                onChange={this.onInputChange}
                onMinutesChange={this.onMinutesChange}
                onHoursChange={this.onHoursChange}
                onDaysChange={this.onDaysChange}
              />
            )
          }
          <Receipt 
            {...this.state}
          />
        </div>
      </div>
    );
  }
}
export default App;