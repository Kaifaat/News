const express = require('express'),
    router = express.Router();
let db = require('../db');


router.get('/api/articlesInvestments', (req, res, next) => {
    let sql = "select * from articles where categoryId = 1";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json(rows);
    });
});

router.get('/api/articlesSport', (req, res, next) => {
    let sql = "select * from articles where categoryId = 2";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json(rows);
    });
});

router.get('/api/articlesTechnology', (req, res, next) => {
    let sql = "select * from articles where categoryId = 3";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json(rows);
    });
});

router.get('/api/articlesRealEstate', (req, res, next) => {
    let sql = "select * from articles where categoryId = 4";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json(rows);
    });
});

router.get('/api/interview', (req, res, next) => {
    let sql = "select * from articles where categoryId = 5";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json(rows);
    });
});

router.get('/api/lastNewsMiddle', (req, res, next) => {
    let sql = "select * from articles where categoryId = 1 order by id DESC LIMIT 1";
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});

router.get('/api/lastNewsMiddle2', (req, res, next) => {
    let sql = "select * from articles where categoryId = 2 order by id DESC LIMIT 1";
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});


router.get('/api/lastNewsMiddle4', (req, res, next) => {
    let sql = "select * from articles where categoryId = 4 order by id DESC LIMIT 1";
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});

router.get('/api/lastInterview', (req, res, next) => {
    let sql = "select * from articles where categoryId = 5 order by id DESC LIMIT 1";
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});

router.get('/api/lastNewsTopRight', (req, res, next) => {
    let sql = "select * from articles where categoryId = 3  order by id DESC LIMIT 6";
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});

router.post('/api/login', (req, res, next) => {
    let sql = `select * from users where userName = '${req.body.userName}'`;
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});

router.post('/api/registration', (req, res, next) => {
    let sql = `INSERT INTO users(userName, password, role) VALUES(${Object.values(req.body)[0]}, 'user')`;
    db.run(sql, (err, row) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.send(row);
    });
});

module.exports = router;
