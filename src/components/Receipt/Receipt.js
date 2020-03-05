import React from 'react';
import './Receipt.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

function Receipt (props) {
    const {minutes, hours, days, costs} = props;
    const data = {}
    if (minutes > 0) {
        data["Minute"] = {"time": minutes, "cost": costs.minutesCost}
    }
    if (hours > 0) {
        data["Hour"] = {"time": hours, "cost": costs.hoursCost}
    }
    if (days > 0) {
        data["Day"] = {"time": days, "cost": costs.daysCost}
    }

    if (costs.totalCost > 0) {
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
                            <TableCell align="right" style={{borderBottom:'0', fontWeight: "bold"}} >${costs.totalCost.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    } else {
        return (<empty></empty>)
    }
}

export default Receipt;