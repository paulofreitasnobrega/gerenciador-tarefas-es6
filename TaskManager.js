class TaskManager {
    constructor() {
        this.tasks = [];
        this.dbName = 'myTasks';                
        this.eventEmitter = new EventTarget();
    }

    #notifyChange() {
        this.eventEmitter.dispatchEvent(new CustomEvent('tasks-updated', {
            detail: { tasks: this.tasks }
        }));
    }
    
    loadTasks() {
        const savedTasks = localStorage.getItem(this.dbName);

        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.#notifyChange();
        }
    }            
    
    saveTasks() {
        localStorage.setItem(this.dbName, JSON.stringify(this.tasks));
    }
    
    addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };

        this.tasks = [...this.tasks, newTask];
        this.saveTasks();
        this.#notifyChange();

    }
    
    toggleTask(id) {
        this.tasks = this.tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveTasks();
        this.#notifyChange();
    }
    
    deleteTask(id) {                
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.#notifyChange();
    }
}