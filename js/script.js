const todoDescription = document.getElementById('todo-description');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const filter = document.getElementById('filter');

let todos = [];

function addTodo() {
  const text = todoDescription.value.trim();
  const date = todoDate.value;

  if (text && date) {
    todos.push({ text, date, completed: false });
    todoDescription.value = '';
    todoDate.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  const li = todoList.children[index];
  if (li) {
    li.style.transition = 'opacity 0.5s';
    li.style.opacity = 0;
    setTimeout(() => {
      todos.splice(index, 1);
      renderTodos();
    }, 500);
  }
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

      const formattedDate = new Date(todo.date).toLocaleString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      li.innerHTML = `
        <div>
          <strong>${todo.text}</strong><br/>
          <small>📅 Tenggat: ${formattedDate}</small>
        </div>
        <div>
          <button onclick="toggleTodo(${index})" title="Tandai selesai">✔️</button>
          <button onclick="deleteTodo(${index})" title="Hapus tugas">🗑️</button>
        </div>
      `;
      todoList.appendChild(li);
    });
}

// Event listener untuk filter
filter.addEventListener('change', renderTodos);