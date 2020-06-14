const toDoContainer = document.querySelector(".todo-container"),
  toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  span = toDoContainer.querySelector(".dragMe");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //로컬 스토리지에는 값이 전부 스트링으로 들어감 그래서 JSON.stringify로 다 스트링으로 바꿔줌
}

function handleMouseenter(event) {
  const li = event.target;
  li.childNodes.forEach((child) => {
    if (child.tagName !== "SPAN") {
      child.classList.remove("disappear");
      child.classList.add("show");
    }
  });
}

function handleMouseleave(event) {
  const li = event.target;
  li.childNodes.forEach((child) => {
    if (child.tagName !== "SPAN") {
      child.classList.add("disappear");
      child.classList.remove("show");
    }
  });
}

function finishToDo(event) {
  const li = event.target.parentNode;
  const img = event.target;
  if (img.alt === "square.svg") {
    img.src = `https://raw.githubusercontent.com/ImWonYong/momentum-clone/02cbddcd25d64c51f75b7bc1e06f144ba79aa7a7/Images/square-check.svg`;
    img.alt = "square-check.svg";
    img.style.width = "18px";
    li.childNodes.forEach((child) => {
      if (child.tagName === "SPAN") {
        child.style.textDecoration = "line-through";
      }
    });
  } else {
    img.src = `https://raw.githubusercontent.com/ImWonYong/momentum-clone/02cbddcd25d64c51f75b7bc1e06f144ba79aa7a7/Images/square.svg`;
    img.alt = "square.svg";
    li.childNodes.forEach((child) => {
      if (child.tagName === "SPAN") {
        child.style.textDecoration = "none";
      }
    });
  }
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  const image = new Image();
  image.src = `https://raw.githubusercontent.com/ImWonYong/momentum-clone/02cbddcd25d64c51f75b7bc1e06f144ba79aa7a7/Images/square.svg`;
  image.alt = "square.svg";
  image.addEventListener("click", finishToDo);
  image.classList.add("disappear");

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  delBtn.classList.add("disappear");
  span.innerText = text;
  li.appendChild(image);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;

  li.addEventListener("mouseenter", handleMouseenter);
  li.addEventListener("mouseleave", handleMouseleave);
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function handleContainerEnter() {
  span.classList.remove("disappear");
  span.classList.add("show");
}

function handleContainerLeave() {
  span.classList.remove("show");
  span.classList.add("disappear");
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  toDoContainer.addEventListener("mouseenter", handleContainerEnter);
  toDoContainer.addEventListener("mouseleave", handleContainerLeave);
}

init();
