import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';

const Personal = () => {
const { user } = useSelector(state => state.users)
  return (
    <>
    <Navbar/>
    Welcome {user.name }. It`s your Personal Page
    </>
  )
};

export default Personal;