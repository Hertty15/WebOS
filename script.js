
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var header = document.getElementById(element.id + "header");
    
    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("about"));


function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "flex";
}


var welcomeScreen = document.getElementById("welcome");
var welcomeClose = document.getElementById("welcomeclose");
var welcomeOpen = document.getElementById("welcomeopen");
var aboutClose = document.getElementById("aboutclose");


welcomeClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

if (aboutClose) {
    aboutClose.addEventListener("click", function() {
        closeWindow(document.getElementById("about"));
    });
}


function updateTime() {
    var now = new Date();
    var timeString = now.toLocaleTimeString();
    var timeElement = document.getElementById("timeElement");
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}


setInterval(updateTime, 1000);
updateTime(); // Call immediately on load


console.log(" WebOS loaded successfully!");


document.querySelectorAll('.dock-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const windowId = this.getAttribute('data-window');
        if (windowId) {
            const win = document.getElementById(windowId);
            if (win) {
                // Open window if closed
                win.style.display = 'flex';
                // Bring to front
                win.style.zIndex = 100;
                // Optional: reset position to center if it's off-screen
                if (parseInt(win.style.top) < 0 || parseInt(win.style.left) < 0) {
                    win.style.top = 'calc(50% - 200px)';
                    win.style.left = 'calc(50% - 250px)';
                }
            }
        }
    });
});


document.getElementById('calculatorclose').addEventListener('click', function() {
    document.getElementById('calculator').style.display = 'none';
});

document.getElementById('notesclose').addEventListener('click', function() {
    document.getElementById('notes').style.display = 'none';
});

document.getElementById('settingsclose').addEventListener('click', function() {
    document.getElementById('settings').style.display = 'none';
});

document.getElementById('terminalclose').addEventListener('click', function() {
    document.getElementById('terminal').style.display = 'none';
});


dragElement(document.getElementById('calculator'));
dragElement(document.getElementById('notes'));
dragElement(document.getElementById('settings'));
dragElement(document.getElementById('terminal'));

//making the calc work
let calcdisplay = '0';
let calcprev = '';
let calcbutton = null;

function updatecalcdisplay() {
    const display = document.querySelector('#calc .windowcontent > div:first-child');
    if (display) {
        display.textContent = calcdisplay;
    }
}
//spelling is vry IMP
//redoing this cuz it didnt work pt2
let displayVal='0'

function calc(value){
    const display=document.getElementById('calc-display');
    
    if (value==='C'){
        displayVal='0';
    }else if (value==='='){
        try{
            let mathstring = displayVal.replace(/×/g, '*').replace(/÷/g, '/');
            displayVal=eval(mathstring).toString();
        }catch{
            displayVal='ERROR'
        }
    }else if (['+', '-', '×', '÷'].includes(value)){
        displayVal+=''+value+'';
    } else if (value === '±') {
        displayVal=(parseFloat(displayVal)*-1).toString();
    }else if (value==='%'){
        displayVal=(parseFloat(displayVal)/100).toString();
    }else{
        if(displayVal==='0'){
            displayVal=value;
        }else{
            displayVal+=value;
        }
    }
    display.textContent=displayVal
}

//setting stuff
function changebg(color){
    document.body.style.background=color;
    console.log('Background changed to:', color);
}

//making it so in terminal when u click enter it sends or whatever
// ===== TERMINAL CODE - FRESH START =====

// Wait for everything to load
setTimeout(function() {
    // Find the elements
    var inputField = document.getElementById('terminal-input');
    var outputArea = document.getElementById('terminal-output');
    
    console.log('Terminal setup - Input:', inputField, 'Output:', outputArea);
    
    if (!inputField || !outputArea) {
        console.error('ERROR: Terminal elements not found!');
        return;
    }
    
    // Listen for key presses
    inputField.addEventListener('keydown', handleKeyPress);
    
    // Focus input when clicking terminal
    document.getElementById('terminal').addEventListener('click', function() {
        inputField.focus();
    });
    
    function handleKeyPress(event) {
        //was enter pressed?
        if (event.key === 'Enter' || event.which === 13 || event.keyCode === 13) {
            event.preventDefault(); // Stop default behavior
            
            var command = inputField.value.trim();
            console.log('Command entered:', command);
            
            //showing command
            outputArea.innerHTML = outputArea.innerHTML + '<p style="color: #00ff00;">user@webos:~$ ' + command + '</p>';
            
            //understanding the command
            var lowerCommand = command.toLowerCase();
            
            if (lowerCommand === 'help') {
                outputArea.innerHTML = outputArea.innerHTML + '<p style="color: yellow;">Available commands: help, date, clear, who am i, hello, ls, pwd</p>';
            }
            else if (lowerCommand === 'date') {
                outputArea.innerHTML = outputArea.innerHTML + '<p>' + new Date().toString() + '</p>';
            }
            else if (lowerCommand === 'clear') {
                outputArea.innerHTML = '';
            }
            else if (lowerCommand === 'who am i') {
                outputArea.innerHTML = outputArea.innerHTML + '<p style="color: cyan;">user</p>';
            }
            else if (lowerCommand === 'hello' || lowerCommand === 'hi') {
                outputArea.innerHTML = outputArea.innerHTML + '<p style="color: magenta;">Hello there!</p>';
            }
            else if (lowerCommand === 'ls') {
                outputArea.innerHTML = outputArea.innerHTML + '<p>Documents  Downloads  Pictures  index.html  style.css</p>';
            }
            else if (lowerCommand === 'pwd') {
                outputArea.innerHTML = outputArea.innerHTML + '<p>/home/student</p>';
            }
            else if (lowerCommand !== '') {
                outputArea.innerHTML = outputArea.innerHTML + '<p style="color: red;">Command not found: ' + lowerCommand + '</p>';
            }
            
            // Clear the input field
            inputField.value = '';
            
            // Auto-scroll to bottom
            var contentDiv = document.querySelector('#terminal .windowcontent');
            if (contentDiv) {
                contentDiv.scrollTop = contentDiv.scrollHeight;
            }
        }
    }
    
    console.log('Terminal is ready!');
}, 1000); // Wait 1 second for everything to load

// ===== END TERMINAL CODE =====