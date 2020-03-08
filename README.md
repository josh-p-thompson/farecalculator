# Fare Estimator for Gig Car Share

I built this single-page React app to demo how [Gig Car Share](https://gigcarshare.com/) could allow users to view price estimates based on an inputted _route_, _schedule_, or _time_. Gig charges by the [minute, hour, or day](https://gigcarshare.com/rates/) with various caps based on the amount of time elapsed. The app does all of this nasty math for you! 

A live version of the app can be viewed [here](https://fareestimator.herokuapp.com/).

## Demo

### Route

User can input pickup and dropoff lcoations. 

The Mapbox geocoding API is called to populate search results and the Mapbox Directions API is called to determine the driving time between the two locations.

![](static/route.gif)

### Schedule

User can input pickup and dropoff datetimes.

![](static/schedule.gif)

### Time

User can input minutes, hours, and days.

Note how the estimate correctly accounts for the, $15 / hr, $55 / 8 hour and $85 / day pricing caps. 

![](static/time.gif)

## Built With

* [React](https://reactjs.org/)
* [Create-React-App](https://create-react-app.dev/)
* [Material-UI](https://material-ui.com/)
* [Material-UI Pickers](https://material-ui-pickers.dev/)
* [Mapbox](https://www.mapbox.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
