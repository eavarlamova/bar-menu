import { memo } from "react";
import { useSelector } from "react-redux";

import { Card, CardHeader, Typography } from "@material-ui/core";

import { parseIngredients } from "../../../helpers/parse";
import { Redirect } from "react-router";


const MenuDocument = (props) => {
  const {
    // products, // [{product, ingredients, step, photo, descriptions},{}]
    // targetInfo, // userInfo or ingredientInfo:  {name, descriptions} ... desriptions is email and alco
    // target = 'user', // user, ingredient, productThatYouHave,

    match: { params: { id } }
  } = props;
  const { selectedUserData } = useSelector(state => state.users);

  const getIngredientsFieldListForRender = (JSONstringIngredientsArray) => {
    const ingredientsArray = parseIngredients(JSONstringIngredientsArray)
    return ingredientsArray.reduce((str, item, index, { length }) => {
      const signFinish = length - 1 === index ? '.' : ', '
      str = str + item.name_ingredient + signFinish
      return str;
    },
      '');
  };

  if (!selectedUserData && id) return <Redirect to={`/user/${id}`} />
  if (!selectedUserData) return <Redirect to='/' />
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