const express = require('express');
const router = express.Router();

const upload = require('../upload/imagesPost');
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.getAllProducts);
router.delete('/:id', productsControllers.deleteProduct);
router.get('/:id', productsControllers.getUsersProducts);
router.post('/add', upload.single('photo'), productsControllers.addProduct);
router.put('/edit-product', upload.single('photo'), productsControllers.editProduct);

module.exports = router;