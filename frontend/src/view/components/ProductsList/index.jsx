import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Card,
  Avatar,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import { parseIngredients } from '../../../helpers/parse';

import './index.scss';


const ProductsList = (props) => {
  const { products } = props;
  const {
    products: productsFromStore,
    products: {
      error: errorGettingUsersProducts,
    } } = useSelector(state => state)

  const getIngredientsFieldListForRender = (JSONstringIngredientsArray) => {
    const ingredientsArray = parseIngredients(JSONstringIngredientsArray)
    return ingredientsArray.map(item =>
      <Typography
        variant='body2'
        className='personal__ingredient'
      >
        {item.name} {item.size_ingredient ? `- ${item.size_ingredient} ${item.measure_ingredient}` : ''}
      </Typography>
    );
  };


  return (
    <>
      {
        errorGettingUsersProducts
          ?
          <Alert severity="error">
            {errorGettingUsersProducts.msg}
          </Alert>
          :
          products.length
            ?
            products.map(item => {
              console.log('item', item)
              return (
                <Card>
                  <CardHeader
                    avatar={
                      (item.author && item.author.avatar)
                        ?
                        <Avatar>{item.author.avatar}</Avatar>
                        :
                        // because we have no include in include
                        // this include for users, but .author is include for products 
                        <Avatar>{(item.author && item.author.name) ? item.author.name[0] : item.users_id}</Avatar>
                    }
                    title={item.product}
                    subheader={getIngredientsFieldListForRender(item.ingredients)}

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
              )
            })
            :
            ''
      }
    </>
  )
};

export default memo(ProductsList)