const express = require("express");
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-category', CategoryController.createCategory)
router.put('/update-category/:id', authMiddleWare, CategoryController.updatedCategory)
router.get('/get-details-category/:id', CategoryController.getDetailsCategory)
router.delete('/delete-category/:id', authMiddleWare, CategoryController.deleteCategory)
router.get('/get-all-category', CategoryController.getAllCategory)

module.exports = router