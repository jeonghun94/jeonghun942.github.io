const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
const finList = document.querySelector(".js-finList");

let todDos = [];
let finDos = [];

const TODOS_LS = "PENDING";
const FINTODOS_LS = "FINISHED";

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todDos));
}

function saveFinToDos() {
  localStorage.setItem(FINTODOS_LS, JSON.stringify(finDos));
}

function delTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = todDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  todDos = cleanToDos;
  saveToDos();
}

function delFinTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finList.removeChild(li);
  const cleanToDos = finDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finDos = cleanToDos;
  saveFinToDos();
}

function finTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let text = li;

  const cleanToDos = todDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  todDos = cleanToDos;

  paintFinTodo(text.querySelector("span").innerText);
  delTodo(event);
}

function preTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let text = li;

  const cleanToDos = finDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finDos = cleanToDos;

  paintTodo(text.querySelector("span").innerText);
  delFinTodo(event);
}

function paintFinTodo(text) {
  const li = document.createElement("li");
  const preBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const id = finDos.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(preBtn);
  finList.appendChild(li);
  li.id = id;
  delBtn.innerText = "❌";
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click", delFinTodo);
  preBtn.innerText = "◀";
  preBtn.addEventListener("click", preTodo);
  span.innerText = text;

  const finDoObj = {
    id: id,
    text: text,
  };

  finDos.push(finDoObj);
  saveFinToDos();
}

function paintTodo(text) {
  const li = document.createElement("li");
  const finBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const id = todDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click", delTodo);
  finBtn.innerText = "✅";
  finBtn.addEventListener("click", finTodo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = id;
  toDoList.appendChild(li);

  const toDoObj = {
    id: id,
    text: text,
  };

  todDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const inputVal = toDoInput.value;
  paintTodo(inputVal);
  toDoInput.value = "";
}

function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos !== null) {
    const parseToDos = JSON.parse(loadToDos);
    parseToDos.forEach(function (toDo) {
      paintTodo(toDo.text);
    });
  }
}

function loadFinToDos() {
  const loadFinToDos = localStorage.getItem(FINTODOS_LS);
  if (loadFinToDos !== null) {
    const parseFinToDos = JSON.parse(loadFinToDos);
    parseFinToDos.forEach(function (toDo) {
      paintFinTodo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  loadFinToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
