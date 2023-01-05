export function createTaskElement(id, taskStatus, parentElement) {
  const classList = ["task", "task__completed"];
  const task = document.createElement("li");
  task.id = id;
  task.classList.add(classList[taskStatus ? 1 : 0]);
  parentElement.appendChild(task);
  return task;
}

export function createSpanElement(taskName, parentElement) {
  const classList = ["task__name"];
  const span = document.createElement("span");
  classList.forEach((className) => span.classList.add(className));
  span.innerText = taskName;
  parentElement.appendChild(span);
  return span;
}

export function createTaskCheckIconElement(parentElement) {
  const classList = ["task__check_icon", "fa-solid", "fa-circle-check"];
  const icon = document.createElement("i");
  classList.forEach((className) => icon.classList.add(className));
  parentElement.appendChild(icon);
  return icon;
}

export function createTaskDeleteIconElement(parentElement) {
  const classList = ["task__delete_icon", "fa-solid", "fa-trash"];
  const icon = document.createElement("i");
  classList.forEach((className) => icon.classList.add(className));
  parentElement.appendChild(icon);
  return icon;
}
