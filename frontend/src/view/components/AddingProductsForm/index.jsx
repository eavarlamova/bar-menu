import
React, {
  memo,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Chip,
  Grid,
  Button,
  Tooltip,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons';

import { addProduct } from '../../../stores/actions/products';
import EditModal from '../EditModal';

import './index.scss';

const initialProduct = {
  product: '',
  steps: '', // need remake in array of strings before save
  descriptions: '',
  ingredients: {
    all: [
      // { name_ingredient: 'ing1', id: 'ing-1' },
      // { name_ingredient: 'ing2', id: 'ing-2' }
    ],
    current: '',
  },                              /* [
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
  ingredients: JSON.stringify(ingredients.all),
  descriptions: descriptions.trim(),
});


const AddingProductsForm = () => {
  const dispatch = useDispatch();
  const { id: users_id } = useSelector(state => state.users.user)
  const { error: productsError } = useSelector(state => state.products)

  const [modalState, setModalState] = useState(false);
  const [editableIngredient, setEditableIngredient] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);


  const handleChangeModal = (ingredient) => {
    ingredient && setEditableIngredient(ingredient)
    setModalState(!modalState)
  };

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
                name_ingredient: newIngredient,
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
  };

  const editIngredient = (updateIngredient) => {
    const updateName = updateIngredient.name_ingredient.trim();
    if (updateName) {
      const updateAllIngredients = currentProduct.ingredients.all.map(item => {
        if (item.id === updateIngredient.id) return { ...updateIngredient, name_ingredient: updateName }
        return { ...item }
      })
      setCurrentProduct({
        ...currentProduct,
        ingredients: {
          ...currentProduct.ingredients,
          all: updateAllIngredients,
        }
      })
      handleChangeModal(null)
    }
  }

  const saveProduct = () => {
    // check correct of obj
    // remake steps 
    const correctProduct = validateProduct(currentProduct);
    const { product, ingredients } = correctProduct;

    if (users_id && product && ingredients) {
      dispatch(
        addProduct({
          ...correctProduct,
          users_id,
          ingredients,
        }))
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
      ].map((item) => (
        item === 'ingredients'
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
            {
              currentProduct.ingredients.all.length
                ?
                (
                  <Grid
                    item
                    className='adding-form_ready-ingredients'
                    fullWidth
                  >
                    {console.log('currentProduct.ingredients.all', currentProduct.ingredients.all)}
                    {
                      currentProduct.ingredients.all.map(item => {
                        console.log('item', item)
                        return (
                          <Tooltip
                            title={`edit ${item.name_ingredient}`}>
                            <Chip
                              color={item.alkohol ? 'primary' : 'ligth'}
                              label={item.name_ingredient}
                              variant="outlined"
                              deleteIcon={<HighlightOffIcon />}
                              onDelete={() => { deleteIngredient(item.id) }}
                              onClick={() => { handleChangeModal(item) }}
                              style={{ maxWidth: '200px' }}
                            />
                          </Tooltip>
                        )
                      })}
                  </Grid>
                )
                :
                ''
            }
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
      ))}
      <Button
        onClick={saveProduct}
        fullWidth
      >
        add product
      </Button>
      {
        productsError
          ?
          <Typography
            color="error"
            align='center'
          >
            {productsError.msg}
          </Typography>
          :
          ''
      }
      <EditModal
        modalState={modalState}
        editableIngredient={editableIngredient}
        handleChangeModal={handleChangeModal}
        editIngredient={editIngredient}
      />
    </>
  )
};

export default memo(AddingProductsForm);