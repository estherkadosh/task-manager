const STORAGE_KEY = "simpleTaskManager.tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const dueInput = document.getElementById("task-due");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const viewTabs = document.querySelectorAll(".view-tab");
const listView = document.getElementById("list-view");
const calendarView = document.getElementById("calendar-view");
const calendarTitle = document.getElementById("calendar-title");
const calendarGrid = document.getElementById("calendar-grid");

let tasks = loadTasks();
let calendarMonth = new Date();
calendarMonth.setDate(1);

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

// Due dates are stored as "YYYY-MM-DD" strings (the value of <input type="date">).
function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDueDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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

    li.append(checkbox, text);

    if (task.dueDate) {
      const due = document.createElement("span");
      due.className = "task-due";
      due.textContent = "Due " + formatDueDate(task.dueDate);
      li.appendChild(due);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  emptyMessage.hidden = tasks.length > 0;
}

function renderCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = toDateKey(new Date());

  calendarTitle.textContent = calendarMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstWeekday; i++) {
    const blank = document.createElement("div");
    blank.className = "calendar-day empty";
    calendarGrid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(new Date(year, month, day));
    const cell = document.createElement("div");
    cell.className = "calendar-day" + (dateKey === todayKey ? " today" : "");

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;
    cell.appendChild(number);

    for (const task of tasks.filter((t) => t.dueDate === dateKey)) {
      const item = document.createElement("div");
      item.className = "calendar-task" + (task.completed ? " completed" : "");
      item.textContent = task.text;
      item.title = task.text;
      cell.appendChild(item);
    }

    calendarGrid.appendChild(cell);
  }
}

function render() {
  renderTasks();
  renderCalendar();
}

function update() {
  saveTasks();
  render();
}

function addTask(text, dueDate) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({
    id: Date.now().toString(),
    text: trimmed,
    completed: false,
    dueDate: dueDate || null,
  });
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

function showView(view) {
  listView.hidden = view !== "list";
  calendarView.hidden = view !== "calendar";

  for (const tab of viewTabs) {
    const active = tab.dataset.view === view;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  }
}

function changeMonth(offset) {
  calendarMonth.setMonth(calendarMonth.getMonth() + offset);
  renderCalendar();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(input.value, dueInput.value);
  input.value = "";
  dueInput.value = "";
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

for (const tab of viewTabs) {
  tab.addEventListener("click", () => showView(tab.dataset.view));
}

document.getElementById("prev-month").addEventListener("click", () => changeMonth(-1));
document.getElementById("next-month").addEventListener("click", () => changeMonth(1));

render();
