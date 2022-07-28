const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // База не открывается
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')

        db.run(`CREATE TABLE articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            description text, 
            miniDescription text,
            image text, 
            categoryId VARCHAR(1),
            countOfLikes INTEGER,
            countOfDislikes INTEGER,
            countOfSmiles INTEGER
            )`,
            (err) => {
                if (err) {
                    // Таблица создана
                }else{
                    // Добавим несколько строк
                    let insert = 'INSERT INTO articles (title, description, miniDescription, image, categoryId) VALUES (?,?,?,?,?)'
                    db.run(insert, ["Статья 1","Описание 5","просто 5","C:/images", "1"]);
                    db.run(insert, ["Статья 2","Описание 2","просто 2","C:/images", "2"]);
                    db.run(insert, ["Статья 3","Описание 3","просто 3","C:/images", "3"]);
                    db.run(insert, ["Статья 4","Описание 4","просто 4","C:/images", "4"]);
                    db.run(insert, ["Статья 5","Описание 5","просто 5","C:/images", "1"]);
                }
            });
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName text,
            password text,
            role text
            )`,
            (err) => {
                if (err) {
                    // Таблица создана
                }else{
                    // Добавим несколько строк
                    let insert = 'INSERT INTO users (userName, password, role) VALUES (?,?,?)'
                    db.run(insert, ["admin","admin","admin"]);
                    db.run(insert, ["user1","user1","user"]);
                    db.run(insert, ["user2","user2","user"]);
                }
            });
        db.run(`CREATE TABLE reactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            articleId INTEGER,
            typeOfReaction text,
            value text,
            userName text,
            countOfLikes INTEGER,
            countOfDislikes INTEGER,
            countOFSmiles INTEGER
            FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE            
            )`,
            (err) => {
                if (err) {
                    // Таблица создана
                }else{
                    // Добавим несколько строк
                    let insert = 'INSERT INTO reactions (articleId, typeOfReaction, value, userName) VALUES (?,?,?)'
                    db.run(insert, [41, "like", "", "user1"]);
                }
            });
    }
});
module.exports = db;

