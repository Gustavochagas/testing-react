import React, { useEffect, useState, useCallback } from 'react';
import { IAllInformations, IUser } from '../../types';
import * as usersService from '../../services/usersService';

const initialData: IAllInformations = {
  data: [] as Array<IUser>,
  loading: true,
  error: false
}

const Users = () => {
  const [users, setUsers] = useState(initialData.data);
  const [error, setError] = useState(initialData.error);
  const [loading, setLoading] = useState(initialData.loading);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await usersService.getUsers();
      setUsers(data);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        Error, refresh and try again...
      </div>
    )
  }
  return(
    <div className="users">
      {users.map(user => (
        <div className={`user ${user.active ? 'active' : ''}`} key={user._id}>
          <div className="name">{user.name}</div>
        </div>
      ))}
    </div>
  )

};

export default Users;
