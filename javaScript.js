
window.onload = function(){
//StopWatch variables
let timer;
let startTime;
let elapsed = 0;
let running = false;

//DOM elements first
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');

//Restore saved state
const savedStartTime = localStorage.getItem('stopwatchStartTime');
const savedElapsed = localStorage.getItem('stopwatchElapsed');
const savedRunning = localStorage.getItem('stopwatchRunning');

if (savedElapsed !== null) elapsed = Number(savedElapsed);
if (savedStartTime !== null) startTime = Number(savedStartTime);
if (savedRunning === 'true') {
    running = true;
    elapsed += Date.now() - startTime;//Add time passed
    startTime = Date.now();//Reset startTime to now
    timer = setInterval(updateDisplay, 10);
    toggleBtn.textContent = 'Stop';
    toggleBtn.style.background = '#ec5b5b';
    toggleBtn.style.color = 'black';
}
updateDisplay();


//Save state
function saveState() {
    localStorage.setItem('stopwatchStartTime', startTime);
    localStorage.setItem('stopwatchElapsed', elapsed);
    localStorage.setItem('stopwatchRunning', running);
}

//Update display
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

//Toggle button
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

    saveState();
};

//Reset button
resetBtn.onclick = function() {
    running = false;
    clearInterval(timer);
    elapsed = 0;
    updateDisplay();
    toggleBtn.textContent = 'Start';
    toggleBtn.style.background = '#0bec0bff'; // green for start
    toggleBtn.style.color = 'black';

localStorage.removeItem('stopwatchStartTime');
localStorage.removeItem('stopwatchElapsed');
localStorage.removeItem('stopwatchRunning');

};
}

const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const emoji = ["👽","☠️","👾","😇","🥳","🫣","🤭","🤫","🤣","😂","😁","😃","😄","😎","😊","😉","😆","😅","😍","😗","🤗","🙂","😚","🤩","🫡","😶‍🌫️","😝","😛","🙃","🤪","🥳","🤖"];
const fullSet = [...alphabet,...emoji];

const fontSize = 16;
const columns = canvas.width/fontSize;

console.log("Matrix animation starting...");

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(73, 8, 192, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = 'rgba(110, 233, 39, 1)';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = fullSet[Math.floor(Math.random() * fullSet.length)];
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};

setInterval(draw, 150);