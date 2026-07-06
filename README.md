# Library API

A REST API to manage library books built with Node.js, Express.js and MongoDB.
Includes Joi validation and global error handling.

## Features
- Full CRUD for books
- Search books by title
- Filter books by genre
- Request validation with Joi
- Global error handling
- Custom AppError class

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /books                 - Add a book
- GET    /books                 - Get all books
- GET    /books/:id             - Get a book by ID
- PUT    /books/:id             - Update a book
- DELETE /books/:id             - Delete a book
- GET    /books/search?title    - Search by title
- GET    /books/filter/:genre   - Filter by genre