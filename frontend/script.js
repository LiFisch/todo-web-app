// reference to DOM (Document Object Model) elements
var todoField = document.getElementById("todoField");
var todoList = document.getElementById("todoList");
var addBtn = document.getElementById("addBtn");

// backend API endpoint
var API_URL = "http://localhost:3000/tasks";

// create a task element in the DOM
function createTaskElement(task) {
    var li = document.createElement("li");

    // create checkbox and set its checked state based on task.done
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    // create text node for the task description
    var textNode = document.createTextNode(" " + task.text + " ");

    // create delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    // checkbox listener: update task completion in backend
    checkbox.addEventListener("change", function() {
        fetch(API_URL + "/" + task.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: this.checked })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
        });

        // update the DOM styling immediately
        if (this.checked) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        } else {
            li.style.textDecoration = "none";
            li.style.opacity = "1";
        }
    });

    // delete listener: remove task from backend and from the DOM
    deleteBtn.addEventListener("click", function() {
        fetch(API_URL + "/" + task.id, { method: "DELETE" })
            .then(function(response) {
                if (response.ok) {
                    li.remove();
                }
            });
    });

    // assemble the task element
    li.appendChild(checkbox);
    li.appendChild(textNode);
    li.appendChild(deleteBtn);

    // if task is already marked as done, apply crossed-out and faded style
    if (task.done) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
    }

    // add task element to the list
    todoList.appendChild(li);
}

// load all tasks from the backend and display them
function loadTasks() {
    fetch(API_URL)
        .then(function(response) { return response.json(); })
        .then(function(tasks) {
            todoList.innerHTML = "";
            for (var i = 0; i < tasks.length; i++) {
                createTaskElement(tasks[i]);
            }
        });
}

// add a new task by sending it to the backend and updating the DOM
function addTodo() {
    var value = todoField.value.trim();
    if (!value) return;

    // send new task to backend
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value })
    })
        .then(function(response) { return response.json(); })
        .then(function(task) {
            // add task to DOM
            createTaskElement(task);
            // clear input field
            todoField.value = "";
        });
}

// event: add task when user presses enter
todoField.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTodo();
});

// event: add task when user clicks add button
addBtn.addEventListener("click", function() {
    addTodo();
});

// initial load of tasks when page is opened
loadTasks();
