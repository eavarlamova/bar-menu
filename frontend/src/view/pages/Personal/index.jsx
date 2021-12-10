import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import ProductsList from '../../components/ProductsList';
import AddingProductsForm from '../../components/AddingProductsForm';
import UsersIngredientsForm from '../../components/UsersIngredientsForm';

import './index.scss';

const Personal = () => {
  const {
    users: { user },
    products: { personalProducts }
  } = useSelector(state => state)
  return (
    <>
      <Navbar />
      <div className='personal'>
        <div className="personal__welcome-text">
          <Typography variant='h5'>
            Welcome {user.name}. It`s your Personal Page
          </Typography>
          <Typography>
            It`s your products.
            All products from other users you can see in main page.
          </Typography>
        </div>

        <Grid
          container
          justifyContent='center'
          spacing={3}
        >
          <Grid
            item xs={12}
            sm={4}
            xl={3}
          >
            <div className='personal__adding-cols'>
              <div className='personal__adding-form'>
                <AddingProductsForm />
              </div>
              <div className='personal__editing-form'>
                <UsersIngredientsForm />
              </div>
            </div>
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
            <ProductsList
              products={personalProducts}
            />
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default Personal;