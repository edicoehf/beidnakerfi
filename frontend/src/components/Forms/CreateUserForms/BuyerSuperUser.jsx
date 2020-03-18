import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import '../Forms.css';

import { getDepartments, createUser } from '../../../services/apiGateway';

const BuyerSuperUser = () => {
  const { register, handleSubmit } = useForm();
  const [costSites, setCostSites] = useState([]);

  useEffect(() => {
    const fetchCostSites = async () => {
      const result = await getDepartments();
      setCostSites(result.data)
    }

    fetchCostSites();
  }, []);

  const onSubmit = async data => {
    console.log(data)
    const results = await createUser(data);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="inputField"
        name="username"
        type="text"
        placeholder="Notendanafn"
        required
        ref={register}
      />
      <input
        className="inputField"
        name="password"
        type="text"
        placeholder="Lykilorð"
        required
        ref={register}
      />
      <input
        className="inputField"
        name="email"
        type="email"
        placeholder="Netfang"
        required
        ref={register}
      />
      <select
        className="inputField"
        placeholder="Kostnaðarstaður"
        name="departmentId"
        ref={register}
      >
        {
          costSites.map(site => {
            return (<option key={site.id} value={site.id}>
              {site.name}
            </option>)
          })
        }
      </select>
      <button className="submitButton" type="submit">
        Skrá starfsmann
      </button>
    </form>
  );
};

export default BuyerSuperUser;
