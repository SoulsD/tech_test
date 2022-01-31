import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const HTTP_PORT = 8000;
const DB_SOURCE = 'D:\\tmp yubo\\db.sqlite';


let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err;
    }
});


const app = express();
app.use(cors());

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({ 'message': 'Ok' })
});


app.get('/api/users', (req, res, next) => {
    const sql = 'select * from users';
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
      });
});

app.get('/api/user/:id', (req, res, next) => {
    const sql = 'select * from users where id = ?';
    const params = [req.params.id];

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row,
        });
      });
});

app.get('/api/messages/from/:id', (req, res, next) => {
    const sql = 'select * from messages where senderId = ?';
    const params = [req.params.id];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
      });
});

app.get('/api/messages/to/:id', (req, res, next) => {
    const sql = 'select * from messages where receiverId = ?';
    const params = [req.params.id];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
      });
});

app.get('/api/user/media/:id', (req, res, next) => {
    const sql = 'select * from media where userId = ?';
    const params = [req.params.id];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
      });
});

app.post('/api/user/deactivate/:id', (req, res, next) => {
    const sql = 'update users set isDeleted = 1 where id = ?';
    const params = [req.params.id];

    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
        });
      });
});

app.post('/api/user/activate/:id', (req, res, next) => {
    const sql = 'update users set isDeleted = NULL where id = ?';
    const params = [req.params.id];

    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            message: 'success',
        });
      });
});


// Default response for any other request
app.use((req, res) => {
    res.status(404);
});
