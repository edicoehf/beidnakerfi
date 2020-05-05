import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Lists.css';
import { statusCodes } from '../../../config';
import { sortBy } from '../../../services';
import { getCheque } from '../../../services/apiGateway';

const ChequeList = (props) => {
  const {
    setDrawerOpen, setCheque, chequeList, setChequeList,
  } = props;
  const [desc, setDesc] = useState(true);

  const handleClick = async (cheque) => {
    const detaildCheque  = await getCheque(cheque.code);
    await setCheque(detaildCheque.data);
    setDrawerOpen(true);

  };
  const sort = async (item, subItem) => {
    const sorted = await sortBy(chequeList, item, subItem, setDesc, desc);
    setChequeList(sorted);
  };
  return (

    <table className="table">
      <thead>
        <tr>
          <th onClick={() => sort('code')}>Beiðnanúmer</th>
          <th onClick={() => sort('seller', 'name')}>Söluaðili</th>
          <th onClick={() => sort('department', 'name')}>Kostnaðarstaður</th>
          <th onClick={() => sort('user', 'username')}>Úttektaraðili</th>
          <th onClick={() => sort('created')}>Dagsetning</th>
          <th onClick={() => sort('status')}>Staða</th>
        </tr>
      </thead>
      <tbody>
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
              <tr onClick={() => handleClick(cheque)} className="row" key={code}>
                <td>{ code }</td>
                <td>{ sellerName }</td>
                <td>{ deptName }</td>
                <td>{ username }</td>
                <td>{ readableDate }</td>
                <td>{ statusCodes[status] }</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

ChequeList.defaultProps = {
  query: '',
};

ChequeList.propTypes = {
  query: PropTypes.string,
  setCheque: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chequeList: PropTypes.array.isRequired,
  setChequeList: PropTypes.func.isRequired,
};

export default ChequeList;
