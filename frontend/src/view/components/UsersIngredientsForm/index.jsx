import {
    memo,
    useState,
} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Grid,
    Typography,
} from '@material-ui/core';

import { addIngredient } from '../../../stores/actions/users';
import IngredientsForm from "../IngredientsForm";
import { Alert } from "@material-ui/lab";

const initialIngredient = {
    name_ingredient: '',
    size_ingredient: 0,
    measure_ingredient: '',
    alkohol: false,
};


const UsersIngredientsForm = () => {
    const dispatch = useDispatch();
    const { error: errorByAddingUsersIngredient } = useSelector(state => state.users)
    const [currentIngredient, setCurrentIngredient] = useState(initialIngredient);

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
                    name_ingredient: currentIngredientName
                }
            )
            );
        }
    };
console.log('#######', errorByAddingUsersIngredient, '#######')



    return (
        <Grid
            container
            direction='column'
        >
            add your ingredient
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
                errorByAddingUsersIngredient
                    ?
                    <Typography color='error' align='center'>
                        {errorByAddingUsersIngredient.msg}
                    </Typography>
                    :
                    ''
            }
            {/* {[
                { title: 'name of ingredient', key: 'name_ingredient' },
                { title: 'size of ingredient', key: 'size_ingredient' },
                { title: 'measure of ingredient', key: 'measure_ingredient' },
                { title: 'alkohol of ingredient', key: 'alkohol' },
            ].map(({ title, key }) => (

                <TextField
                    // id={`${name}-input`}
                    onChange={handleChange}
                    // onKeyDown={saveIngredient}
                    label={title}
                    // type={item}
                    name={key}
                    value={currentIngredient[key]}
                    fullWidth
                    multiline
                />
            ))} */}
        </Grid>
    )
}

export default memo(UsersIngredientsForm);