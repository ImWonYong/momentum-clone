const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./images/${imgNumber + 1}.jpg`;
  body.appendChild(image);
  image.classList.add("bgImage");
  // image.addEventListener('loadend', handleImgLoad) API로 받아올때 loadend를 사용할 수 있을 것
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
