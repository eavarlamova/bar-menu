export const parseIngredients = (productsArray) => {
    return JSON.parse(productsArray)
    // return (productsArray).map(product=> ({...product, ingredients: JSON.parse(productsArray.ingredients)}));
}