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
        currentIngredient,
        handleChange,
        handleChangeSwitch,
        handleChangeAutocomtete,
    } = props;

    return (
        <>
            <TextField
                label='name of ingredient'
                value={currentIngredient.name_ingredient}
                name='name_ingredient'
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
            <div className='ingredient-form__size-info'>
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
                        'piece',
                        'tea spoon',
                        'table spoon',
                    ]}
                    value={currentIngredient.measure_ingredient}
                    onChange={handleChangeAutocomtete}
                    getOptionLabel={(options) => options}
                    renderInput={(params) => (<TextField {...params} label='measure of ingredient' />)}
                />
            </div>
        </>
    )
};

export default memo(IngredientsForm);