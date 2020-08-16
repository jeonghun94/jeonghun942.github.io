const time = document.querySelector(".js-time");

function getTime() {
  const now = new Date();

  const hours = now.getHours();
  const miniutes = now.getMinutes();

  time.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    miniutes < 10 ? `0${miniutes}` : miniutes
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
