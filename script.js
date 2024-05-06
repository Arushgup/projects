// **DOM element references**
const display = document.querySelector('.display'); // Reference to the element displaying time
const startBtn = document.getElementById('startBtn'); // Reference to the start button
const stopBtn = document.getElementById('stopBtn'); // Reference to the stop button
const resetBtn = document.getElementById('resetBtn'); // Reference to the reset button

// **Stopwatch state variables**
let startTime = 0; // Stores the start time in milliseconds
let elapsedTime = 0; // Stores the elapsed time in milliseconds
let intervalId = null; // Stores the ID of the timer interval (used for clearing)
let isRunning = false; // Flag indicating if the stopwatch is currently running

// **Function to format time in HH:MM:SS format**
function formatTime(time) {
  // Calculate hours, minutes, and seconds from milliseconds
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);

  // Pad hours, minutes, and seconds with leading zeros for consistent formatting
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// **Function to update the displayed time**
function updateTime() {
  // Calculate the current elapsed time
  elapsedTime = Date.now() - startTime;

  // Update the display element with the formatted time
  display.textContent = formatTime(elapsedTime);
}

// **Start button click event handler**
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;

    // Start from the last stopped time if available, otherwise start from now
    startTime = elapsedTime > 0 ? Date.now() - elapsedTime : Date.now();

    // Start the timer interval to update the time every 10 milliseconds
    intervalId = setInterval(updateTime, 10);

    // Disable the start button and enable the stop and reset buttons
    startBtn.disabled = true;
    stopBtn.classList.add('enabled');
    resetBtn.classList.add('enabled');
  }
});

// **Stop button click event handler** (using a separate function)
function handleStopButtonClick() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId); // Clear the timer interval
    intervalId = null; // Reset the interval ID
    stopBtn.classList.remove('enabled'); // Disable the stop button
    startBtn.disabled = false; // Enable the start button again
  }
}

stopBtn.addEventListener('click', handleStopButtonClick);

// **Reset button click event handler** (using a separate function)
function handleResetButtonClick() {
  isRunning = false;
  clearInterval(intervalId);
  intervalId = null;
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime); // Update display to 00:00:00
  startBtn.disabled = false;
  stopBtn.classList.remove('enabled');
  resetBtn.classList.remove('enabled');
}

resetBtn.addEventListener('click', handleResetButtonClick);
