
var btnstyleOFF = {
    "background-color": "transparent",
    "border-radius": "10px"
}

var btnstyleON = {
    "background-color": "#e0dede",
    "border-radius": "10px 10px 0 0"
}

function on() {
    if (document.getElementById("dropdown-content").style.display == "block") {
        document.getElementById("dropdown-content").style.display = "none";
        var obj = document.getElementById("dropbtn");
        Object.assign(obj.style, btnstyleOFF);
    }
    else {
        document.getElementById("dropdown-content").style.display = "block";
        var obj = document.getElementById("dropbtn");
        Object.assign(obj.style, btnstyleON);
    }
    
}
  

/* Main speed test code */

/* 
STILL WORKING ON:
- creating an end clause when the text runs out
- checking whether an entire row has been typed
- create a startup
- create a restart
- create timer
- 

*/


/* Convert display text into separate spans (word/char) */
let text = "This is where the actual text would appear, and this is what you would type.";
for (i = 0; i < 0; i++) {
    text = text + " " + text;
}
let gameOver = false;
let disp_text = document.querySelector(".display");
disp_text.textContent = text;
let charArray = [];
let wordArray = [];
function charComparer() {
    aliw = document.getElementById("display").textContent;
    disp_text.textContent= null;
    aliw.split(' ').forEach((word, index) => {
        wordArray.push(word)
        const wordSpan = document.createElement('span')
        wordSpan.setAttribute('class', 'word')
        if (index == 0) {
            wordSpan.classList.add('current')
        }
        else if (index == aliw.split(' ').length - 1) {
            wordSpan.classList.add('last')
        }
        wordSpan.innerText = `${word} `
        anon = wordSpan.innerText
        wordSpan.innerText = null
        anon.split('').forEach((char, indy) => {
            const charSpan = document.createElement('span')
            charSpan.setAttribute('class', 'char')
            charSpan.innerText = char
            charArray.push(char)
            wordSpan.appendChild(charSpan)
            
        })
        disp_text.appendChild(wordSpan)
    });
    
}

/* Catch user input */
let time_left = 60;
let time_passed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let typed = 0;
let current_content = "";
let c = 0;
let timer = null;

function textInput() {
    input = uInp.value;
    input_array = input.split('');
    typed++;
    currentWord = disp_text.querySelector('span.word.current');
    charSpanArray = currentWord.querySelectorAll('span.char');
    charSpanArray.forEach((char, index) => {
        let uchar = input_array[index];
        if (uchar == null) {
            char.classList.remove('correct');
            char.classList.remove('incorrect');
        }
        else if (uchar == char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');
        }
        else {
            if (index == charSpanArray.length - 1 && uchar == " ") {
                char.classList.add('correct');
                char.classList.remove('incorrect');
            }
            else {
                if (char.classList.contains('incorrect')) {
                
                }
                else {
                    errors++;
                    char.classList.add('incorrect');
                    char.classList.remove('correct');
                }
            }
            
            
        }
    })
    erElement = document.getElementById('erval');
    erElement.textContent = errors;
    ctElement = document.getElementById('chartyval');
    ctElement.textContent = typed;
}


function endGame(seconds) {
    /* DO THE FOLLOWING
    - Stop the clock
    - Stop checking for input
    - Calculate AWPM CWPM CPM ACC
    - auto-focus the replay button
    */
    
    timerElement.textContent = displayTime(seconds);
    uInp.disabled=true;
    errs = document.getElementById("erval").textContent;
    chars = document.getElementById("chartyval").textContent;
    acc = (chars/errs)*100;
    clearInterval(timerIntervalHandle);
    gameOver = true;
}

let checkIndex = 0;
let uInput = document.getElementById('uInp');
let history = []
function activateListener () {
    uInp.addEventListener('keyup', event => {
        if (event.keyCode === 32) {
            uWord = uInp.value.split(' ')
            uInp.value = uWord[1];
            history.push(uWord[0]);
            curW = disp_text.querySelector('span.word.current');
            curW.classList.remove('current');
            curW.classList.add('done');
            end = disp_text.querySelector("span.done.last");
            if (end != null) {
                endGame(timerValue - getTimerTime());
                return;
            }
            else {
                disp_text.querySelector('span.word:not(.done)').classList.add('current');
            }
            
            
            if (uWord[0] == wordArray[checkIndex]) {
                checkIndex++;
                console.log('correct');
            }
            else {
                checkIndex++;
                console.log('incorrect');
            }
            
            dones = disp_text.querySelectorAll("span.done");
            if (dones.length > 15) {
                dones.forEach(done => {
                    done.remove();
                })
            }
            
        }
    })
}



const timerElement = document.getElementById("timeval");
let startTime
let timerValue = 100
let playing = 0
function timerStart() {
    timerElement.textContent = displayTime(timerValue);
    startTime = new Date()
    timerIntervalHandle = setInterval(() => {
        newTotalSec = timerValue - getTimerTime();
        timerElement.textContent = displayTime(newTotalSec);
        if (newTotalSec <= 0) {
            endGame(newTotalSec);
        }
    }, 100)
    
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

function displayTime(seconds) {
    newTimerFront = Math.floor(seconds/60);
    newTimerBackSec = seconds % 60;
    newTimerBack = newTimerBackSec < 10 ? "0" + newTimerBackSec : newTimerBackSec;
    return (newTimerFront + ":" + newTimerBack);
}

function startGame() {
    charComparer()
    
    addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            playing = 1;
            uInp.disabled=false;
            uInp.focus();
            activateListener();
            timerStart();
            document.getElementById('uInp').placeholder = '';
            if (gameOver) {
                console.log("Game Over reached")
                return
            }
        }
    })
}

function restartGame() {

}


function main() {
    if (!gameOver) {
        startGame();
        console.log("when does this get printed")
    }
    else {
        console.log("Game over for real?")
    }
    console.log("made it here")
}

main();


/* 


disp = document.getElementById("display");
        donearr = disp.querySelectorAll("span.done");
        let countchar = 0;
        donearr.forEach(span => {
            countchar = countchar + span.childElementCount;
        })
        
        if (donearr.length > 6) {
            disp.querySelector("span.done").remove();
        }
*/


