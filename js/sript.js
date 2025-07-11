const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filter = document.getElementById('filter');
let todos = [];

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    todoInput.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  const li = todoList.children[index];
  li.style.transition = 'opacity 0.5s';
  li.style.opacity = 0;
  setTimeout(() => {
    todos.splice(index, 1);
    renderTodos();
  }, 500);
}

function renderTodos() {
  const value = filter.value;
  todoList.innerHTML = '';
  todos
    .filter(todo =>
      value === 'all' ||
      (value === 'completed' && todo.completed) ||
      (value === 'uncompleted' && !todo.completed)
    )
    .forEach((todo, index) => {
      const li = document.createElement('li');
      li.classList.add('fade-in');
      li.innerHTML = `
        <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">
          ${todo.text}
        </span>
        <div>
          <button onclick="toggleTodo(${index})">✔️</button>
          <button onclick="deleteTodo(${index})">🗑️</button>
        </div>
      `;
      todoList.appendChild(li);
    });
}

filter.addEventListener('change', renderTodos);