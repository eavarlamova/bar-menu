const express = require('express');
const router = express.Router();

const upload = require('../upload/imagesPost');
const productsControllers = require('../controllers/productsControllers');

router.post('/add', upload.single('photo'), productsControllers.addProduct);
router.get('/:id', productsControllers.getUsersProducts);
router.delete('/:id', productsControllers.deleteProduct);
router.put('/edit-product', productsControllers.editProduct);

module.exports = router;