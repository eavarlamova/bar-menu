import React, {
  memo,
  useState,
  useEffect,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { Link } from "react-router-dom";

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

import EditModal from '../EditModal';
import { parseIngredients } from '../../../helpers/parse';
import { deleteProduct } from '../../../stores/actions/products';


const getButton = (name, action = null, userId) => {
  return (
    action
      ?
      <Button
        fullWidth
        color="primary"
        variant="outlined"
        onClick={() => { action() }}
      >
        {name}
      </Button>
      :
      <Link to={`/user/${userId}`}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
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
  currentUserId,
) => {
  const flagForNotOvnerOfCurrentProduct = userId !== currentUserId;
  const updateNameFirstButton = userId && !flagForNotOvnerOfCurrentProduct ? 'look my page' : nameFirstButton
  return (
    <Grid container spacing={1}>
      <Grid item xs={flagForNotOvnerOfCurrentProduct ? 6 : 12}>
        {getButton(updateNameFirstButton, actionFirstButton, userId)}
      </Grid>
      <Grid item xs={flagForNotOvnerOfCurrentProduct ? 6 : 0}>
        {flagForNotOvnerOfCurrentProduct && getButton(nameSecondButton, actionSecondButton)}
      </Grid>
    </Grid>
  )
};


const ProductsList = ({ products, target = 'personal' }) => {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.users.user);
  const { selectedUserData } = useSelector(state => state.users);
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
                      <Avatar src={item.author.avatar} />
                      :
                      <Avatar src={
                        selectedUserData
                          ?
                          item.users_id === selectedUserData.id && selectedUserData.avatar
                          : null
                      }>
                        {
                          (item.author && item.author.name)
                            ?
                            item.author.name[0]
                            :
                            (selectedUserData && item.users_id === selectedUserData.id
                              ?
                              selectedUserData.name[0]
                              :
                              item.users_id
                            )
                        }
                      </Avatar>
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
                      :
                      getButtonsContent(
                        'open author page',
                        'add in favorite',
                        null,
                        () => { alert('need write function for add in favorite') },
                        item.users_id,
                        id,
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
        handleChangeModal={handleChangeModal}
        target='product'
        editableProduct={editableProduct}
      />
    </>
  )
};

export default memo(ProductsList)