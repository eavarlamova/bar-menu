import React, {
  memo,
  useState,
  useEffect,
} from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  Chip,
  Grid,
  Button,
  Tooltip,
  TextField,
  Typography,
} from "@material-ui/core";
import { HighlightOff as HighlightOffIcon } from "@material-ui/icons";

import EditModal from "../EditModal";
import DropZoneFiles from "../DropzoneFiles";

import {
  addProduct,
  editProduct
} from "../../../stores/actions/products";

import "./index.scss";

const initialProduct = {
  product: "",
  steps: "",
  descriptions: "",
  ingredients: {
    all: [
      // { name_ingredient: 'ing1', id: 'ing-1' },
      // { name_ingredient: 'ing2', id: 'ing-2' }
    ],
    current: "",
  } /* [
                                        {
                                          name_ingredient: 'ice',
                                          size_ingredient: 40, 
                                          measure_ingredient: 'gram',
                                          alkohol: false,
                                        }, 
                                        {}
                                      ] */,
};

const validateProduct = ({
  id,
  steps,
  photo,
  product,
  ingredients,
  descriptions,
}) => ({
  id,
  photo,
  steps: steps.trim(),
  product: product.trim(),
  descriptions: descriptions.trim(),
  ingredients: JSON.stringify(ingredients.all),
});


const AddingProductsForm = (props) => {
  const dispatch = useDispatch();
  const {
    editableProduct,
    actionType = "add",
  } = props;
  const { id: users_id } = useSelector((state) => state.users.user);
  const { error: productsError } = useSelector((state) => state.products);

  const [photo, setPhoto] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [editableIngredient, setEditableIngredient] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  useEffect(() => {
    if (editableProduct) {
      if (actionType === "edit") {
        setCurrentProduct({
          ...editableProduct,
          ingredients: {
            all: JSON.parse(editableProduct.ingredients),
          },
          current: "",
        });
      }
    }
  }, [editableProduct]);

  const handleChangeModal = (ingredient) => {
    ingredient && setEditableIngredient(ingredient);
    setModalState(!modalState);
  };

  const handleChange = ({ target: { value, name } }) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const saveIngredient = ({ key }) => {
    if (key === "," || key === "Enter") {
      const newIngredient = currentProduct.ingredients.current
        .trim()
        .toLocaleLowerCase();
      if (newIngredient) {
        setCurrentProduct({
          ...currentProduct,
          ingredients: {
            all: [
              ...currentProduct.ingredients.all,
              {
                name_ingredient: newIngredient,
                id: `ing-${Math.random()}`,
              },
            ],
            current: "",
          },
        });
      }
    }
  };

  const handleChangeIngredients = ({ target: { value } }) => {
    const valideValue = value.replace(/[,\n]+/g, "");
    setCurrentProduct({
      ...currentProduct,
      ingredients: {
        ...currentProduct.ingredients,
        current: valideValue,
      },
    });
  };

  const editIngredient = (updateIngredient) => {
    const updateName = updateIngredient.name_ingredient.trim();
    if (updateName) {
      const updateAllIngredients = currentProduct.ingredients.all
        .map((item) => {
          if (item.id === updateIngredient.id)
            return {
              ...updateIngredient,
              name_ingredient: updateName,
            };
          return { ...item };
        }
        );
      setCurrentProduct({
        ...currentProduct,
        ingredients: {
          ...currentProduct.ingredients,
          all: updateAllIngredients,
        },
      });
      handleChangeModal(null);
    }
  };

  const saveProduct = () => {
    const correctProduct = validateProduct(currentProduct);
    const {
      product,
      ingredients,
    } = correctProduct;
    if (users_id && product && ingredients) {
      const updatePhoto = photo || correctProduct.photo;
      const updateProduct = {
        ...correctProduct,
        users_id,
        ingredients,
        photo: updatePhoto,
      };
      if (actionType === "add") {
        dispatch(addProduct(updateProduct));
      }
      else if (actionType === "edit") {
        dispatch(editProduct(updateProduct));
      }
    }
  };

  const deleteIngredient = (ingredientId) => {
    const allIngredientsUpdate = currentProduct.ingredients.all
      .filter((item) => item.id !== ingredientId);
    setCurrentProduct({
      ...currentProduct,
      ingredients: {
        ...currentProduct.ingredients,
        all: allIngredientsUpdate,
      },
    });
  };

  return (
    <>
      <Typography
        align="center"
        color="primary"
        variant="h6"
      >
        {`${actionType} your product now`.toUpperCase()}
      </Typography>
      {[
        "product",
        "descriptions",
        "ingredients",
        "steps"
      ].map((item) => item === "ingredients"
        ?
        (
          <Grid
            container
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              className="adding-form_input-ingredients"
            >
              <TextField
                fullWidth
                multiline
                type={item}
                name={item}
                label={item}
                id={`${item}-input`}
                onKeyDown={saveIngredient}
                onChange={handleChangeIngredients}
                value={currentProduct.ingredients.current}
              />
            </Grid>
            {currentProduct.ingredients.all.length
              ?
              (
                <Grid
                  item
                  fullWidth
                  className="adding-form_ready-ingredients"
                >
                  {currentProduct.ingredients.all.map((item) => {
                    return (
                      <Tooltip title={`edit ${item.name_ingredient}`}>
                        <Chip
                          variant="outlined"
                          label={item.name_ingredient}
                          style={{ maxWidth: "200px" }}
                          onDelete={() => {
                            deleteIngredient(item.id);
                          }}
                          onClick={() => {
                            handleChangeModal(item);
                          }}
                          deleteIcon={<HighlightOffIcon />}
                          color={item.alkohol ? "primary" : "ligth"}
                        />
                      </Tooltip>
                    );
                  })}
                </Grid>
              ) : (
                ""
              )}
          </Grid>
        ) : (
          <TextField
            fullWidth
            multiline
            type={item}
            name={item}
            label={item}
            id={`${item}-input`}
            onChange={handleChange}
            value={currentProduct[item]}
          />
        )
      )}
      <DropZoneFiles setFile={setPhoto} />
      <Button
        fullWidth
        onClick={saveProduct}
      >
        {actionType} product
      </Button>
      {productsError ? (
        <Typography
          color="error"
          align="center"
        >
          {productsError.msg}
        </Typography>
      ) : (
        ""
      )}
      <EditModal
        modalState={modalState}
        editIngredient={editIngredient}
        handleChangeModal={handleChangeModal}
        editableIngredient={editableIngredient}
      />
    </>
  );
};

export default memo(AddingProductsForm);
