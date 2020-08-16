const body = document.querySelector("body");
const IMG_NUM = 5;

function print(imgNum) {
  const img = new Image();
  img.src = `src/img/${imgNum + 1}.jpg`;
  img.classList.add("bg");
  body.prepend(img);
}

function genRandom() {
  const num = Math.floor(Math.random() * IMG_NUM);

  return num;
}

function init() {
  const randomNum = genRandom();
  print(randomNum);
}

init();
