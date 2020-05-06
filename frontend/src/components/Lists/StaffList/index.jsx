import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import '../Lists.css';
import { getUsers, getUser } from '../../../services/apiGateway';
import { sortBy } from '../../../services';

const useStyles = makeStyles((themes) => ({
  container: {
    marginTop: themes.spacing(10),
    width: '90%',
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

const StaffList = (props) => {
  const classes = useStyles();
  const [staffList, setStaffList] = useState([]);
  const [desc, setDesc] = useState(true);

  useEffect(() => {
    const getStaff = async () => {
      const results = await getUsers();
      if (results.status === 200) {
        setStaffList(results.data.results);
      }
    };

    getStaff();
  }, []);

  const sort = async (item, subItem) => {
    const sorted = await sortBy(staffList, item, subItem, setDesc, desc);
    setStaffList(sorted);
  };
  const handleClick = async (uid) => {
    const { setUser, setDrawerOpen } = props;

    const user = await getUser(uid);
    if (user.status) {
      setUser(user.data);
      setDrawerOpen(true);
    }
  };
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell className={classes.tableHeadCell} onClick={() => sort('username')}>Notendanafn</TableCell>
            <TableCell className={classes.tableHeadCell} onClick={() => sort('email')}>Netfang</TableCell>
            <TableCell className={classes.tableHeadCell} onClick={() => sort('department', 'name')}>Deildir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          staffList.filter((staff) => staff.username.includes(props.query)).map((staff) => (
            <TableRow
              className={classes.tableRow}
              key={staff.id}
              onClick={() => handleClick(staff.id)}
            >
              <TableCell className={classes.tableCell}>{staff.username}</TableCell>
              <TableCell className={classes.tableCell}>{staff.email}</TableCell>
              <TableCell className={classes.tableCell}>
                {
                  staff.departments.map((dept) => dept.name).join(', ')
                }
              </TableCell>
            </TableRow>
          ))
        }
        </TableBody>

      </Table>
    </TableContainer>
  );
};

StaffList.propTypes = {
  query: PropTypes.string.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default StaffList;
