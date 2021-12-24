import React, {
  memo,
  useEffect,
} from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import {
  Link,
  Redirect,
} from "react-router-dom";

import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import { parseIngredients } from "../../../helpers/parse";
import { getUserInformation } from "../../../stores/actions/users";

import PDFDownload from "../../components/PDFDownload";

import './index.scss';


const MenuDocument = (props) => {
  const dispatch = useDispatch();
  const {
    match: { params: { id } }
  } = props;
  const { selectedUserData } = useSelector(state => state.users);

  useEffect(() => {
    if (!selectedUserData || Number(id) !== Number(selectedUserData.id)) dispatch(getUserInformation(id));
  }, [dispatch]);

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
    <div
      id='menu-for-pdf'
      className='menu'
    >
      {
        [
          {
            name: `go to ${selectedUserData.name}'s page`,
            link: `/user/${selectedUserData.id}`,
          },
          {
            name: `go to main page`,
            link: `/`,
          },
        ].map(({ name, link }) => (
          <Link to={link}>
            <Button
              fullWidth
              color='primary'
              variant='outlined'
            >
              {name}
            </Button>
          </Link>
        ))
      }

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
          photo,
          product,
          ingredients,
          descriptions,
        }, index) => (
          <Card
            className='menu__card'
            id={`menu-for-pdf-${index + 2}`}
          >
            <CardHeader
              title={product}
              subheader={getIngredientsFieldListForRender(ingredients)}
            />
            <CardMedia
              className='menu__photo'
              title={`drink ${product}`}
              image={photo || 'https://loremflickr.com/g/320/240/cockail'}
            />
            <CardContent> {descriptions}</CardContent>
          </Card>
        ))
      }
    </div>
  )
};

export default memo(MenuDocument);