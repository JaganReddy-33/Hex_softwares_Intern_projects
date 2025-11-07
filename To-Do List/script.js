const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Initial sample tasks
let tasks = ["Eat breakfast", "Take a shower", "Go to gym"];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => removeTask(index);

    const upBtn = document.createElement("button");
    upBtn.classList.add("move-button");
    upBtn.textContent = "⬆";
    upBtn.onclick = () => moveTaskUp(index);

    const downBtn = document.createElement("button");
    downBtn.classList.add("move-button");
    downBtn.textContent = "⬇";
    downBtn.onclick = () => moveTaskDown(index);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(upBtn);
    li.appendChild(downBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function moveTaskUp(index) {
  if (index > 0) {
    [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
    renderTasks();
  }
}

function moveTaskDown(index) {
  if (index < tasks.length - 1) {
    [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    renderTasks();
  }
}

// Event listener
addBtn.addEventListener("click", addTask);
renderTasks();
