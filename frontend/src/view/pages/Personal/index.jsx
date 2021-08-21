import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import AddingForm from '../../components/AddingForm';
import Navbar from '../../components/Navbar';
import ProductsList from '../../components/ProductsList';

import './index.scss';

const Personal = () => {
  const {
    users: { user },
    products: { personalProducts }
  } = useSelector(state => state)
  return (
    <>
      <Navbar />
      <Grid
        container
        justifyContent='center'
        spacing={3}
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
        
          <ProductsList
            products={personalProducts}
          />
          Welcome {user.name}. It`s your Personal Page
      </Grid>
      </Grid>
    </>
  )
};

export default Personal;