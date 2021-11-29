require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;
const db = require("./db");

app.get("/", (req, res) => {
    res.send("Welcome to To Do List Manager");
});

app.get("/tasks", (req, res) => {
    const query = "SELECT * FROM ToDoList ORDER BY Task_ID";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(400).send("Error retrieving tasks");
        }
        res.send(rows);
    });
});

app.post("/tasks", (req, res) => {
    const query = "INSERT INTO ToDoList (TaskName) VALUES (?)";
    db.run(query, [req.body.task], (err, row) => {
        if (err) {
            res.status(400).send("Error adding task");
        }
        res.send("Successfully added task");
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
