const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    config = require('config'),
    app = express();

let md5 = require("md5");
let db = require('./db');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(
    require(config.get('routes.articles')),
    require(config.get('routes.article'))
);


// app.get("/api/articles5", (req, res, next) => {
//     let sql = "select * from articles";
//     let params = [];
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//     });
// });

app.listen(3010, () => console.log('Server has been started...'));

