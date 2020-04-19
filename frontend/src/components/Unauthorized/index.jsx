import React from 'react';
import './Unauthorized.css';

export default function Unauthorized() {
  return (
    <div className="unauth">
      <h1>O-ó!</h1>
      <p>Því miður hefur þú ekki aðgang að þessari síðu. :(</p>
      <sub>401 - Unauthorized</sub>
    </div>
  );
}
