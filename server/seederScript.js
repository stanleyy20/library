const mongoose = require('mongoose');
const booksData = require('./data/books');
const Book = require('./models/books.model');

mongoose.connect('mongodb://localhost:27017/library');

const importData = async () => {
    try {
        await Book.deleteMany({});

        await Book.insertMany(booksData);

        console.log('Data import success');

        process.exit();
    } catch (error) {
        console.error('Error with data import');
        process.exit(1);
    }
};

importData();
