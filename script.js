// elements
const todoInput = document.querySelector("#todo-add-input");
const todoSubmitBtn = document.querySelector("#todo-add-btn");
const todosListUL = document.querySelector(".todos_list");
const checkIcon = document.querySelector(".todo__check-icon");
const deleteIcon = document.querySelector(".todo__delete-icon");

// events
document.addEventListener("DOMContentLoaded", getDataFromLS);
todoSubmitBtn.addEventListener("click", addTaskToList);
// todoSubmitBtn.addEventListener("click", addTaskToList);
todosListUL.addEventListener("click", clickCheckOrDeleteIcon);

// functions

function getDataFromLS(e) {
  const data = isKeyExistsInLS("tasks");
  data.forEach(function ({ name, status }) {
    const li = document.createElement("li");
    li.classList.add("todo");
    todosListUL.appendChild(li);

    const span = document.createElement("span");
    span.classList.add("todo__text");
    span.innerText = name;
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
  });
}

function setDataIntoLS(e, inputText) {
  const data = isKeyExistsInLS("tasks");
  data.push({ name: inputText, status: false });
  localStorage.setItem("tasks", JSON.stringify(data));
}

function addTask(e) {
  e.preventDefault();

  if (todoInput.value === "") return;
}

function isKeyExistsInLS(key) {
  let data;
  const storedKey = localStorage.getItem(key);
  if (storedKey === null) {
    data = [];
    console.log("no key available");
  } else {
    data = JSON.parse(localStorage.getItem(key));
  }
  return data;
}

function addTaskToList(e) {
  e.preventDefault();

  if (todoInput.value === "") return;

  const taskObj = { name: todoInput.value, status: false };

  const li = document.createElement("li");
  li.classList.add("todo");
  todosListUL.appendChild(li);

  const span = document.createElement("span");
  span.classList.add("todo__text");
  span.innerText = taskObj.name;
  li.appendChild(span);
  saveTaskToLS(taskObj);

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

  todoInput.value = "";
}

function saveTaskToLS(obj) {
  const data = isKeyExistsInLS("tasks");
  data.push(obj);
  localStorage.setItem("tasks", JSON.stringify(data));
}

function clickCheckOrDeleteIcon(e) {
  const ele = e.target;
  if (ele.classList[0] === "todo__check-icon") {
    const parent = ele.parentElement;
    parent.classList.toggle("todo__completed");
  } else if (ele.classList[0] === "todo__delete-icon") {
    const seed = Math.floor(Math.random() * 2);
    let animationName;
    if (seed === 0) {
      animationName = "unmount_forward";
    } else if (seed === 1) {
      animationName = "unmount";
    }
    ele.parentElement.style.animation = animationName + " 0.5s ease-out";

    const parent = ele.parentElement;
    // parent.classList.add("todo__deleted");
    parent.addEventListener("animationend", function () {
      parent.remove();
    });
  }
}
