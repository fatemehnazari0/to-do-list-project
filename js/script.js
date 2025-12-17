const taskInput = document.getElementById('taskInput');
const timeInput = document.getElementById('timeInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = [];

function render() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-message">هنوز برنامه ای واسه امروزت نداری</div>';
        return;
    }

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        if (todo.completed) {
            li.className += ' completed';
        }

        let statusText = todo.completed ? 'کامل انجام شده' : 'انجام نشده';
        let timeDisplay = todo.time ? `<div class="todo-time">⏰ ${todo.time}</div>` : '';
        
        li.innerHTML = `
            <div class="checkbox-container">
                <div class="checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${index})"></div>
            </div>
            <div class="todo-content">
                <span class="todo-text">${todo.text}</span>
                <div class="todo-status">${statusText}</div>
                ${timeDisplay}
            </div>
            <button class="delete-btn" onclick="deleteTodo(${index})">✕</button>
        `;
        
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = taskInput.value.trim();
    const time = timeInput.value;
    
    if (text === '') {
        alert('خب قراره چیکارا کنیم');
        return;
    }

    todos.push({
        text: text,
        time: time,
        completed: false
    });

    taskInput.value = '';
    timeInput.value = '';
    render();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    render();
}

addBtn.addEventListener('click', addTodo);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

render();
