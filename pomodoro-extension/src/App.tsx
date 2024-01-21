import React, { useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';

function App() {
  useEffect(() => {
  const injectedScript = `
  const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  };

  let interval;

  const mainButton = document.getElementById('js-btn');
  mainButton.addEventListener('click', () => {
    const { action } = mainButton.dataset;
    if (action === 'start') {
      startTimer();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro');
  });

  const modeButtons = document.querySelector('#js-mode-buttons');
  if (modeButtons) {
    modeButtons.addEventListener('click', handleMode);

    function getRemainingTime(endTime) {
      const currentTime = Date.parse(new Date());
      const difference = endTime - currentTime;
    
      const total = Number.parseInt(difference / 1000, 10);
      const minutes = Number.parseInt((total / 60) % 60, 10);
      const seconds = Number.parseInt(total % 60, 10);
    
      return {
        total,
        minutes,
        seconds,
      };
    }
    
    function startTimer() {
      let { total } = timer.remainingTime;
      const endTime = Date.parse(new Date()) + total * 1000;
    
      mainButton.dataset.action = 'stop';
      mainButton.textContent = 'stop';
      mainButton.classList.add('active');

      interval = setInterval(function() {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();
    
        total = timer.remainingTime.total;
        if (total <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
    
    function updateClock() {
      const { remainingTime } = timer;
      const minutes = \`\${remainingTime.minutes}\`.padStart(2, '0');
      const seconds = \`\${remainingTime.seconds}\`.padStart(2, '0');

      const min = document.getElementById('js-minutes');
      const sec = document.getElementById('js-seconds');
      if (min && sec) {
        min.textContent = minutes;
        sec.textContent = seconds;
      }
    }

    function switchMode(mode) {
      timer.mode = mode;
      timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
      };

      const modeButtons = document.querySelectorAll('button[data-mode]');
      modeButtons.forEach(e => e.classList.remove('active'));
      const activeButton = document.querySelector(\`[data-mode="\${mode}"]\`);
      if (activeButton) {
        activeButton.classList.add('active');
      }

      document.body.style.backgroundColor = \`var(--\${mode})\`;

      updateClock();
    }

    function handleMode(event) {
      const { mode } = event.target.dataset;

      if (!mode) return;

      switchMode(mode);
    }
  }
  `;

    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = injectedScript;
    document.body.appendChild(scriptElement);

    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);
  
  return (
    <div>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Freshman Pomodoro Clock Demo</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <main className="app">
        <progress id="js-progress" value="0"></progress>
        <div className="progress-bar"></div>
        <div className="timer">
          <div className="button-group mode-buttons" id="js-mode-buttons">
            <button
              data-mode="pomodoro"
              className="button active mode-button"
              id="js-pomodoro"
            >
              Pomodoro
            </button>
            <button
              data-mode="shortBreak"
              className="button mode-button"
              id="js-short-break"
            >
              Short break
            </button>
            <button
              data-mode="longBreak"
              className="button mode-button"
              id="js-long-break"
            >
              Long break
            </button>
          </div>
          <div className="clock" id="js-clock">
            <span id="js-minutes">25</span>
            <span className="separator">:</span>
            <span id="js-seconds">00</span>
          </div>
          <button className="main-button" data-action="start" id="js-btn">
            Start
          </button>
        </div>
      </main>
    </body>
    </div>
  );
}

export default App;
