import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import AddingForm from '../../components/AddingForm';
import Navbar from '../../components/Navbar';

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
          {
            personalProducts.length
              ?
              personalProducts.map(item => (
                <Card>
                  <CardHeader
                    avatar={
                      (item.author && item.author.avatar)
                        ?
                        <Avatar>{item.author.avatar}</Avatar>
                        :
                        <Avatar>{(item.author && item.author.name) ? item.author.name[0] : item.users_id}</Avatar>
                    }
                    title={item.product}
                    subheader={item.ingredients}

                  />
                  <CardMedia
                    className='personal__photo'
                    image={item.photo || 'https://loremflickr.com/g/320/240/cockail'}
                    title={`drink ${item.product}`}
                  />
                  <CardContent>
                    {item.descriptions}
                    <Typography variant="body2" color="textSecondary" component="p">
                      {item.steps}
                    </Typography>
                  </CardContent>
                </Card>
              ))
              :
              ''
          }
          Welcome {user.name}. It`s your Personal Page
      </Grid>
      </Grid>
    </>
  )
};

export default Personal;