const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.get('/books', libraryController.getAllBooks)
router.get('/members', libraryController.getAllMembers)
router.post('/borrow', libraryController.borrowBook)
router.post('/return', libraryController.returnBook)

module.exports = router;