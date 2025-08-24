let timer;
let startTime;
let elapsed = 0;
let running = false;


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



const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

console.log("Matrix animation starting...");

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(12, 3, 29, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = 'rgba(78, 10, 141, 1)';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};

setInterval(draw, 100);


function saveState() {
    localStorage.setItem('stopwatchStartTime', startTime);
    localStorage.setItem('stopwatchElapsed', elapsed);
    localStorage.setItem('stopwatchRunning', running);
}

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

    saveState();
};

document.getElementById('reset').onclick = function() {
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