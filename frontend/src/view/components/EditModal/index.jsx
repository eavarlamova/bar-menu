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

import IngredientsForm from '../IngredientsForm';
import AddingProductsForm from '../AddingProductsForm';
import './index.scss'


const EditModal = (props) => {
  const {
    modalState,
    editIngredient,
    handleChangeModal,
    editableIngredient,
    target = 'ingredient',
    editableProduct,
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

  const getModalContentForEditIngredient = () => {
    return (
      editableIngredient
        ?
        <div className='modal'>
          <div className='modal__header'>
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
            className='modal__button'
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

  const getModalContentForEditProduct = () => (
    <div className='modal'>
     

      <AddingProductsForm
      actionType='edit'
      editableProduct={editableProduct}
      />

    </div>
  )

  return (
    <Modal
      open={modalState}
      onClose={() => { handleChangeModal(null) }}
    >
      {
        target === 'ingredient'
          ?
          getModalContentForEditIngredient()
          :
          getModalContentForEditProduct()
          
      }
    </Modal>
  )
};

export default memo(EditModal);