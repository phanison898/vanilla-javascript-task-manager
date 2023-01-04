const todoInput = document.querySelector("#todo-add-input");
const todoSubmitBtn = document.querySelector("#todo-add-btn");
const todosListUL = document.querySelector(".todos_list");

todoSubmitBtn.addEventListener("click", addTodoToList);

function addTodoToList(e) {
  e.preventDefault();

  if (todoInput.value === "") return;

  const li = document.createElement("li");
  li.classList.add("todo");
  todosListUL.appendChild(li);

  const span = document.createElement("span");
  span.classList.add("todo__text");
  span.innerText = todoInput.value;
  todoInput.value = "";
  li.appendChild(span);

  const checkIcon = document.createElement("i");
  checkIcon.classList.add("todo__check-icon");
  checkIcon.classList.add("fa-solid");
  checkIcon.classList.add("fa-check");
  li.appendChild(checkIcon);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("todo__delete-icon");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash");
  li.appendChild(deleteIcon);
}

function checkTodo() {}
