import React, { Component } from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TimerTwoToneIcon from '@material-ui/icons/TimerTwoTone';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import { Divider } from '@material-ui/core';

class FareNavigation extends Component {
    render() {
    const {navSelected, onNavClick} = this.props;
    return (
        <div className="FareNavigation">
            <BottomNavigation
                value={navSelected}
                onChange={(event, newValue) => {
                onNavClick(newValue);
                }}
                showLabels
            >
            <BottomNavigationAction label="Route" icon={<LocationOnTwoToneIcon />} />
            <BottomNavigationAction label="Schedule" icon={<DateRangeTwoToneIcon />} />
            <BottomNavigationAction label="Time" icon={<TimerTwoToneIcon />} />
            </BottomNavigation>
            <Divider />
        </div>
    )
    }
}

export default FareNavigation;


