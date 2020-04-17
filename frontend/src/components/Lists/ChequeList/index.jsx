import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Lists.css';
import { getChequesByDepartmentId, getChequesByOrgId } from '../../../services/apiGateway';


const ChequeList = (props) => {
  const [cheques, setCheques] = useState([]);


  useEffect(() => {
    const fetchCheques = async () => {
      const chequeList = await getChequesByOrgId();

      setCheques(chequeList);
    };

    fetchCheques();
  }, []);

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
            const { name: sellerName } = cheque.seller;

            const readableDate = new Date(created).toLocaleString('en-GB');

            return (
              <tr key={code}>
                <td>{ code }</td>
                <td>{ sellerName }</td>
                <td>{ deptName }</td>
                <td>{ username }</td>
                <td>{ readableDate }</td>
                <td>{ status }</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

ChequeList.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ChequeList;
