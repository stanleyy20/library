const mongoose = require('mongoose');

const Issue = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        returned: {
            type: Boolean,
            default: false,
        },
    },
    { collection: 'issue-data' }
);

const model = mongoose.model('IssueData', Issue);

module.exports = model;
