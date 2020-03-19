import React from 'react';
import '../Forms.css';

const BuyerSuperUser = (props) => {

  const handleChange = (e) => {
    props.setSearch(e.target.value)
  };

  return (
    <>
      <form className="searchForm" >
        <input
          onChange={handleChange}
          className="inputField"
          name="query"
          type="text"
          placeholder="Leitarstrengur"
        />
      </form>
    </>
  );
};

export default BuyerSuperUser;
