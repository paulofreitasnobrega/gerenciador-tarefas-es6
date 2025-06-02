const domElements = {
    taskForm:       document.getElementById('taskForm'),
    taskInput:      document.getElementById('taskInput'),
    taskList:       document.getElementById('taskList'),
    taskPriority:   document.getElementById('taskPriority')
};

const taskManager = new TaskManager();

const renderTasks = (tasks) => {
    domElements.taskList.innerHTML = tasks.map(task => `
        <li class="
            task-item 
            ${task.completed ? 'completed' : ''}"
            data-id=${task.id}
            data-priority="${task.completed ? 'completed' : task.priority}"
        >
            <span data-action="toggle">${task.text}</span>
            <button data-action="delete">X</button>
        </li>
    `).join('');
};

domElements.taskForm.addEventListener('submit', (e) => {
    const text = domElements.taskInput.value.trim();
    const priority = domElements.taskPriority.value;

    e.preventDefault();
    if (text) {
        taskManager.addTask(text, priority);
        domElements.taskInput.value = '';
        domElements.taskInput.focus();
    }
});

taskManager.eventEmitter.addEventListener('tasks-updated', (e) => {
    renderTasks(e.detail.tasks);
});

domElements.taskList.addEventListener('click', (e) => {
    const action = e.target.dataset.action;

    if (!action) return;

    const taskElement = e.target.closest('.task-item');
    const id = Number(taskElement.dataset.id);

    if (action === 'delete') taskManager.deleteTask(id);
    if (action === 'toggle') taskManager.toggleTask(id);
});

document.addEventListener('DOMContentLoaded', () => {
    taskManager.loadTasks();
});