#!/usr/bin/env node
const axios = require("axios");
const displayTask = () => {
    axios
        .get("http://localhost:3000/tasks")
        .then((res) => {
            tasks = res.data;
            console.table(tasks);
        })
        .catch((err) => {
            console.log("Error loading tasks");
        });
};

const addTask = (newTask) => {
    axios
        .post("http://localhost:3000/tasks", {
            task: newTask,
        })
        .catch((err) => {
            console.log("Task was not added, please try again!");
        });
};

const displayCorrectFormat = () => {
    console.log(`
    Main usage

    To get list of task:
        warden rollcall

    To add new Task
        warden enroll <task name>
    `);
};

// --------------------- Handling different commands ---------------------
const args = process.argv.slice(2);
if (args.length > 2) {
    displayCorrectFormat();
    return;
}

if (args.length === 1) {
    if (args[0] !== "rollcall") {
        displayCorrectFormat();
        return;
    }
    displayTask();
} else if (args.length === 2) {
    if (args[0] !== "enroll") {
        displayCorrectFormat();
        return;
    }
    const newTask = args[1];
    addTask(newTask);
} else {
    displayCorrectFormat();
}
