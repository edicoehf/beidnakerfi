import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Lists.css';
import { getChequesByOrgId } from '../../../services/apiGateway';
import { statusCodes } from '../../../config';


const ChequeList = (props) => {
  const [cheques, setCheques] = useState([]);
  const { setDrawerOpen, setCheque } = props;

  useEffect(() => {
    const fetchCheques = async () => {
      const chequeList = await getChequesByOrgId();

      setCheques(chequeList);
    };

    fetchCheques();
  }, []);

  const handleClick = (cheque) => {
    setCheque(cheque);
    setDrawerOpen(true);
  };
  return (

    <table className="table">
      <thead>
        <tr>
          <th>Beiðnanúmer</th>
          <th>Söluaðili</th>
          <th>Kostnaðarstaður</th>
          <th>Úttektaraðili</th>
          <th>Dagsetning</th>
          <th>Staða</th>
        </tr>
      </thead>
      <tbody>
        {
          cheques.filter((cheque) => cheque.code.includes(props.query)).map((cheque) => {
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
};

export default ChequeList;
