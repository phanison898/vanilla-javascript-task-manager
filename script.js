// elements
const todoInput = document.querySelector("#todo-add-input");
const todoSubmitBtn = document.querySelector("#todo-add-btn");
const todosListUL = document.querySelector(".todos_list");
const checkIcon = document.querySelector(".todo__check-icon");
const deleteIcon = document.querySelector(".todo__delete-icon");
const toggleSwitch = document.querySelector(".switch");

// events
document.addEventListener("DOMContentLoaded", getDataFromLS);
todoSubmitBtn.addEventListener("click", addTaskToList);
// todoSubmitBtn.addEventListener("click", addTaskToList);
todosListUL.addEventListener("click", clickCheckOrDeleteIcon);
toggleSwitch.addEventListener("click", toggleTheme);

// functions

function getDataFromLS(e) {
  const data = isKeyExistsInLS("tasks");
  data.forEach(function ({ name, status }) {
    const li = document.createElement("li");
    status ? li.classList.add("todo__completed") : li.classList.add("todo");
    todosListUL.appendChild(li);

    const span = document.createElement("span");
    span.classList.add("todo__text");
    span.innerText = name;
    li.appendChild(span);

    const checkIcon = document.createElement("i");
    checkIcon.classList.add("todo__check-icon");
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-circle-check");
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

function isKeyAsBooleanExistsInLS(key) {
  let data;
  const storedKey = localStorage.getItem(key);
  if (storedKey === null) {
    data = false;
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

  //  <i class="fa-solid fa-circle-check"></i>

  const checkIcon = document.createElement("i");
  // checkIcon.classList.add("todo__check-icon");
  // checkIcon.classList.add("fa-solid");
  // checkIcon.classList.add("fa-check");
  checkIcon.classList.add("todo__check-icon");
  checkIcon.classList.add("fa-solid");
  checkIcon.classList.add("fa-circle-check");
  li.appendChild(checkIcon);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("todo__delete-icon");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash");
  li.appendChild(deleteIcon);

  todoInput.value = "";
}

function saveTaskToLS(obj) {
  let data = isKeyExistsInLS("tasks");
  data.push(obj);
  localStorage.setItem("tasks", JSON.stringify(data));
}

function clickCheckOrDeleteIcon(e) {
  let data = isKeyExistsInLS("tasks");
  const ele = e.target;
  if (ele.classList[0] === "todo__check-icon") {
    const list = ele.parentElement;
    const span = list.firstChild;
    const spanText = span.innerText.toLowerCase();

    const index = data.findIndex((d) => d.name.toLowerCase() == spanText);
    const previusStatus = data[index].status;

    list.classList = ""; // clear all class names
    !previusStatus ? list.classList.add("todo__completed") : list.classList.add("todo");

    data[index].status = !previusStatus;
    localStorage.setItem("tasks", JSON.stringify(data));
  } else if (ele.classList[0] === "todo__delete-icon") {
    const list = ele.parentElement;
    const span = list.firstChild;
    const spanText = span.innerText.toLowerCase();

    const newData = data.filter((d) => d.name.toLowerCase() !== spanText);
    localStorage.setItem("tasks", JSON.stringify(newData));

    const seed = Math.floor(Math.random() * 2);
    let animationName;
    if (seed === 0) {
      animationName = "unmount_forward";
    } else if (seed === 1) {
      animationName = "unmount";
    }
    ele.parentElement.style.animation = animationName + " 0.5s ease-out";

    // const parent = ele.parentElement;
    // parent.classList.add("todo__deleted");
    parent.addEventListener("animationend", function () {
      list.remove();
    });
  }
}

function toggleTheme(e) {
  let data = isKeyAsBooleanExistsInLS("mode");
  localStorage.setItem("mode", JSON.stringify(!data));

  if (e.target.classList[0] == "switch") {
    toggleSwitch.classList = "";
    toggleSwitch.classList.add("switch");
    toggleSwitch.classList.add("fa-solid");
    if (data) {
      toggleSwitch.classList.add("fa-toggle-on");
      // document.body.style.backgroundColor = "#001e3c";
    } else {
      toggleSwitch.classList.add("fa-toggle-off");
      // document.body.style.backgroundColor = "#8EC5FC";
      // document.body.style.backgroundImage = "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";
    }
  }
}
