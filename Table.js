import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles , Box , Collapse, IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(vehiclename, drivername, currentspeed, harshturn, harshbrake, overspeed) {
  return {
    vehiclename,
    drivername,
    currentspeed,
    harshturn,
    harshbrake,
    overspeed,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.vehiclename}
        </TableCell>
        <TableCell align="center">{row.drivername}</TableCell>
        <TableCell align="center">{row.currentspeed}</TableCell>
        <TableCell align="center">{row.harshbrake}</TableCell>
        <TableCell align="center">{row.harshturn}</TableCell>
        <TableCell align="center">{row.overspeed}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    drivername: PropTypes.string.isRequired,
    currentspeed: PropTypes.string.isRequired,
    harshturn: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    vehiclename: PropTypes.string.isRequired,
    overspeed: PropTypes.string.isRequired,
    harshbrake: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('TN 38', 'Jasan', '25 km', 'yes', 'No', 'yes'),
  createData('TN 38', 'Jasan', '25 km', 'yes', 'No', 'yes'),
  createData('TN 38', 'Jasan', '25 km', 'yes', 'No', 'yes'),
  createData('TN 38', 'Jasan', '25 km', 'yes', 'No', 'yes'),
  createData('TN 38', 'Jasan', '25 km', 'yes', 'No', 'yes'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Vehicle Name</TableCell>
            <TableCell align="center">Driver Name</TableCell>
            <TableCell align="center">Current Speed&nbsp;(km/hr)</TableCell>
            <TableCell align="center">Harsh Brake</TableCell>
            <TableCell align="center">Harsh Turn</TableCell>
            <TableCell align="center">Over Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}