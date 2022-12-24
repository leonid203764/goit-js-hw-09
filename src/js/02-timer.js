import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dataTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const daysLabel = document.querySelector('span[data-days]');
const hoursLabel = document.querySelector('span[data-hours]');
const minutesLabel = document.querySelector('span[data-minutes]');
const secondsLabel = document.querySelector('span[data-seconds]');
let timerId = null;

startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        }
        else {
            startBtn.disabled = false;
        }
    },
  };

  flatpickr(dataTime, options);

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
  
  function updateTimerContent ({days, hours, minutes, seconds}) {
            daysLabel.textContent = addLeadingZero(days);
            hoursLabel.textContent = addLeadingZero(hours);
            minutesLabel.textContent = addLeadingZero(minutes);
            secondsLabel.textContent = addLeadingZero(seconds);
  }

//   число перводить у рядок та додає до 2 знаків зліва нулі
  function addLeadingZero (value) {
    return String(value).padStart(2, '0');
  };

  startBtn.addEventListener('click', updateClock);

  function updateClock () {
    timerId = setInterval(() =>{
        // Знаходимо різницю між майбутньою датою (обраною у input) та теперішньою, значення у секундах
        const deltaTime = new Date(dataTime.value) - new Date();
        startBtn.disabled = true;
        if (deltaTime >= 0) {
            // Об'єкт з днями, годинами, мінутами та секундами, значення яких обчислено за допомогою функції convertMs
            const timeObject = convertMs(deltaTime);
            updateTimerContent (timeObject);
            dataTime.disabled = true;

        }
        else {
            Notiflix.Notify.success('Countdown finished');
            clearInterval(timerId);
            dataTime.disabled = false;
        }
    }, 1000);

  };


  