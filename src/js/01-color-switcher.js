const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const DELAY = 1000;
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn () {
    changeActivityButtons ();
    timerId = setInterval(() =>{
document.body.style.backgroundColor = getRandomHexColor();
    }, DELAY);
};



function onClickStopBtn () {
    clearInterval(timerId);
    changeActivityButtons ();
};

function changeActivityButtons () {
    if (!startBtn.disabled) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
    }

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

