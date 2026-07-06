const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { bookSchema } = require('../validators/bookValidator');

const { addBook, getAllBooks, getBookById, updateBook, deleteBook, searchBookByTitle, filterBooksByGenre } = require('../controllers/bookController');

router.post('/', validate(bookSchema), addBook);
router.get('/search', searchBookByTitle);
router.get('/filter', filterBooksByGenre);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', validate(bookSchema), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;