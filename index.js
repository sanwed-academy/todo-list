const taskInput = document.querySelector('#task-input');
const addButton = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');
const filterWrapper = document.querySelector('.filters');
const tasksCount = document.querySelector('#task-count');
let activeFilterButton = document.querySelector('.change-filter.active');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'pending') {
      return !task.completed;
    }
  })

  tasksCount.textContent = filteredTasks.length;

  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }
    li.innerHTML = `
      <span>${task.name}</span>
      <div class="actions">
          <button class="toggle-task" data-index="${tasks.indexOf(task)}">✔</button>
          <button class="delete-task" data-index="${tasks.indexOf(task)}">✖</button>
      </div>
    `;
    taskList.append(li);
  })

  saveTasks();
}

function addTask() {
  const task = {
    name: taskInput.value,
    completed: false,
  }
  tasks.push(task);
  taskInput.value = '';
  renderTasks();
}

function deleteTask(event) {
  if (event.target.classList.contains('delete-task')) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleTask(event) {
  if (event.target.classList.contains('toggle-task')) {
    const index = event.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
}

function changeFilter(event) {
  if (event.target.classList.contains('change-filter')) {
    filter = event.target.dataset.filter;
    activeFilterButton.classList.remove('active');
    activeFilterButton = event.target;
    activeFilterButton.classList.add('active');
    renderTasks();
  }
}

filterWrapper.addEventListener('click', changeFilter);
addButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', toggleTask);

document.addEventListener('DOMContentLoaded', renderTasks);
