const express = require('express');
const router = express.Router();

const usersControllers= require('../controllers/usersControllers')


router.post('/signup', usersControllers.signUp)

module.exports = router;
