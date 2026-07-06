const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/books', bookRoutes);
app.use(errorHandler);

//A common practice is to start the server only after MongoDB has connected successfully:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection failed', error);
    });
//This ensures your API doesn't accept requests before the database is ready.