import React, { Component } from 'react';
import './App.css';

import FareNavigation from './components/FareNavigation/FareNavigation.js';
import Schedule from './components/Schedule/Schedule.js';
import Route from './components/Route/Route.js';
import Time from './components/Time/Time.js';

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
    hours: 0, 
    days: 0,
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
    // calculate difference in minutes
    let minDiff = differenceInMinutes(newValue, this.state.pickupDateSelected); 

    this.setState({
      dropoffDateSelected: newValue,
      minutesApart: minDiff,
    })
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onMinutesChange = event => {
    const min = event.target.value; 
    if (min >= 0 && min < 61) {
      this.setState({
        minutes: min,
      })
    }
  }

  onHoursChange = event => {
    const hr = event.target.value; 
    if (hr >= 0 && hr < 25) {
      this.setState({
        hours: hr,
      })
    }
  }

  onDaysChange = event => {
    const d = event.target.value; 
    if (d >= 0) {
      this.setState({
        days: d,
      })
    }
  }

  calculateCosts = () => {
    if (this.state.minutesApart > 60) {
      let hours = this.state.minutesApart / 60; 
      console.log(hours);
    } else {

    }
  }

  render() {
    this.calculateCosts()
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
                minutes={this.state.minutes}
                hours={this.state.hours}
                days={this.state.days}
                onChange={this.onInputChange}
                onMinutesChange={this.onMinutesChange}
                onHoursChange={this.onHoursChange}
                onDaysChange={this.onDaysChange}
              />
            )
          }
        </div>
      </div>
    );
  }
}
export default App;