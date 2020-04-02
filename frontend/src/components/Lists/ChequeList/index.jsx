import React, { useState, useEffect } from 'react';
import '../Lists.css';
import { getCheques } from '../../../services/apiGateway';


const ChequeList = () => {
  const [cheques, setCheques] = useState();


  useEffect(() => {
    const fetchCheques = async () => {
      const chequeList = await getCheques();

      setCheques(chequeList);
    };

    fetchCheques();
  }, []);

  console.log(cheques);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Söluaðili</th>
          <th>Úttektaraðili</th>
          <th>Kostnaðarstaður</th>
          <th>Dagsetning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
        </tr>
      </tbody>
    </table>
  );
};
export default ChequeList;
