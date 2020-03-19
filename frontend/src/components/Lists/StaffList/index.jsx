import React, { useState, useEffect } from 'react';
import '../Lists.css';
import { getUsers } from '../../../services/apiGateway';

const StaffList = () => {

  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const getStaff = async () => {
      const results = await getUsers();

      setStaffList(results.data);
    }

    getStaff();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Departments</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {
          staffList.map(staff => {
            return (
              <tr key={staff.id}>
                <td>{staff.username}</td>
                <td>{staff.email}</td>
                <td>
                  {
                    staff.departments.map(dept => {
                      return dept.name
                    }).join(', ')
                  }
                </td>
                <td><button>Breyta user</button></td>
                <td><button>Loka user</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default StaffList;
