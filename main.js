
const leaf = document.querySelector('i');
const opt = document.querySelector('.options');

// I am using jquery, it's ugly, I don't like that grrrr
$(document).ready(function(){
    $("i").click(function () {
     $(".options").fadeToggle(1500);
    });
   });


// Set up the timer now !!!  
const buttons = document.querySelectorAll('.btn');
const timer = document.querySelector('.timer');
const timerOptions = document.querySelectorAll('.change');

const sessionLong = 30;
const sessionHalf = 15;
const sessionShort = 5;

let timerEnded = false;
let paused = false;

let timeToUse = sessionLong;

let seconds = 00;
let min;
let countdown;

const alarmSound = new Audio('sparrow.mp3');

function chooseAction() {
         resetAudio();
         
    const whichBtn = this.textContent;
    
    switch (whichBtn) {
        case 'Start':
            if (paused) {
				toggleStop();
			} else {
				
                startTimer();
            }

            break;
        
        case 'Pause':
            toggleStop();
            break;
            
        case 'Reset':
            reset();
            break;    
    } 
}


function resetAudio() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function startTimer() {
    clearInterval(countdown);
    paused = false;
    setMin(timeToUse);
    countdown = setInterval(timerCountdown, 1000);
}

function toggleStop() {
    paused = !paused;
}

function reset() {
    timerEnded = false;
    paused = true;

    setMin(timeToUse);
    //updateDisplayTimer();
}

function setMin(time) {
    min = time;
    seconds = 00;
    updateDisplayTimer();
}

function timerCountdown() {
    if (paused) {
        return;
    }
    if (timerEnded) {
        clearInterval(countdown);
        return;
    }
    
    seconds--;
    
    if (min == 0 && seconds < 1) {
        alarmSound.play();
        timerEnded = true;
    } 
    else if ( seconds < 0) {
        min--;
        seconds = 59;
    }
    updateDisplayTimer(); 
}



function updateDisplayTimer() {
    const time = `${min < 10 ? '0' : ''}${min}:${seconds < 10 ? '0' : ''}${seconds}`;
    timer.textContent = time;
    document.title = time;
}

function selectTimeToUse(e) {
    switch (e.target.value) {
        case 'long':
           timeToUse = sessionLong;
           break;
        
        case 'half':
            timeToUse = sessionHalf;
            break;
            
        case 'short':
            timeToUse = sessionShort;
            break;    
    }

    paused = true;
    setMin(timeToUse);
    
}


buttons.forEach((btn) => btn.addEventListener('click', chooseAction));
timerOptions.forEach((change) => change.addEventListener('change', selectTimeToUse));
