import { memo } from "react";

import {
  Switch,
  TextField,
  FormControlLabel,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import './index.scss';


const IngredientsForm = (props) => {
  const {
    handleChange,
    currentIngredient,
    handleChangeSwitch,
    handleChangeAutocomtete,
  } = props;


  return (
    <>
      <TextField
        name='name_ingredient'
        onChange={handleChange}
        label='name of ingredient'
        value={currentIngredient.name_ingredient}
      />
      <FormControlLabel
        label='alkohol'
        control={
          <Switch
            name='alkohol'
            color='primary'
            onChange={handleChangeSwitch}
            checked={currentIngredient.alkohol}
          />}>
      </FormControlLabel>
      <div className='ingredient-form__size-info'>
        <TextField
          type='number'
          name='size_ingredient'
          onChange={handleChange}
          label='wigth of ingredient'
          value={currentIngredient.size_ingredient}
        />
        <Autocomplete
          options={[
            'ml',
            'drop',
            'gram',
            'piece',
            'tea spoon',
            'table spoon',
          ]}
          onChange={handleChangeAutocomtete}
          getOptionLabel={(options) => options}
          value={currentIngredient.measure_ingredient}
          renderInput={(params) => (<TextField {...params} label='measure of ingredient' />)}
        />
      </div>
    </>
  )
};

export default memo(IngredientsForm);