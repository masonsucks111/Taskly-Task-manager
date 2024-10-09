
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function addTask() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    if (title && date) {
        const task = { title, desc, date, priority, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        clearForm();
    } else {
        alert("Please enter a task title and due date.");
    }
}


function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", task.priority.toLowerCase());
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
            <p><strong>Due:</strong> ${task.date}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <button class="complete" onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;
        if (task.completed) {
            taskDiv.style.textDecoration = "line-through";
            taskDiv.style.opacity = 0.6;
        }
        taskList.appendChild(taskDiv);
    });
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function clearForm() {
    document.getElementById("task-title").value = '';
    document.getElementById("task-desc").value = '';
    document.getElementById("task-date").value = '';
    document.getElementById("task-priority").value = 'High';
}

renderTasks();
