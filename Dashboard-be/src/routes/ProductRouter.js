const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
// const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id', ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)
// router.get('/category/:category', ProductController.getProductsByCategory);
module.exports = router