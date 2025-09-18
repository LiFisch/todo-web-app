// import required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// create express application
const app = express();
const PORT = 3000;

// path to the JSON file storing tasks
const dataFile = path.join(__dirname, "tasks.json");

// middleware to parse JSON request and handle CORS
app.use(bodyParser.json());
app.use(cors());

// function to read tasks from JSON file
function readTasks() {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
}

// function to write tasks to JSON file
function writeTasks(tasks) {
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

// get all tasks
app.get("/tasks", function(req, res) {
    var tasks = readTasks();

    // convert "completed" property to "done" if needed
    for (var i = 0; i < tasks.length; i++) {
        if (typeof tasks[i].done === "undefined" && typeof tasks[i].completed !== "undefined") {
            tasks[i].done = tasks[i].completed;
            delete tasks[i].completed;
        }
    }

    // update JSON file in case of conversion
    writeTasks(tasks);

    // send tasks as JSON response
    res.json(tasks);
});

// add a new task
app.post("/tasks", function(req, res) {
    const tasks = readTasks();
    // create new task object with unique id
    const newTask = {
        id: Date.now(),
        text: req.body.text,
        done: false
    };
    // add new task to the list
    tasks.push(newTask);
    // save updated list to JSON file
    writeTasks(tasks);
    // respond with the new task
    res.json(newTask);
});

// delete a task by id
app.delete("/tasks/:id", function(req, res) {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id, 10);
    // filter out the task to delete
    const updatedTasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });
    // save updated list
    writeTasks(updatedTasks);
    // respond with success message
    res.json({ success: true });
});

// update task done/undone status
app.patch("/tasks/:id", function(req, res) {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id, 10);
    var task = null;
    
    // find the task with the given id
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            task = tasks[i];
            break;
        }
    }
    if (task) {
        // update the done property based on request
        task.done = req.body.done === true || req.body.done === "true";
        // save updated tasks
        writeTasks(tasks);
        // respond with updated task
        res.json(task);
    } else {
        // if task not found, respond with 404
        res.status(404).json({ error: "Task not found" });
    }
});

// start the server and listen on the specified port
app.listen(PORT, function() {
    console.log("Server is running at http://localhost:" + PORT);
});

