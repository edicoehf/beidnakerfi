import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import '../Forms.css';

import { getDepartments, createUser } from '../../../services/apiGateway';

import { forms } from '../../../config';

import { checkPrivileges } from '../../../services';

const BuyerSuperUser = () => {
  const { register, handleSubmit } = useForm();
  const [costSites, setCostSites] = useState([]);

  useEffect(() => {
    const fetchCostSites = async () => {
      const result = await getDepartments();
      setCostSites(result.data);
    };

    fetchCostSites();
  }, []);

  const onSubmit = async (data) => {
    await createUser(data);
  };

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
        type="password"
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
      {
        (checkPrivileges(forms.SuperBuyer)
          ? (
            <select className="inputField" ref={register} name="department">
              {
                costSites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))
              }
            </select>
          ) : null)
      }
      <button className="submitButton" type="submit">
        Skrá starfsmann
      </button>
    </form>
  );
};

export default BuyerSuperUser;
