import React from 'react';
import { useSelector } from 'react-redux';

const Personal = () => {
const { user } = useSelector(state => state.users)
  return (
    <>
    Welcome {user.name }. It`s your Personal Page
    </>
  )
};

export default Personal;