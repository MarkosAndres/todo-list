const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.cleat-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearTasks);

    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
    taskInput.value = '';

    e.preventDefault();
}

function removeTask(e) {
    const parentElement = e.target.parentElement;
    if(parentElement.classList.contains('delete-item')) {
        parentElement.parentElement.remove();
    }
}

function clearTasks() {
    // taskList.innerHTML = '';
    
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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