const express = require('express'),
      router = express.Router();
 let db = require('../db');


router.post('/api/article',(req, res) => {
    let sql = `INSERT INTO articles(title, description, miniDescription, image, categoryId) VALUES(${Object.values(req.body)[0]})`;
    db.run(sql,(err) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
    })
})

router.get('/api/getArticleIdByTitle/:title', (req, res) => {
    let sql = `select * from articles where title = "${req.params.title}"`;
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        row ? res.send(row) : res.status(404).send({error: 'Article with given ID was not found'});
    });
})


router.get('/api/article/:id', (req, res) => {
    let sql = "select * from articles where id = " + req.params.id;
    // let sql = `select articles.*, reactions.value from articles, reactions where reactions.articleId = articles.id and articles.id = 41`;
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        row ? res.send(row) : res.status(404).send({error: 'Article with given ID was not found'});
    });
});

router.delete('/api/article/:id', (req, res) => {
    let sql = `DELETE FROM articles where id = ${req.params.id}`;
    db.run(sql,(err) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
    })
});

router.put('/api/article/33', (req, res) => {
    let sql = `UPDATE reactions SET countOfLikes = ${req.body.countOfLikes}, countOfDislikes = ${req.body.countOfDislikes}, countOfSmiles = ${req.body.countOfSmiles} where articleId = ${req.body.articleId}`;
    db.run(sql,(err) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
    })
});


router.post('/api/addComment',(req, res) => {
    let sql = `INSERT INTO reactions(articleId, typeOfReaction, value, userName) VALUES(${Object.values(req.body)[0]})`;
    db.run(sql,(err) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
    })
})

router.post('/api/addReactions',(req, res) => {
    let sql = `INSERT INTO reactions(articleId, typeOfReaction, countOfLikes, countOfDislikes, countOfSmiles) VALUES(${Object.values(req.body)[0]})`;
    // eslint-disable-next-line no-console
    console.log(sql)
    db.run(sql,(err) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
    })
})

router.get('/api/reactions/:articleId', (req, res) => {
    let sql = `select * from reactions where articleId = ${req.params.articleId}`;
    db.all(sql, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        // let article = row.find(article => article.id === req.params.id);
        row ? res.send(row) : res.status(404).send({error: 'Reaction with given ID was not found'});
    });
});


module.exports = router;