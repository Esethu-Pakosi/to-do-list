let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" aria-label="Checkbox for following text input" data-index="${index}">
          </div>
        </div>
        <input type="text" class="form-control task-item" value="${task}" readonly>
        <div class="input-group-append">
          <span class="edit-task" data-index="${index}">Edit</span>
          <span class="remove-task" data-index="${index}">Remove</span>
        </div>
      </div>
    `;
    taskList.innerHTML += taskItem;
  });

  updateTaskCount();
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const newTaskInput = document.getElementById('newTask');
  const newTask = newTaskInput.value.trim();
  if (newTask !== '') {
    tasks.push(newTask);
    newTaskInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});

document.getElementById('taskList').addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-task')) {
    const index = event.target.getAttribute('data-index');
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  } else if (event.target.classList.contains('edit-task')) {
    const index = event.target.getAttribute('data-index');
    const taskInput = document.querySelectorAll('.task-item')[index];
    taskInput.readOnly = false;
    taskInput.focus();
    if (taskInput.selectionStart === taskInput.selectionEnd) {
        taskInput.setSelectionRange(taskInput.value.length, taskInput.value.length);
      }
    }
  });
  
  document.querySelectorAll('.task-item').forEach((taskInput) => {
    taskInput.addEventListener('click', (event) => {
      if (event.target.selectionStart === event.target.selectionEnd) {
        event.target.setSelectionRange(event.target.value.length, event.target.value.length);
      }
    });
  });

document.getElementById('newTask').addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault(); 
    document.getElementById('addTaskBtn').click(); 
  }
});

function updateTaskCount() {
  const taskCount = tasks.length;
  const taskCountElement = document.getElementById('taskCount');
  taskCountElement.textContent = `Total Tasks: ${taskCount}`;
}

document.getElementById('deleteAllBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    localStorage.removeItem('tasks');
    renderTasks();
  }
});
document.getElementById('deleteSelectedBtn').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.input-group-text input[type="checkbox"]');
    let updatedTasks = [];

    checkboxes.forEach((checkbox, index) => {
      if (!checkbox.checked) {
        updatedTasks.push(tasks[index]);
      }
    });

    tasks = updatedTasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});

