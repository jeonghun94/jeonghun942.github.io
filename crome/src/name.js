const form = document.querySelector(".js-name"),
  formInput = form.querySelector("input");
const iunput = document.querySelector("#name");
const NAME = "name";

function load() {
  const local_val = localStorage.getItem("name");

  if (local_val !== null) {
    form.removeChild(formInput);
    const name = document.createElement("h1");
    name.innerText = `Hello! ${local_val}`;
    name.classList.add("h1");
    form.appendChild(name);
  }
}

function submit() {
  const input_value = iunput.value;
  localStorage.setItem(NAME, input_value);
}

function init() {
  load();
  form.addEventListener("submit", submit);
}

init();
