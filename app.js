
document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    dateAdded: new Date().toLocaleString(),
  };

  createTaskElement(task, false);
  taskInput.value = "";
}

function createTaskElement(task, isCompleted) {
  const taskList = isCompleted
    ? document.getElementById("completedTasks")
    : document.getElementById("pendingTasks");

  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", task.id);

  const taskText = document.createElement("span");
  taskText.textContent = `${task.text} (${task.dateAdded})`;

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.className = "complete-btn";
  completeButton.addEventListener("click", () => markAsComplete(task, listItem));

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn";
  editButton.addEventListener("click", () => editTask(task, listItem));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", () => deleteTask(listItem));

  listItem.appendChild(taskText);
  if (!isCompleted) listItem.appendChild(completeButton);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  taskList.appendChild(listItem);
}

function markAsComplete(task, listItem) {
  const completedList = document.getElementById("completedTasks");
  listItem.querySelector(".complete-btn").remove();
  task.completed = true;
  completedList.appendChild(listItem);
}

function editTask(task, listItem) {
  const newTaskText = prompt("Edit task:", task.text);
  if (newTaskText) {
    task.text = newTaskText;
    listItem.querySelector("span").textContent = `${task.text} (${task.dateAdded})`;
  }
}

function deleteTask(listItem) {
  listItem.remove();
}
