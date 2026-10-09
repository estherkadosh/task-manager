# E2E Test Checklist: Simple Task Manager (Staging)

**URL:** https://task-manager-staging-b466.up.railway.app

**Before you start:** open the URL in a fresh browser window (incognito or private mode is easiest), so the task list starts empty.

| Date | Tester | Browser | Commit / deployment |
|------|--------|---------|---------------------|
|      |        |         |                     |

---

## 1. The application opens

- [ ] The page loads without an error page
- [ ] The title **Simple Task Manager** is shown
- [ ] The text field and the **Add** button are shown
- [ ] The message **No tasks yet** is shown

## 2. A task can be added

- [ ] Type `Buy milk` and click **Add**. The task appears in the list
- [ ] Type `Walk the dog` and press **Enter**. The task appears below the first one
- [ ] The text field is empty after each add
- [ ] The message **No tasks yet** is gone
- [ ] Click **Add** with the field empty. No task is added
- [ ] Type only spaces and click **Add**. No task is added

## 3. A task can be completed

- [ ] Tick the checkbox next to `Buy milk`. The text gets a line through it and turns gray
- [ ] Untick the checkbox. The task looks normal again
- [ ] Tick it again, so that it is completed for test 5

## 4. A task can be deleted

- [ ] Click **Delete** next to `Walk the dog`. Only that task is removed
- [ ] `Buy milk` is still in the list

## 5. Tasks survive a page refresh

- [ ] Refresh the page (F5). `Buy milk` is still in the list
- [ ] `Buy milk` is still ticked and has a line through it
- [ ] `Walk the dog` is still gone

## Final check

- [ ] Open DevTools (F12) → **Console**. There are no red errors
      (a 404 for `favicon.ico` is expected and can be ignored)

---

**Result:** ☐ Pass ☐ Fail

**Notes / problems found:**
