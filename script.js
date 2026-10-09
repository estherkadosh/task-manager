const STORAGE_KEY = "simpleTaskManager.tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

let tasks = loadTasks();

function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage may be unavailable (e.g. private mode); the app still works in memory.
  }
}

function renderTasks() {
  list.innerHTML = "";

  for (const task of tasks) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark as completed");

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    li.append(checkbox, text, deleteBtn);
    list.appendChild(li);
  }

  emptyMessage.hidden = tasks.length > 0;
}

function update() {
  saveTasks();
  renderTasks();
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({ id: Date.now().toString(), text: trimmed, completed: false });
  update();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  update();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  update();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

list.addEventListener("click", (event) => {
  const li = event.target.closest(".task-item");
  if (!li) return;

  if (event.target.matches('input[type="checkbox"]')) {
    toggleTask(li.dataset.id);
  } else if (event.target.matches(".delete-btn")) {
    deleteTask(li.dataset.id);
  }
});

renderTasks();
