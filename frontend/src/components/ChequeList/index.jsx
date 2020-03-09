import React from 'react';
import './ChequeList.css';

export default function index() {
  return (
    <div>
      <h1> View all cheques </h1>
      <table id="cheque-table">
        <tr id="cheque-table-header">
          <th>Söluaðili</th>
          <th>Lykill</th>
          <th>Kostnaðarstaður</th>
          <th>Verkefni</th>
          <th>Verkþáttur</th>
          <th>Vinnustaður úttektaraðila</th>
          <th>Dagsetning</th>
        </tr>
        <tr>
          <td>Kemi ehf</td>
          <td>tmp lykill</td>
          <td>tmp costsite</td>
          <td>tmp verkefni</td>
          <td>tmp verkthattur</td>
          <td>tmp vinnustadur</td>
          <td>tmp dagsetning</td>
        </tr>
      </table>
    </div>
  );
}
