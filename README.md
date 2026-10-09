# Simple Task Manager

A simple, frontend-only task manager built with plain HTML, CSS and JavaScript.
Add tasks, mark them as completed, and delete them. Your tasks are saved in the
browser's `localStorage`, so they are still there after you refresh the page.

No backend, no database, no build step and no dependencies.

## Features

- **Add tasks** with the **Add** button or by pressing **Enter**
- **Optional due date** for each task, shown next to the task in the list
- **View tasks** in a list, with a "No tasks yet" message when the list is empty
- **Calendar view**: a monthly calendar that shows each task on its due date,
  with buttons to move between months
- **Mark tasks as completed**: completed tasks are shown with a line through them
- **Delete tasks** with the **Delete** button
- **Saved automatically** to `localStorage` and loaded again on page refresh
- **Empty tasks are ignored**: input that is blank or only spaces is not added

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/estherkadosh/task-manager.git
   cd task-manager
   ```

2. Open `index.html` in your browser by double-clicking it.

Or serve the folder with a local web server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Project structure

```
task-manager/
├── index.html   # Page structure: title, add-task form, task list
├── style.css    # Styling, including the completed-task style
├── script.js    # App logic: add, complete, delete, render, localStorage
└── README.md
```

## How it works

Tasks are kept in an array of objects like `{ id, text, completed, dueDate }`,
where `dueDate` is a `"YYYY-MM-DD"` string or `null`.
Every change (add, complete or delete) updates the array, saves it to
`localStorage` under the key `simpleTaskManager.tasks`, and redraws the list.
When the page loads, the saved tasks are read back from `localStorage`.

Task text is inserted with `textContent`, so anything a user types is shown as
plain text and is never run as HTML.
