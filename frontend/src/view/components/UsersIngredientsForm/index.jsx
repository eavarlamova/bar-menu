import {
  memo,
  useState,
} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Chip,
  Button,
  Typography,
} from '@material-ui/core';
import {
  HighlightOff as HighlightOffIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@material-ui/icons';

import IngredientsForm from "../IngredientsForm";
import {
  addIngredient,
  editPersonalIngredient,
  deletePersonalIngredient,
} from '../../../stores/actions/users';
import EditModal from '../../components/EditModal';

const initialIngredient = {
  name_ingredient: '',
  size_ingredient: 0,
  measure_ingredient: '',
  alkohol: false,
};


const UsersIngredientsForm = () => {
  const dispatch = useDispatch();
  const {
    error,
    user: {
      id: users_id,
      users_ingredients
    }
  } = useSelector(state => state.users)
  const [modalState, setModalState] = useState(false);
  const [editableIngredient, setEditableIngredient] = useState(null);
  const [currentIngredient, setCurrentIngredient] = useState(initialIngredient);


  const handleChangeModal = (ingredient) => {
    ingredient && setEditableIngredient(ingredient)
    setModalState(!modalState)
  };

  const handleChange = ({ target: { name, value } }) => {
    setCurrentIngredient({
      ...currentIngredient,
      [name]: value,
    });
  };

  const handleChangeSwitch = ({ target: { name, checked } }) => {
    setCurrentIngredient({
      ...currentIngredient,
      [name]: checked,
    })
  };
  const handleChangeAutocomtete = (event, value) => {
    setCurrentIngredient({
      ...currentIngredient,
      'measure_ingredient': value,
    })
  };

  const savePersonalIngredient = () => {
    const currentIngredientName = currentIngredient.name_ingredient.trim();
    if (currentIngredientName) {
      dispatch(addIngredient(
        {
          ...currentIngredient,
          name_ingredient: currentIngredientName,
          id: `ing-usr${users_id}-${Math.random()}`
        }
      )
      );
    }
  };

  const deleteIngredient = (id) => {
    dispatch(deletePersonalIngredient(id))
  };

  const editIngredient = (updateIngredient) => {
    const updateName = updateIngredient.name_ingredient.trim();
    if (updateName) {
      dispatch(
        editPersonalIngredient(
          { ...updateIngredient, name_ingredient: updateName }
        )
      );
    }
    setModalState(false);
  };

  return (
    <Grid
      container
      direction='column'
    >
      <Typography
        align='center'
        color='primary'
        variant='h6'
      >
        {`add your ingredient now`.toUpperCase()}
      </Typography>
      <IngredientsForm

        currentIngredient={currentIngredient}
        handleChange={handleChange}
        handleChangeSwitch={handleChangeSwitch}
        handleChangeAutocomtete={handleChangeAutocomtete}
      />
      <Button
        onClick={savePersonalIngredient}
        fullWidth
      >
        add ingredient in your profile
            </Button>
      {
        error
          ?
          <Typography color='error' align='center'>
            {error.msg}
          </Typography>
          :
          ''
      }
      {
        users_ingredients.length
          ?
          <Grid
            container
            direction='row'
            justifyContent="space-around"
            alignItems="center"
          >
            {
              users_ingredients.map(item => (
                <Chip
                  label={item.name_ingredient}
                  variant="outlined"
                  style={{ maxWidth: '200px' }}
                  color={item.alkohol ? 'primary' : 'ligth'}
                  deleteIcon={<HighlightOffIcon />}
                  onDelete={() => { deleteIngredient(item.id) }}
                  onClick={() => { handleChangeModal(item) }}
                />
              ))
            }
          </Grid>
          :
          'you have no any ingredients now, change it'

      }
      <EditModal
        modalState={modalState}
        editableIngredient={editableIngredient}
        handleChangeModal={handleChangeModal}
        editIngredient={editIngredient}
      />
    </Grid>
  )
}

export default memo(UsersIngredientsForm);