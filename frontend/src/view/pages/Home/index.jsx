import React, {
  memo,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';

import Navbar from '../../components/Navbar';
import ProductsList from '../../components/ProductsList';
import { getAllProducts } from '../../../stores/actions/products';

import './index.scss';


const Home = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.products.error);
  const allProducts = useSelector(state => state.products.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])

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
                <ProductsList
                  products={allProducts}
                  target='main'
                />
                :
                'we have no any products, but you can change it!'
          }
        </div>
      </div>
    </>
  )
};

export default memo(Home);