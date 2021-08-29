import {
    memo,
    useState,
    useEffect,
} from "react"

import {
    Grid,
} from '@material-ui/core';

import IngredientsForm from "../IngredientsForm";

const initialIngredient = {
    name_ingredient: '',
    size_ingredient: 0,
    measure_ingredient: '',
    alkohol: false,
};


const UsersIngredientsForm = () => {
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

    // useEffect(() => {
    //     console.log('currentIngredient', currentIngredient)
    // }, [currentIngredient])


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