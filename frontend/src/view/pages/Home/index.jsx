import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Navbar from '../../components/Navbar';

import { getAllProducts } from '../../../stores/actions/products';

import './index.scss';
import ProductsList from '../../components/ProductsList';

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products.allProducts);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])

  console.log('allProducts', allProducts)
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="main__welcome-text">
          <Typography variant='h5'>
            Welcome to bar-menu!
          </Typography>
          <Typography variant='h6'>
            You see all products in our community and you can add your unic product just now!
          </Typography>
        </div>
        <div className="main__products-list">
          {
            error
              ?
              <Typography
                color="error"
                align='center'
              >
                {error.msg}
              </Typography>
              :
              allProducts && allProducts.length
                ?
                <ProductsList products={allProducts} />
                :
                'we have no any products, but you can change it!'
          }
        </div>
      </div>
    </>
  )
};

export default Home;