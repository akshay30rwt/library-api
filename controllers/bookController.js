const Book = require('../models/Book');
const AppError = require('../utils/AppError');

const addBook = async (req, res, next) => {
    try {
        const { title, author, genre, year, pages } = req.body;

        const book = new Book({ title, author, genre, year, pages });
        await book.save;

        return res.status(201).json({
            message: 'Book added to library',
            book
        });
    }
    catch(error) {
        next(error);
    }
}

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        if(books.length === 0) {
            throw new AppError('Library is empty', 404);
        }

        return res.status(200).json(books);
    }
    catch(error) {
        next(error);
    }
}

const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if(!book) {
            throw new AppError(`There is no book with ID: ${id}`, 404);
        }

        return res.status(200).json(book);
    }
    catch(error) {
        next(error);
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, genre, year, pages } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, year, pages }, { new: true, runValidators: true });

        if(!updatedBook) {
            throw new AppError(`There is no book with ID: ${id}`, 404);
        }

        return res.status(200).json({
            message: 'Book updated successfully',
            updatedBook
        });
    }
    catch(error) {
        next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if(!deletedBook) {
            throw new AppError(`There is no book with ID: ${id}`, 404);
        }

        return res.status(200).json({
            message: 'Book deleted from library', 
            deletedBook
        });
    }
    catch(error) {
        next(error);
    }
}

const searchBookByTitle = async (req, res, next) => {
    try {
        const { title } = req.query;

        const book = await Book.find({
            title: { $regex: title, $options: i }
        });

        if(!book) {
            throw new AppError(`There is no book with Title: ${title}`, 404);
        }

        return res.status(200).json(book);
    }
    catch(error) {
        next(error);
    }
}

const filterBooksByGenre = async (req, res, next) => {
    try {
        const { genre } = req.query;
        const books = await Book.find({ genre });

        if(books.length === 0) {
            throw new AppError(`There are no books in ${genre} genre`, 404);
        }

        return res.status(200).json(books);
    }
    catch(error) {
        next(error);
    }
}

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook, searchBookByTitle, filterBooksByGenre };