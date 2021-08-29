import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import AddingProductsForm from '../../components/AddingProductsForm';
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
          <AddingProductsForm />
          {/*
 form for adding user`s ingredients
output all user`s ingredients
          */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          xl={9}
        >
          <Typography variant='h5'>
            Welcome {user.name}. It`s your Personal Page
          </Typography>
          <Typography>
            It`s your products.
            All products from other users you can see in main page.
          </Typography>

          <ProductsList
            products={personalProducts}
          />
        </Grid>
      </Grid>
    </>
  )
};

export default Personal;