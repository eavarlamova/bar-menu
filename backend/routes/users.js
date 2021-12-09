const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers')

router.get('/check/', usersControllers.checkJWT);
router.post('/signup', usersControllers.signUp);
router.post('/signin', usersControllers.signIn);
router.get('/:id', usersControllers.getUserInfo);
router.get('/signout/:jwt', usersControllers.signOut)
router.delete('/:id', usersControllers.deleteIngredient);
router.patch('/add-ingredient', usersControllers.addIngredient);
router.patch('/edit-ingredient', usersControllers.editIngredient);

module.exports = router;
