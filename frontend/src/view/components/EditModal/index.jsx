import React, {
  memo, useEffect, useState
} from 'react';

import {
  Button,
  FormControlLabel,
  Modal,
  Switch,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons';

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
            <h3>{editableIngredient.name.toUpperCase()}</h3>
            <div
              onClick={() => { handleChangeModal(null) }}
            >
              <HighlightOffIcon />
            </div>
          </div>
          <TextField
            label='name of ingredient'
            value={currentIngredient.name}
            name='name'
            onChange={handleChange}
          />
          <FormControlLabel
            label='alkohol'
            control={
              <Switch
                color='primary'
                name='alkohol'
                checked={currentIngredient.alkohol}
                onChange={handleChangeSwitch}
              />}>
          </FormControlLabel>
          <div className='adding-form__modal-edit-size'>
            <TextField
              type='number'
              label='wigth of ingredient'
              name='size_ingredient'
              value={currentIngredient.size_ingredient}
              onChange={handleChange}
            />
            <Autocomplete
              options={[
                'ml',
                'drop',
                'gram',
                'tea spoon',
                'table spoon',
              ]}
              value={currentIngredient.measure_ingredient}
              onChange={handleChangeAutocomtete}
              getOptionLabel={options => options}
              renderInput={(params) => (<TextField {...params} label='measure of ingredient' />)}
            />
          </div>
          <Button
            className='adding-form__modal-button'
            fullWidth
            onClick={() => { currentIngredient.name.trim() && editIngredient(currentIngredient) }}
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