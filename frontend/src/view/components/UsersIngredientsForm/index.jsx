import {
  memo,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Grid,
  Chip,
  Button,
  Typography,
} from '@material-ui/core';
import {
  HighlightOff as HighlightOffIcon,
} from '@material-ui/icons';

import {
  addIngredient,
  editPersonalIngredient,
  deletePersonalIngredient,
} from '../../../stores/actions/users';

import IngredientsForm from "../IngredientsForm";
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
          {
            ...updateIngredient,
            name_ingredient: updateName,
          }
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
        variant='h6'
        align='center'
        color='primary'
      >
        {`add your ingredient now`.toUpperCase()}
      </Typography>
      <IngredientsForm
        handleChange={handleChange}
        currentIngredient={currentIngredient}
        handleChangeSwitch={handleChangeSwitch}
        handleChangeAutocomtete={handleChangeAutocomtete}
      />
      <Button
        fullWidth
        onClick={savePersonalIngredient}
      >
        add ingredient in your profile
      </Button>
      {
        error
          ?
          <Typography
            color='error'
            align='center'
          >
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
            alignItems="center"
            justifyContent="space-around"
          >
            {
              users_ingredients.map(item => (
                <Chip
                  variant="outlined"
                  label={item.name_ingredient}
                  style={{ maxWidth: '200px' }}
                  deleteIcon={<HighlightOffIcon />}
                  color={item.alkohol ? 'primary' : 'ligth'}
                  onClick={() => { handleChangeModal(item) }}
                  onDelete={() => { deleteIngredient(item.id) }}
                />
              ))
            }
          </Grid>
          :
          'you have no any ingredients now, change it'

      }
      <EditModal
        modalState={modalState}
        editIngredient={editIngredient}
        handleChangeModal={handleChangeModal}
        editableIngredient={editableIngredient}
      />
    </Grid>
  )
};

export default memo(UsersIngredientsForm);