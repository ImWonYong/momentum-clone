const todoCnoatiner = document.querySelector(".todo-container");

const OFFSET = "todo_offset";

function drag_start(event) {
  const style = window.getComputedStyle(event.target, null);
  event.dataTransfer.setData(
    "text/plain",
    parseInt(style.getPropertyValue("left"), 10) -
      event.clientX +
      "," +
      (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
  );
}
function drag_over(event) {
  event.preventDefault();
  return false;
}
function drop(event) {
  const offset = event.dataTransfer.getData("text/plain").split(",");
  const left = event.clientX + parseInt(offset[0], 10) + "px";
  const top = event.clientY + parseInt(offset[1], 10) + "px";
  todoCnoatiner.style.left = left;
  todoCnoatiner.style.top = top;
  event.preventDefault();
  const offsetObj = {
    left,
    top,
  };
  localStorage.setItem(OFFSET, JSON.stringify(offsetObj));
  return false;
}

function loadOffset() {
  const loadedOffset = localStorage.getItem(OFFSET);
  if (loadedOffset !== null) {
    const parsedOffset = JSON.parse(loadedOffset);
    todoCnoatiner.style.left = parsedOffset.left;
    todoCnoatiner.style.top = parsedOffset.top;
  } else {
    todoCnoatiner.style.left = "810px";
    todoCnoatiner.style.top = "435px";
  }
}

function init() {
  loadOffset();
  todoCnoatiner.addEventListener("dragstart", drag_start, false);
  document.body.addEventListener("dragover", drag_over, false);
  document.body.addEventListener("drop", drop, false);
}

init();
