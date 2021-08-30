const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers')

router.get('/check/:jwt', usersControllers.checkJWT);
router.post('/signup', usersControllers.signUp);
router.post('/signin', usersControllers.signIn);
router.get('/signout/:jwt', usersControllers.signOut)
router.patch('/add-ingredient', usersControllers.addIngredient);

module.exports = router;
