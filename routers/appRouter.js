const express = require('express');
const appController = require('../controllers/appController');
const productRouter = require('./productRouter');

const router = express.Router();

router.get('/', appController.home);
router.use('/products', productRouter);

module.exports = router;
