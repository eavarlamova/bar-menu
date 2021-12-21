import { memo } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import { parseIngredients } from "../../../helpers/parse";

import './index.scss';
import PDFDownload from "../../components/PDFDownload";


const MenuDocument = (props) => {
  const {
    // products, // [{product, ingredients, step, photo, descriptions},{}]
    // targetInfo, // userInfo or ingredientInfo: {name, descriptions} ... desriptions is email and alco
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
    <div className='menu' id='menu-for-pdf'>
      <PDFDownload author={selectedUserData.name}>
        download menu
      </PDFDownload>

      <Typography
        variant='h3'
        align='center'
        id={`menu-for-pdf-1`}
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
        }, index) => (
          <Card className='menu__card' id={`menu-for-pdf-${index + 2}`} >
            <CardHeader
              title={product}
              subheader={getIngredientsFieldListForRender(ingredients)}
            />
            <CardMedia
              className='menu__photo'
              image={photo || 'https://loremflickr.com/g/320/240/cockail'}
              title={`drink ${product}`}
            />
            <CardContent> {descriptions}</CardContent>
          </Card>
        ))
      }
    </div>
  )
};

export default memo(MenuDocument);