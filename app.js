const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.cleat-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', loadTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearTasks);

    filter.addEventListener('keyup', filterTasks);
}

function loadTasks() {
    tasks = getTasks();
    tasks.forEach(function(task){
        addTaskElement(task);
    });
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    addTaskElement(taskInput.value);
    storeInLocalStorage(taskInput.value);
    taskInput.value = '';

    e.preventDefault();
}

function addTaskElement(value) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(value));
    
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
}

function storeInLocalStorage(task) {
    let tasks = getTasks();
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    let localStorageTasks = localStorage.getItem('tasks');

    if (localStorageTasks === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorageTasks);

    return tasks;
}

function removeTask(e) {
    const parentElement = e.target.parentElement;
    if(parentElement.classList.contains('delete-item')) {
        parentElement.parentElement.remove();
    }

    tasks = getTasks();
    tasks.forEach(function(taskItem, index) {
        if(e.target.parentElement.parentElement.textContent === taskItem)
            tasks.splice(index, 1);
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // taskList.innerHTML = '';
    
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const liTextContent = task.textContent.toLocaleLowerCase();
            if(liTextContent.indexOf(text) !== -1) 
                task.style.display = 'block';
            else
                task.style.display = 'none';
        }
    );
}
