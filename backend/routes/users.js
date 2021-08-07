const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers')


router.post('/signup', usersControllers.signUp);
router.post('/signin', usersControllers.signIn);

module.exports = router;
