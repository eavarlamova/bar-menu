import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {
  CreateSharp as CreateSharpIcon,
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons';

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
  const [modalState, setModalState] = useState(false);
  const [editIngredient, setEditIngredient] = useState(null);

  const handleChangeModal = (ingredient) => {
    // can be event 
    setEditIngredient(ingredient)
    setModalState(!modalState)
  };
  const getModalContent = () => {
    console.log('#######', editIngredient, '#######')
    return (
      editIngredient
        ?
        <div className='adding-form__modal'        >
          <div className='adding-form__modal-header'>
            <h3>{editIngredient.name.toUpperCase()}</h3>
            <div
              onClick={() => { handleChangeModal(null) }}
            >
              <HighlightOffIcon />
            </div>
          </div>
          <TextField
            label='name of ingredient'
          />
          <FormControlLabel
            label='alkohol'
            control={<Switch color='primary' />}>
          </FormControlLabel>
          {/* <FormControlLabel> */}
          <div className='adding-form__modal-edit-size'>
            <TextField
              type='number'
              label='wigth of ingredient' />
            <FormControl>
              <InputLabel
                id='adding-form__measure_ingredient'
              >
                measure of ingredient
              </InputLabel>
              <Select
                labelId="adding-form__measure_ingredient"
                onChange={() => { console.log('#######', 'click onChange SELECT', '#######') }}
              >
                <MenuItem value='gram'>gram</MenuItem>
                <MenuItem value='ml'>ml</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* </FormControlLabel> */}
          <Button
            className='adding-form__modal-button'
            fullWidth
          >
            edit ingredient
          </Button>
        </div>
        :
        ''
    )
  }
  const handleChange = ({ target: { value, name } }) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  };


  const saveIngredient = ({ key }) => {
    if (key === ',' || key === 'Enter') {
      const newIngredient = currentProduct.ingredients.current.trim().toLocaleLowerCase();
      if (newIngredient) {
        setCurrentProduct({
          ...currentProduct,
          ingredients: {
            all: [
              ...currentProduct.ingredients.all,
              {
                name: newIngredient,
                id: `ing-${Math.random()}`
              },
            ],
            current: '',
          }
        })
      }

    }
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

  const deleteIngredient = (ingredientId) => {
    const allIngredientsUpdate = currentProduct.ingredients.all.filter(item => item.id !== ingredientId);
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
                    <Tooltip
                      title={`edit ${item.name}`}>
                      <Chip
                        label={item.name}
                        variant="outlined"
                        deleteIcon={<HighlightOffIcon />}
                        onDelete={() => { deleteIngredient(item.id) }}
                        // icon={<CreateSharpIcon />}
                        onClick={() => { handleChangeModal(item) }}
                        style={{ maxWidth: '200px' }}
                      />
                    </Tooltip>
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

      <Modal
        open={modalState}
        onClose={handleChangeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {getModalContent()}
      </Modal>
    </>
  )
};

export default memo(AddingForm);