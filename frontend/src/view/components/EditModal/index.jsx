import React, {
  memo, useEffect, useState
} from 'react';

import {
  Modal,
  Button,
} from '@material-ui/core';
import {
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons';

import IngredientsForm from '../../components/IngredientsForm';

import './index.scss'


const EditModal = (props) => {
  const {
    modalState,
    editIngredient,
    handleChangeModal,
    editableIngredient,
  } = props;
  const [currentIngredient, setCurrentIngredient] = useState({ ...editableIngredient })

  useEffect(() => {
    setCurrentIngredient({ ...editableIngredient })
  }, [editableIngredient])

  const handleChange = ({ target: { name, value } }) => {
    setCurrentIngredient({
      ...currentIngredient,
      [name]: value
    })
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
  }

  const getModalContent = () => {
    return (
      editableIngredient
        ?
        <div className='adding-form__modal'        >
          <div className='adding-form__modal-header'>
            <h3>{editableIngredient.name_ingredient.toUpperCase()}</h3>
            <div
              onClick={() => { handleChangeModal(null) }}
            >
              <HighlightOffIcon />
            </div>
          </div>

          <IngredientsForm
            currentIngredient={currentIngredient}
            handleChange={handleChange}
            handleChangeSwitch={handleChangeSwitch}
            handleChangeAutocomtete={handleChangeAutocomtete}
          />

          <Button
            className='adding-form__modal-button'
            fullWidth
            onClick={() => { currentIngredient.name_ingredient.trim() && editIngredient(currentIngredient) }}
          >
            edit ingredient
          </Button>
        </div>
        :
        ''
    )
  }

  return (
    <Modal
      open={modalState}
      onClose={() => { handleChangeModal(null) }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {getModalContent()}
    </Modal>
  )
};

export default memo(EditModal);