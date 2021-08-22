const express = require('express');
const router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.post('/add', productsControllers.addProduct);
router.get('/:id', productsControllers.getUsersProducts)
module.exports = router;