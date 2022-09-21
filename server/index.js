const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const pool = require('./connection.js');

app.use(cors());
app.use(express.json());


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
    const { name, email, password } = req.body;
    const user = await pool.query(`SELECT * FROM public.users WHERE email= $1`, [email]);

    if (user) {
        const isPasswordValid = bcrypt.compare(password, user.rows[0].password);
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    name: name,
                    email: email,
                },
                'secret123'
            );

            return res.json({ status: 'ok', user: token });
        }
    }

    if (!user) {
        res.json({ status: 'error', message: 'Invalid login', user: false });
    }
});

app.get('/api/users', (req, res) => {
    pool.query(`Select * from users`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
});

app.get('/api/user', async (req, res) => {
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

app.post('/api/book', async (req, res) => {
    const { isbn, title, author } = req.body;
    const available = true;
    try {
        pool.query(
            `INSERT INTO public.books(title, author, isbn, available) 
                       values($1,$2,$3,$4)`,
            [title, author, isbn, available]
        );
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate isbn' });
    }
});

app.delete('/api/book/:id', async (req, res) => {
    try {
        const { id } = req.body;
        await pool.query(`DELETE FROM public.books WHERE book_id= $1`, [id]);

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.put('/api/book/:id', async (req, res) => {
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

app.put('/api/available/:id', async (req, res) => {
    const { bookID, available } = req.body;

    try {
        await pool.query(`UPDATE public.books SET available=$1 WHERE book_id=$2 `, [available, bookID]);
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'something went wrong' });
    }
});

app.post('/api/issue', async (req, res) => {
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

app.delete('/api/issue/:id', async (req, res) => {
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
