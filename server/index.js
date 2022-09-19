const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Book = require('./models/books.model');
const Issue = require('./models/issue.model');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/library');

app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            role: req.body.role,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return { status: 'error', error: 'Invalid login' };
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        );
        return res.json({ status: 'ok', user: token });
    }

    if (!user) {
        res.json({ status: 'error', user: false });
    }
});

app.get('/api/user', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;

        const user = await User.findOne({ email: email });

        return res.json({ status: 'ok', name: user.name, role: user.role, _id: user._id });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' });
    }
});

app.get('/api/all-books', async (req, res) => {
    try {
        const books = await Book.find({});

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/book', async (req, res) => {
    const { isbn, title, author } = req.body;
    try {
        await Book.create({
            isbn: isbn,
            title: title,
            author: author,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate isbn' });
    }
});

app.delete('/api/book', async (req, res) => {
    try {
        const { id } = req.body;
        await Book.deleteOne({ _id: id });

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.post('/api/edit-book', async (req, res) => {
    try {
        const { editBookId, title, author, isbn } = req.body;
        const filter = { isbn: editBookId };
        const update = { title: title, author: author, isbn: isbn };
        if (!editBookId || !title || !author || !isbn) {
            res.status(400).json({
                message: 'Not all information',
            });

            return;
        }
        await Book.findOneAndUpdate(filter, update);

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.post('/api/available-book', async (req, res) => {
    const { bookID, available } = req.body;
    const filter = { _id: bookID };
    const update = { available: available };

    try {
        await Book.findOneAndUpdate(filter, update);
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.post('/api/borrowed-books', async (req, res) => {
    const { userID, bookID } = req.body;
    try {
        await Issue.create({
            user: userID,
            book: bookID,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate isbn' });
    }
});

app.get('/api/borrowed-books', async (req, res) => {
    try {
        const issue = await Issue.find({});

        res.json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/borrowed-books', async (req, res) => {
    const { bookID } = req.body;

    try {
        await Issue.findOneAndDelete({ book: bookID });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.listen(1337, () => {
    console.log('Start server 0 1337');
});
