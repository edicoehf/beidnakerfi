import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((themes) => ({
  container: {
    marginTop: themes.spacing(5),
    width: '90%',
    maxHeight: 300,
  },
  tableHead: {
    backgroundColor: themes.palette.primary.main,
  },
  tableHeadCell: {
    color: 'white',
    fontSize: '14px',
    padding: themes.spacing(1),
  },
  tableCell: {
    fontSize: '14px',
    padding: themes.spacing(1),
  },
  tableRow: {

    '&:hover': {
      cursor: 'pointer',
    },
  },
}));


const DepartmentList = (props) => {
  const {
    departments
  } = props;
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.container} component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell className={classes.tableHeadCell}>
                Deildir
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
            departments.map((department) => {
              const {
                id, name
              } = department;

              return (
                <TableRow
                  className={classes.tableRow}
                  key={id}
                >
                  <TableCell className={classes.tableCell}>
                    { name }
                  </TableCell>
                </TableRow>
              );
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};


DepartmentList.propTypes = {

};

export default DepartmentList;
