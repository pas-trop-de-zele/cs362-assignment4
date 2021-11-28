const sqlite3 = require("sqlite3").verbose();
const db_name = "todoList.db";
const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Successful connection to the database ${db_name}`);
});

const sql_seed = `CREATE TABLE IF NOT EXISTS ToDoList (
    Task_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    TaskName VARCHAR(100) NOT NULL
);`;

db.run(sql_seed, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Database set up finished");
});

module.exports = db;
