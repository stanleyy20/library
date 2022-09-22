const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const pool = require('./connection.js');
const unique_id = require('unique-id-key');

app.use(cors());
app.use(express.json());

const authUser = (permission) => {
    return (req, res, next) => {
        const userRole = req.body.userRole;
        if (permission.includes(userRole)) {
            next();
        } else {
            return res.status(401).json('yoy dont have permission ');
        }
    };
};

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newPassword = await bcrypt.hash(password, 10);

        pool.query(
            `INSERT INTO public.users(name, email, password, role) 
                       values($1,$2,$3,$4)`,
            [name, email, newPassword, role]
        );
        res.json({ status: 'ok' });
    } catch (err) {
        es.json({ status: 'error', message: 'duplicate email' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(`SELECT * FROM public.users WHERE email= $1`, [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: 'email is incorrect' });
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Incorrect password' });
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    email: email,
                },
                'secret123'
            );
            return res.json({ status: 'ok', user: token, password: isPasswordValid });
        }
    } catch (error) {
        res.json({ status: 'error', message: 'Invalid login', user: false });
    }
});

app.get('/api/auth', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = await decoded.email;
        const user = await pool.query(`SELECT * FROM public.users WHERE email= $1`, [email]);
        const { name, role, user_id } = user.rows[0];

        return res.json({ status: 'ok', name: name, role: role, user_id: user_id });
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' });
    }
});

app.get('/api/books', (req, res) => {
    pool.query(`Select * from books`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
});

app.post('/api/book', authUser(['admin']), async (req, res) => {
    const { isbn, title, author } = req.body;
    const available = true;
    const book_id = unique_id.RandomNum(5);
    try {
        pool.query(
            `INSERT INTO public.books(book_id, title, author, isbn, available) 
                       values($1,$2,$3,$4,$5)`,
            [book_id, title, author, isbn, available]
        );
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate isbn' });
    }
});

app.delete('/api/book/:id', authUser(['admin']), async (req, res) => {
    try {
        const { id } = req.body;
        await pool.query(`DELETE FROM public.books WHERE book_id= $1`, [id]);

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.put('/api/book/:id', authUser(['admin']), async (req, res) => {
    try {
        const { editBookId, title, author, isbn } = req.body;
        const available = true;

        if (!editBookId || !title || !author || !isbn) {
            res.status(400).json({
                message: 'Not all information',
            });

            return;
        }
        await pool.query(`UPDATE public.books SET  title=$1, author=$2, isbn=$3, available=$4 WHERE isbn=$5 `, [
            title,
            author,
            isbn,
            available,
            editBookId,
        ]);

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.put('/api/available/:id', authUser(['user']), async (req, res) => {
    const { bookID, available } = req.body;

    try {
        await pool.query(`UPDATE public.books SET available=$1 WHERE book_id=$2 `, [available, bookID]);
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.post('/api/issue', authUser(['user']), async (req, res) => {
    const { userID, bookID } = req.body;
    try {
        pool.query(
            `INSERT INTO public.issue(book_id, user_id) 
                       values($1,$2)`,
            [bookID, userID]
        );
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate isbn' });
    }
});

app.get('/api/issue', async (req, res) => {
    pool.query(`Select * from issue`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
});

app.delete('/api/issue/:id', authUser(['user']), async (req, res) => {
    const { bookID } = req.body;
    try {
        await pool.query(`DELETE FROM public.issue WHERE book_id= $1`, [bookID]);

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.listen(1337, () => {
    console.log('Start server 0 1337');
});
