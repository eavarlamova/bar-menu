import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  Grid,
  Avatar,
  Button,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import { parseIngredients } from '../../../helpers/parse';
import { deleteProduct } from '../../../stores/actions/products';
import EditModal from '../EditModal';
import { Link } from "react-router-dom";


const getButton = (name, action = null, userId) => {
  return (
    action
      ?
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        onClick={() => { action() }}
      >
        {name}
      </Button>
      :
      <Link to={`/user/${userId}`}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
        >
          {name}
        </Button>
      </Link>
  )
};
const getButtonsContent = (
  nameFirstButton,
  nameSecondButton,
  actionFirstButton,
  actionSecondButton,
  userId = null,
) => (
  <Grid container spacing={1}>
    <Grid item xs={6}>
      {getButton(nameFirstButton, actionFirstButton, userId)}
    </Grid>
    <Grid item xs={6}>
      {getButton(nameSecondButton, actionSecondButton)}
    </Grid>

  </Grid>
);


const ProductsList = ({ products, target = 'personal' }) => {
  // const { productsFromStore } = useSelector(state => state.products)
  // const errorGettingUsersProducts = useSelector(state => state.products.error)
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null)

  const handleChangeModal = (product) => {
    product && setEditableProduct(product)
    setModalState(!modalState)
  };


  const getIngredientsFieldListForRender = (JSONstringIngredientsArray) => {
    const ingredientsArray = parseIngredients(JSONstringIngredientsArray)
    return ingredientsArray.map(item =>
      <Typography
        variant='body2'
        className={`${target}__ingredient`}
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

  const deleteCurrentProduct = (id) => {
    dispatch(deleteProduct(id));
  }


  return (
    <>
      {
        products.length
          ?
          products.map(item => {
            return (
              <Card>
                <CardHeader
                  avatar={
                    (item.author && item.author.avatar)
                      ?
                      <Avatar>{item.author.avatar}</Avatar>
                      :
                      <Avatar>{(item.author && item.author.name) ? item.author.name[0] : item.users_id}</Avatar>
                  }
                  title={item.product}
                  subheader={getIngredientsFieldListForRender(item.ingredients)}
                />
                <CardMedia
                  className={`${target}__photo`}
                  image={item.photo || 'https://loremflickr.com/g/320/240/cockail'}
                  title={`drink ${item.product}`}
                />
                <CardContent>
                  {item.descriptions}
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.steps}
                  </Typography>
                </CardContent>
                <CardActions>
                  {
                    target === 'personal'
                      ?
                      getButtonsContent(
                        'edit',
                        'delete',
                        handleChangeModal.bind(null, item),
                        deleteCurrentProduct.bind(null, item.id)
                      )
                      // <Grid container spacing={1}>
                      //   <Grid item xs={6}>
                      //     <Button
                      //       fullWidth
                      //       variant="outlined"
                      //       color="primary"
                      //       onClick={() => { handleChangeModal(item) }}
                      //     >
                      //       edit
                      //     </Button>
                      //   </Grid>
                      //   <Grid item xs={6}>
                      //     <Button
                      //       fullWidth
                      //       variant="outlined"
                      //       color="primary"
                      //       onClick={() => { deleteCurrentProduct(item.id) }}
                      //     >
                      //       delete
                      //     </Button>
                      //   </Grid>

                      // </Grid>
                      :
                      getButtonsContent(
                        'open author page',
                        'add in favorite',
                        null,
                        () => { alert('need write function for add in favorite') },
                        item.users_id,
                      )
                  }
                </CardActions>
              </Card>
            )
          })
          :
          ''
      }

      <EditModal
        modalState={modalState}
        // editableIngredient={editableIngredient}
        handleChangeModal={handleChangeModal}
        // editIngredient={editIngredient}
        target='product'
        editableProduct={editableProduct}

      />
    </>
  )
};

export default memo(ProductsList)