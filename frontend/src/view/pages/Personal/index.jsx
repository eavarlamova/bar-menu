import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import AddingForm from '../../components/AddingForm';
import Navbar from '../../components/Navbar';

const Personal = () => {
  const { user } = useSelector(state => state.users)
  return (
    <>
      <Navbar />
      <Grid
        container
        justifyContent='center'
      >
        <Grid item xs={12} sm={4} xl={3}>
          <AddingForm />

        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          xl={9}
        >
          Welcome {user.name}. It`s your Personal Page
      </Grid>
      </Grid>
    </>
  )
};

export default Personal;