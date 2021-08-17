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
import './index.scss';

const initialProduct = {
  product: '',
  steps: '', // need remake in array of strings before save
  descriptions: '',
  ingredients: { all: [{ name: 'ing1' }, { name: 'ing2' }], current: '' },   /* [
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

  const handleChange = ({ target: { value, name } }) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  };
  // useEffect(() => {
  //   // const widthAllIngredientsForm = document.querySelector('.adding-form_ingredients').offsetWidth;
  //   // const widthReadyIngredientsForm = document.querySelector('.adding-form_ready-ingredients').offsetWidth;
  //   // const procentCorrect = ((widthReadyIngredientsForm / widthAllIngredientsForm) * 100)
  //   // // console.log('####### widthAllIngredientsForm', widthAllIngredientsForm, widthReadyIngredientsForm, '#######')
  //   // // console.log('####### procentCorrect', procentCorrect, '#######')
  //   // document.querySelector('.adding-form_input-ingredients').style.width = `${widthAllIngredientsForm - widthReadyIngredientsForm}px`
  //   // if(procentCorrect > 60){
  //   //   document.querySelector('.adding-form_input-ingredients').style.width = `100%`
  //   //   document.querySelector('.adding-form_ready-ingredients').style.width = `100%`

  //     // document.querySelector('..adding-form_ready-ingredients').style
  //     // document.querySelector('.adding-form_ready-ingredients').offsetWidth = widthAllIngredientsForm - widthReadyIngredientsForm;
  //   // }
  // }, [currentProduct.ingredients.all])

  const saveIngredient = ({ key }) => {
    if (key === ',' || key === 'Enter') {
      const newIngredient = currentProduct.ingredients.current.trim().toLocaleLowerCase();
      if (newIngredient) {
        setCurrentProduct({
          ...currentProduct,
          ingredients: {
            all: [
              ...currentProduct.ingredients.all,
              { name: newIngredient },
            ],
            current: '',
          }
        })
      }

    }

    // get adding-form_ready-ingredients
    // set adding-form_input-ingredients  !!! new wigth
  };

  const handleChangeIngredients = ({ target: { value, name }, key }) => {
    const valideValue = value.replace(/[,\n]+/g, "")
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

  const deleteIngredient = (ingredient) => {
    const allIngredientsUpdate = currentProduct.ingredients.all.filter(item => item !== ingredient);
    setCurrentProduct({
      ...currentProduct,
      ingredients: {
        ...currentProduct.ingredients,
        all: allIngredientsUpdate,
      }
    })
  }


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
          >
            <Grid
              item
              className='adding-form_input-ingredients'
            >
              <TextField
                id={`${item}-input`}
                onChange={handleChangeIngredients}
                onKeyDown={saveIngredient}
                label={item}
                type={item}
                name={item}
                value={currentProduct.ingredients.current}
                fullWidth
                multiline
              />
            </Grid>
            <Grid
              item
              className='adding-form_ready-ingredients'
              fullWidth
            >
              {
                currentProduct.ingredients.all.length
                  ?
                  currentProduct.ingredients.all.map(item => (
                    <Chip
                      label={item.name}
                      variant="outlined"
                      deleteIcon={<HighlightOffIcon />}
                      onDelete={() => { deleteIngredient(item.name) }}
                      style={{ maxWidth: '200px' }}
                    />
                  ))
                  :
                  ''
              }
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