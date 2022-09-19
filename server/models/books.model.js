const mongoose = require('mongoose');

const Book = new mongoose.Schema(
    {
        isbn: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        available: { type: Boolean, default: true, required: true },
    },
    { collection: 'books-data' }
);

const model = mongoose.model('BookData', Book);

module.exports = model;
