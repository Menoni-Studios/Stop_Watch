let timer;
let startTime;
let elapsed = 0;
let running = false;

function updateDisplay() {
    // Calculate elapsed time based on current time if running, else use stored elapsed
    const time = running ? Date.now() - startTime + elapsed : elapsed;
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor(time % 1000 / 10)).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    document.title = document.getElementById('display').textContent = timeString;
}


const toggleBtn = document.getElementById('toggle');
toggleBtn.onclick = function() {
    if (!running) {
        running = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        toggleBtn.textContent = 'Stop';
        toggleBtn.style.background = '#ec5b5b'; // red for stop
        toggleBtn.style.color = 'black';
    } else {
        running = false;
        clearInterval(timer);
        elapsed += Date.now() - startTime;
        updateDisplay();
        toggleBtn.textContent = 'Start';
    toggleBtn.style.background = '#0bec0bff'; // soft green for Start
        toggleBtn.style.color = 'black';
    }
};

document.getElementById('reset').onclick = function() {
    running = false;
    clearInterval(timer);
    elapsed = 0;
    updateDisplay();
    toggleBtn.textContent = 'Start';
    toggleBtn.style.background = '#0bec0bff'; // green for start
    toggleBtn.style.color = 'black';
};