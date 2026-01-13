const tasksContainer = document.getElementById('tasks-container');
const input = document.getElementById('task-input');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tasksNumRemovedItems = 0;

createTasks()

// Rotate input placeholder value
const placeholders = ["Ler 10 páginas de um livro.", "Limpar a casa.", "Beber água."];
let placeholder_index = 0;
setInterval(() => {
  placeholder_index = (placeholder_index + 1) % placeholders.length;
  input.placeholder = placeholders[placeholder_index];
}, 2400);

// Add task when 'Enter' is pressed
input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function persistTasks(){
    tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksString);
}

function addTask() {
    description = input.value;
    if (!description) return;
    
    input.value = '';
    tasks.push({ description, isDone: false});
    createTasks();
    persistTasks();
}

function deleteTask(index) {
    const correctIndex = index - tasksNumRemovedItems;
    tasks.splice(correctIndex, 1);
    tasksNumRemovedItems++;
    document.getElementById(`task-${index}`).remove();
    persistTasks();
}

function toogleTask(index) {
    const className = "is-done";
    const taskContainerEl = document.getElementById(`task-${index}`);
    const checkButtonEl = taskContainerEl.firstElementChild;

    tasks[index].isDone = !tasks[index].isDone;

    if (tasks[index].isDone) {
        taskContainerEl.classList.add(className);
        checkButtonEl.firstElementChild.innerHTML = 'check_circle';
    } else {
        taskContainerEl.classList.remove(className)
        checkButtonEl.firstElementChild.innerHTML = 'circle';
    }
    persistTasks();
}

function createTasks(){
    tasksNumRemovedItems = 0;
    tasksContainer.innerHTML = '';
    checkIcon = '<span class="material-symbols-outlined">check_circle</span>';
    unchekIcon = '<span class="material-symbols-outlined">circle</span>';

    tasks.forEach((item, i) => {
        const { description, isDone } = item;
        const taskContainer = `
            <div id="task-${i}" class="task ${isDone ? 'is-done' : ''}">
                <button id="check-button" class="check-button" onclick="toogleTask(${i})">
                    ${isDone ? checkIcon : unchekIcon}
                </button>
                <p>${description}</p>
                <button class="delete-task-button" onclick="deleteTask(${i})">
                    <span class="material-symbols-outlined">close_small</span>
                </button>
            </div>
        `;
        tasksContainer.innerHTML += taskContainer;
    })
}