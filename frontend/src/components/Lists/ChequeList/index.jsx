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
import TablePagination from '@material-ui/core/TablePagination';

import { statusCodes } from '../../../config';
import { sortBy } from '../../../services';
import { getCheque } from '../../../services/apiGateway';
import { getChequesByOrgId } from '../../../services/apiGateway';


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


const ChequeList = (props) => {
  const {
    query,
    setDrawerOpen,
    setCheque,
    setShouldRender,
    shouldRender,
  } = props;
  const classes = useStyles();
  const [desc, setDesc] = useState(true);
  const [chequeList, setChequeList] = useState([]);
  const [chequeCount, setChequeCount] = useState(0);
  const [page, setPage] = useState(0);

  const handleClick = async (cheque) => {
    const detaildCheque = await getCheque(cheque.code);
    await setCheque(detaildCheque.data);
    setDrawerOpen(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShouldRender(true);
  };

  const sort = async (item, subItem) => {
    const sorted = await sortBy(chequeList, item, subItem, setDesc, desc);
    setChequeList(sorted);
  };
  useEffect(() => {
    console.log('now')
    const fetchCheques = async () => {
      const result = await getChequesByOrgId(page);
      if (result.status === 200) {
        setChequeList(result.data.results);
        setChequeCount(result.data.count);
        setShouldRender(false);
      }
    };

    if (shouldRender) fetchCheques();
  }, [shouldRender]);

  return (
    <>
      <TableContainer className={classes.container} component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell className={classes.tableHeadCell} onClick={() => sort('code')}>
                Beiðnanúmer
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center" onClick={() => sort('seller', 'name')}>Söluaðili</TableCell>
              <TableCell className={classes.tableHeadCell} align="center" onClick={() => sort('department', 'name')}>Kostnaðarstaður</TableCell>
              <TableCell className={classes.tableHeadCell} align="center" onClick={() => sort('user', 'username')}>Úttektaraðili</TableCell>
              <TableCell className={classes.tableHeadCell} align="center" onClick={() => sort('created')}>Dagsetning</TableCell>
              <TableCell className={classes.tableHeadCell} align="center" onClick={() => sort('status')}>Staða</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            chequeList.filter((cheque) => cheque.code.includes(props.query)).map((cheque) => {
              const {
                code, status, created,
              } = cheque;
              const { name: deptName } = cheque.department;
              const { username } = cheque.user;
              const { name: sellerName } = cheque.seller ? cheque.seller : '';

              const readableDate = new Date(created).toLocaleString('en-GB');

              return (
                <TableRow className={classes.tableRow} onClick={() => handleClick(cheque)} key={code}>
                  <TableCell className={classes.tableCell}>
                    { code }
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">{ sellerName }</TableCell>
                  <TableCell className={classes.tableCell} align="center">{ deptName }</TableCell>
                  <TableCell className={classes.tableCell} align="center">{ username }</TableCell>
                  <TableCell className={classes.tableCell} align="center">{ readableDate }</TableCell>
                  <TableCell className={classes.tableCell} align="center">{ statusCodes[status] }</TableCell>
                </TableRow>
              );
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={chequeCount}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
        page={page}
        onChangePage={handleChangePage}
      />
    </>
  );
};

ChequeList.defaultProps = {
  query: '',
};

ChequeList.propTypes = {
  query: PropTypes.string,
  setCheque: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};

export default ChequeList;
