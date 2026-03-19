// Todo List Module
import { getCurrentTranslations } from './ui.js';

const STORAGE_KEY = "newtab-todos";
let todos = [];
let todoContainer = null;

export function initTodo(container) {
  todoContainer = container;
  todos = loadTodos();
  render();
}

export function refreshTodoTranslations() {
  if (todoContainer) {
    render();
  }
}

function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.push({
    id: Date.now().toString(),
    text: trimmed,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function render() {
  const t = getCurrentTranslations();
  const title = t.todoTitle || "To-Do";
  const placeholder = t.todoPlaceholder || "Add a task...";
  const emptyMsg = t.todoEmpty || "No tasks yet";

  let html = `
    <div class="todo-header">
      <h3>${title}</h3>
    </div>
    <div class="todo-input-row">
      <input type="text" class="todo-input" placeholder="${placeholder}">
      <button class="todo-add-btn" aria-label="Add task">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="todo-list">
  `;

  if (todos.length === 0) {
    html += `<div class="todo-empty">${emptyMsg}</div>`;
  } else {
    todos.forEach(todo => {
      html += `
        <div class="todo-item${todo.completed ? " completed" : ""}" data-id="${todo.id}">
          <button class="todo-check" aria-label="Toggle task">
            <i class="fas ${todo.completed ? "fa-check-circle" : "fa-circle"}"></i>
          </button>
          <span class="todo-text">${escapeHtml(todo.text)}</span>
          <button class="todo-delete" aria-label="Delete task">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    });
  }

  html += `</div>`;
  todoContainer.innerHTML = html;

  // Input handlers
  const input = todoContainer.querySelector(".todo-input");
  const addBtn = todoContainer.querySelector(".todo-add-btn");

  addBtn.addEventListener("click", () => {
    addTodo(input.value);
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo(input.value);
    }
  });

  // Item handlers
  todoContainer.querySelectorAll(".todo-item").forEach(item => {
    const id = item.dataset.id;
    item.querySelector(".todo-check").addEventListener("click", () => toggleTodo(id));
    item.querySelector(".todo-delete").addEventListener("click", () => deleteTodo(id));
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
