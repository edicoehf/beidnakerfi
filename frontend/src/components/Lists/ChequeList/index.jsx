import React, { useState, useEffect } from 'react';
import '../Lists.css';
import { getChequesByDepartmentId, getChequesByOrgId } from '../../../services/apiGateway';


const ChequeList = () => {
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
          <th>Lýsing</th>
          <th>Verð</th>
          <th>Staða</th>
          <th>Úttektaraðili</th>
          <th>Kostnaðarstaður</th>
          <th>Dagsetning</th>
        </tr>
      </thead>
      <tbody>
        {
          cheques.map((cheque) => {
            const {
              code, price, status, description, created,
            } = cheque;
            const { name } = cheque.department;
            const { username } = cheque.user;

            const readableDate = new Date(created).toLocaleString('en-GB');

            return (
              <tr key={code}>
                <td>{ code }</td>
                <td>{ description }</td>
                <td>
                  { `${price} ISK`}
                </td>
                <td>{ status }</td>
                <td>{ username }</td>
                <td>{ name }</td>
                <td>{ readableDate }</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
export default ChequeList;
