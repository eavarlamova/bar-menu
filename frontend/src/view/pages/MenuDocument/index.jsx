import { memo } from "react";
import { useSelector } from "react-redux";

import { Card, CardHeader, Typography } from "@material-ui/core";

import { parseIngredients } from "../../../helpers/parse";


const MenuDocument = (props) => {
  const {
    // products, // [{product, ingredients, step, photo, descriptions},{}]
    // targetInfo, // userInfo or ingredientInfo:  {name, descriptions} ... desriptions is email and alco
    // target = 'user', // user, ingredient, productThatYouHave,

    match: { params: { id } }
  } = props;

  const { selectedUserData } = useSelector(state => state.users);
  console.log('selectedUserData', selectedUserData)
  //     const currentUserProducts = allProducts.filter(product => Number(product.users_id) === Number(id))
  // console.log('currentUserProducts', currentUserProducts)

  const getIngredientsFieldListForRender = (JSONstringIngredientsArray) => {
    const ingredientsArray = parseIngredients(JSONstringIngredientsArray)
    return ingredientsArray.map(item =>
      <Typography
        variant='body2'
        className='menu__ingredient'
      >
        {item.name_ingredient} {
          (item.size_ingredient && item.measure_ingredient)
            ?
            `- ${item.size_ingredient} ${item.measure_ingredient}`
            :
            ''
        }
      </Typography>
    );
  };


  return (
    <>
      <Typography
        variant='h3'
        align='center'
      >
        it`s <b>{selectedUserData.name}`s</b> menu
      </Typography>

      {
        selectedUserData.products.map(({
          step,
          photo,
          product,
          ingredients,
          descriptions,
        }) => (
          <Card >
            <CardHeader
              title={product}
              subheader={getIngredientsFieldListForRender(ingredients)}
            />
          </Card>
        ))
      }
    </>
  )
};

export default memo(MenuDocument);