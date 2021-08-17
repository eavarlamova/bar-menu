import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Chip,
  Grid,
  TextField,
} from '@material-ui/core';
import { HighlightOff, HighlightOff as HighlightOffIcon } from '@material-ui/icons';

import { addProduct } from '../../../stores/actions/products';

const initialProduct = {
  product: '',
  steps: '', // need remake in array of strings before save
  descriptions: '',
  ingredients: { all: ['ing1', 'ing2'], current: '' },   /* [
                                        {
                                          name_ingredient: 'ice',
                                          size_ingredient: 40, 
                                          measure_ingredient: 'gram',
                                          alkohol: false,
                                        }, 
                                        {}
                                      ] */
};

const validateProduct = ({
  steps,
  product,
  // ingredients,
  descriptions,
}) => ({
  steps: steps.trim(),
  product: product.trim(),
  // ingredients: ingredients.trim(),
  descriptions: descriptions.trim(),
});


const AddingForm = () => {
  const dispatch = useDispatch();
  const { id: users_id } = useSelector(state => state.users.user)
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  // const [currentIngredient, setCurrentIngredient] = useState('123');

  const handleChange = ({ target: { value, name } }) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  };
useEffect(()=>{
  console.log('####### currentProduct.ingredients: ', currentProduct.ingredients, '#######')
},[currentProduct])

  const saveIngredient = ({ key }) => {
    if (key === ',' || key === 'Enter') {
      const newIngredient = currentProduct.ingredients.current.trim().toLocaleLowerCase();
      setCurrentProduct({
        ...currentProduct,
        ingredients: {
          all: [
            ...currentProduct.ingredients.all,
            newIngredient,
          ],
          current: '',
        }
      })
     }
    // get adding-form_ready-ingredients
    // set adding-form_input-ingredients  !!! new wigth
  };

  const handleChangeIngredients = ({ target: { value, name }, key }) => {
    const valideValue = value.replace(/[,]+/g, "")
    // setCurrentIngredient(value)
    setCurrentProduct({
      ...currentProduct,
      ingredients: {
        ...currentProduct.ingredients,
        current: valideValue,
      }
    })

  }

  const saveProduct = () => {
    // check correct of obj
    // remake steps and ingredients ?
    // but mb in process????
    const correctProduct = validateProduct(currentProduct);
    const { product, ingredients } = correctProduct;
    if (users_id && product && ingredients) {
      // correct name 
      // saga for add
      dispatch(addProduct({ ...correctProduct, users_id }))
      // give a new form for ingredients
      // saga for update ingredients in product
    }
    else {
      // create error  and write error
      // view error 
    }
  };



  return (
    <>
      {[
        'product',
        'descriptions',
        'ingredients',
        'steps',
      ].map((item) => {

        return item === 'ingredients'
          ?
          (<Grid
            container
            alignItems='center'
            spacing={2}
            fullWidth
          >
            <Grid item className='adding-form_ready-ingredients'>
              {
                currentProduct.ingredients.all.length
                  ?
                  currentProduct.ingredients.all.map(item => (
                    // {currentProduct[item].map(item => (
                    <Chip
                      // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                      label={item}
                      // avatar={<HighlightOffIcon/>}
                      // onDelete={handleDelete}
                      variant="outlined"
                      deleteIcon={<HighlightOffIcon />}
                      onDelete={() => { console.log('#######', 'it`s work', '#######') }}

                    />
                  ))
                  :
                  ''
              }
            </Grid>
            <Grid
              item
              className='adding-form_input-ingredients'

            // style={getStyle}
            >
              <TextField
                id={`${item}-input`}
                onChange={handleChangeIngredients}
                onKeyDown={saveIngredient}
                label={item}
                type={item}
                name={item}
                value={currentProduct.ingredients.current}
                // value={}
                fullWidth
                multiline
              ></TextField>
            </Grid>
          </Grid>

          ) : (
            <TextField
              id={`${item}-input`}
              onChange={handleChange}
              label={item}
              type={item}
              name={item}
              value={currentProduct[item]}
              fullWidth
              multiline
            />
          )
      })}
      <Button
        onClick={saveProduct}
        fullWidth
      >
        add product
      </Button>
    </>
  )
};

export default memo(AddingForm);