// elements
const taskInput = document.querySelector(".task_input");
const taskSubmitBtn = document.querySelector(".task_submit");
const tasksContainer = document.querySelector(".tasks_container");
const checkIcon = document.querySelector(".task__check_icon");
const deleteIcon = document.querySelector(".task__delete_icon");

import {
  createTaskElement,
  createSpanElement,
  createTaskCheckIconElement,
  createTaskDeleteIconElement,
} from "./elements.js";

import { getData, setData, modifyData } from "./storage.js";
import { trueOrFalse } from "./util.js";

// events
document.addEventListener("DOMContentLoaded", getTasks);
taskSubmitBtn.addEventListener("click", setTasks);
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] === "task__check_icon") {
    clickCheckIcon(e);
  } else if (e.target.classList[0] === "task__delete_icon") {
    clickDeleteIcon(e);
  }
});

// functions

function getTasks(e) {
  const locallyStoredTasks = getData("tasks");

  locallyStoredTasks.forEach(function ({ id, name, status }) {
    const task = createTaskElement(id, status, tasksContainer);
    createSpanElement(name, task);
    createTaskCheckIconElement(task);
    createTaskDeleteIconElement(task);
  });
}

function setTasks(e) {
  e.preventDefault();

  if (taskInput.value === "") return;

  const taskDetails = {
    id: Math.random().toString(16).slice(2).toString(),
    name: taskInput.value,
    status: false,
  };
  setData("tasks", taskDetails);

  const task = createTaskElement(taskDetails.id, taskDetails.status, tasksContainer);
  createSpanElement(taskDetails.name, task);
  createTaskCheckIconElement(task);
  createTaskDeleteIconElement(task);

  taskInput.value = "";
}

function clickCheckIcon(e) {
  let data = getData("tasks");
  let taskCurrentStatus;

  const icon = e.target;
  const iconParent = icon.parentElement;
  const id = iconParent.id;
  const classList = ["task", "task__completed"];

  const index = data.findIndex((_data) => _data.id == id);
  const taskPreviousStatus = data[index].status;
  taskCurrentStatus = !taskPreviousStatus;

  data[index].status = taskCurrentStatus;
  localStorage.setItem("tasks", JSON.stringify(data));

  iconParent.classList = "";
  iconParent.classList.add(classList[taskCurrentStatus ? 1 : 0]);
}

function clickDeleteIcon(e) {
  const data = getData("tasks");
  let newData;

  const icon = e.target;
  const iconParent = icon.parentElement;
  const id = iconParent.id;

  newData = data.filter((_data) => _data.id !== id);
  modifyData("tasks", newData);

  iconParent.style.animation = `${trueOrFalse() ? "unmount" : "unmount_forward"} 0.5s ${
    trueOrFalse() ? "ease-out" : "ease-in"
  }`;

  iconParent.addEventListener("animationend", function () {
    iconParent.remove();
  });
}
