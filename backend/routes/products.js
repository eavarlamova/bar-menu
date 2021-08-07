const express = require('express');
const router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.post('/add', productsControllers.add);

module.exports = router;