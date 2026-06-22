// Make windows draggable
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

// Initialize draggable windows
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("about"));

// Open and close window functions
function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "flex";
}

// Get elements
var welcomeScreen = document.getElementById("welcome");
var welcomeClose = document.getElementById("welcomeclose");
var welcomeOpen = document.getElementById("welcomeopen");
var aboutClose = document.getElementById("aboutclose");

// Add event listeners
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

// Update time function
function updateTime() {
    var now = new Date();
    var timeString = now.toLocaleTimeString();
    var timeElement = document.getElementById("timeElement");
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Call immediately on load

// Console message
console.log(" WebOS loaded successfully!");

// DOCK FUNCTIONALITY
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

// Close buttons for new windows
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

// Make new windows draggable
dragElement(document.getElementById('calculator'));
dragElement(document.getElementById('notes'));
dragElement(document.getElementById('settings'));
dragElement(document.getElementById('terminal'));