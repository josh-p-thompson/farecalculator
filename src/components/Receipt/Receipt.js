import React, { Component } from 'react';
import './Receipt.css'

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Receipt extends Component {
    render() {
    const {minutesCost, minutes, hoursCost, hours, daysCost, days, totalCost} = this.props;
    const data = {}
    if (minutes > 0) {
        data["Minute"] = {"time": minutes, "cost": minutesCost}
    }
    if (hours > 0) {
        data["Hour"] = {"time": hours, "cost": hoursCost}
    }
    if (days > 0) {
        data["Day"] = {"time": days, "cost": daysCost,}
    }

    if (totalCost > 0) {
        return (
        <div className="Receipt">
            <TableContainer>
                <Table>
                    <TableBody>
                    {
                    Object.keys(data).map(key =>
                        <TableRow>
                            <TableCell>Per {key}</TableCell>
                            <TableCell align="left">x {data[key]["time"]}</TableCell>
                            <TableCell align="right">${data[key]["cost"].toFixed(2)}</TableCell>
                        </TableRow>
                    )
                    }
                        <TableRow>
                            <TableCell style={{borderBottom:'0', fontWeight: "bold"}} >Total</TableCell>
                            <TableCell align="left" style={{borderBottom:'0'}} > </TableCell>
                            <TableCell align="right" style={{borderBottom:'0', fontWeight: "bold"}} >${totalCost.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    } else {
        return (
            <empty></empty>
        )
    }
    }
}

export default Receipt;