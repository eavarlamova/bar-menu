import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
} from '@material-ui/core';

import { addProduct } from '../../../stores/actions/products';

const initialProduct = {
  product: '',
  steps: '', // need remake in array of strings before save
  descriptions: '',
  ingredients: '',   /* [
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
  ingredients,
  descriptions,
}) => ({
  steps: steps.trim(),
  product: product.trim(),
  ingredients: ingredients.trim(),
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
      ].map((item) => (
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
      ))}
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