import React, { Component } from 'react';
import './App.css';

import FareNavigation from './components/FareNavigation/FareNavigation.js';
import Schedule from './components/Schedule/Schedule.js';
import Route from './components/Route/Route.js';
import Time from './components/Time/Time.js';
import Receipt from './components/Receipt/Receipt.js';

import { differenceInMinutes } from 'date-fns'

const today = new Date();
const MAPBOX_TOKEN = "pk.eyJ1Ijoiam9zaHVhLXAtdGhvbXBzb24iLCJhIjoiY2s3YTZ0N3R2MDFtODNkbjVuczd2MDNjdiJ9.RMPF7fHxmQbsHe5kYb2d5A"

class App extends Component {
  state = {
    navSelected: 0, 
    minutesApart: 0,
    pickupDateSelected: null, 
    dropoffDateSelected: null, 
    pickup: {
      "input": "",
      "lngLat": [], 
      "options": [],
    },
    dropoff: {
      "input": "",
      "lngLat": [], 
      "options": [],
    },
    minutes: '', 
    hours: '', 
    days: '',
    costs: {
      "minutesCost": 0, 
      "hoursCost": 0, 
      "daysCost": 0,
      "totalCost": 0,
    },
  }

  onNavClick = (newValue) => {
    this.setState({
      navSelected: newValue,
    }, this.resetState)
  }

  resetState = () => {
    this.setState({
      minutesApart: 0,
      pickupDateSelected: null, 
      dropoffDateSelected: null, 
      pickup: {
        "input": "",
        "lngLat": [], 
        "options": [],
      },
      dropoff: {
        "input": "",
        "lngLat": [], 
        "options": [],
      },
      minutes: '', 
      hours: '', 
      days: '',
      costs: {
        "minutesCost": 0, 
        "hoursCost": 0, 
        "daysCost": 0,
        "totalCost": 0,
      },
    })
  }

  onPickupDateChange = (newValue) => {
    this.setState({
      pickupDateSelected: newValue,
    })
  }

  onDropoffDateChange = (newValue) => {
    const minDiff = differenceInMinutes(newValue, this.state.pickupDateSelected);

    this.setState({
      dropoffDateSelected: newValue
    }, this.calculateTime(minDiff))
  }

  calculateTime = (minDiff) => {
    // calculate difference in minutes, hours, and days
    let hours = Math.floor(minDiff / 60)
    let minutes = minDiff - (hours * 60)
    let days = Math.floor(hours / 24)
    hours = hours - (days * 24)

    this.setState({
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
  
  onRouteChange = (event, value) => {
    // limit to valid event
    if (event.target.id === "pickup" || event.target.id === "dropoff") {
      const label = event.target.id;
      const newInput = this.state[label]; 
      newInput["input"] = value;
      this.setState({
        [label]: newInput
      })
      
      // call geocoding api if input string is >3 characters
      if (value.length > 4) {
        this.geocode(label, value);
      }
    }
  }

  onSelectPickup = (event, value) => {
    if (value) {
      let pickup = this.state.pickup;
      pickup["input"] = value.name; 
      pickup["lngLat"] = value.lngLat; 
      this.setState({pickup: pickup}, this.directions);
    } else {
      let pickup = this.state.pickup;
      pickup["input"] = ""; 
      pickup["lngLat"] = ""; 
      this.setState({pickup: pickup});
    }
  }

  onSelectDropoff = (event, value) => {
    if (value) {
      let dropoff = this.state.dropoff;
      dropoff["input"] = value.name; 
      dropoff["lngLat"] = value.lngLat; 
      this.setState({dropoff: dropoff}, this.directions);
    } else {
      let dropoff = this.state.dropoff;
      dropoff["input"] = ""; 
      dropoff["lngLat"] = ""; 
      this.setState({dropoff: dropoff});
    }
  }

  onTimeChange = event => {
    let minutes = this.state.minutes; 
    let hours = this.state.hours; 
    let days = this.state.days;

    if (event.target.id === "minutes") {
      minutes = parseInt(event.target.value);
      // prevent minutes going beyond 0-59
      if (minutes > 58) {
        minutes = 59;
      } else if (minutes < 1) {
        minutes = 0;
      } else if (isNaN(minutes)) {
        minutes = "";
      }

    } else if (event.target.id === "hours") {
      hours = parseInt(event.target.value); 
      // prevent hours going beyond 0-23
      if (hours > 22) {
        hours = 23;
      } else if (hours < 1) {
        hours = 0;
      } else if (isNaN(hours)) {
        hours = ""; 
      }

    } else if (event.target.id === "days") {
      if (event.target.value >= 0) {
        days = event.target.value;
      } else if (isNaN(event.target.value)) {
        days = "";
      }
    }
    
    // set state and calculate costs
    this.setState({minutes: minutes, hours: hours, days: days}, this.calculateCosts);
  }

  calculateCosts = () => {
    let daysCost = this.state.days * 85;
    
    // determine total hours + minutes
    const hrsMins = this.state.hours * 60 + this.state.minutes;

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

    // account for various caps
    // minimum of 2.50 per trip
    if (hrsMins > 0 && hrsMins < 6.25) {
      minutesCost = 2.50;
    // caps at 55 for 8 hours or less
    } else if (hrsMins <= 60*8) {
      if (hoursCost > 55) {
        minutesCost = 0; 
        hoursCost = 55; 
      } else if ((hoursCost + minutesCost) > 55) {
        minutesCost = 55 - hoursCost;
      }
    // caps at 85 for the day
    } else {
      if (hoursCost === 85) {
        minutesCost = 0;
      }
    }
    const costs = {
      minutesCost: minutesCost, 
      hoursCost: hoursCost,
      daysCost: daysCost,
      totalCost: minutesCost + hoursCost + daysCost,
    }
    this.setState({costs: costs})
  }

  // geocodes addresses using Mapbox API
  geocode = (name, value) => {
    const inputName = name;
    const newInput = this.state[inputName];
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + value + ".json?autocomplete=true&country=us&language=en&proximity=-122.268560,37.873710&access_token=" + MAPBOX_TOKEN;
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      // get location options
      let options = []; 
      data.features.map((feature, index) => {
        options.push({"name": feature.place_name, "lngLat": feature.geometry.coordinates, "index": index})
      })
      
      // set state
      newInput["options"] = options;
      this.setState({[inputName]: newInput})
    })
  }

  // gets driving time from Mapbox API
  directions = () => {
    if (this.state.pickup.lngLat.length > 0 && this.state.dropoff.lngLat.length > 0) {
      const pickupLngLat = this.state.pickup.lngLat.join();
      const dropoffLngLat = this.state.dropoff.lngLat.join();
      const url = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" + pickupLngLat + ";" + dropoffLngLat + "?access_token=" + MAPBOX_TOKEN; 
      fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => response.json())
      .then(data => {
        let minutesApart = Math.round(data.routes[0].duration / 60);
        this.setState({minutesApart: minutesApart}, this.calculateTime(minutesApart));
      })
    }
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
              onInputChange = {this.onRouteChange}
              pickupOptions={this.state.pickup.options}
              dropoffOptions={this.state.dropoff.options}
              onClose={this.updateLngLat}
              onPickupChange={this.onSelectPickup}
              onDropoffChange={this.onSelectDropoff}
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
              onChange={this.onTimeChange}
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