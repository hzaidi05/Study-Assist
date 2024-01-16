import './App.css';

function App() {
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
      <div className="hidden">
        <audio src="backtowork.mp3" data-sound="pomodoro"></audio>
        <audio src="break.mp3" data-sound="shortBreak"></audio>
        <audio src="break.mp3" data-sound="longBreak"></audio>
      </div>
      <script src="main.ts"></script>
    </body>
    </div>
  );
}

export default App;
