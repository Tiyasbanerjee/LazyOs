const timeElement = document.getElementById('time');

function updateTime() {
    let currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = currentTime;
}
// the clock will update every second
setInterval(updateTime, 1000);



function dragElement(elmnt){

    const maxLeft = window.innerWidth - elmnt.offsetWidth;
    const maxTop = window.innerHeight - elmnt.offsetHeight - 30;

    let initX = 0;
    let initY = 0;
    let currentX = 0;
    let currentY = 0;
    
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = StartDragging;
    }else{
        elmnt.onmousedown = StartDragging;
    }

    function StartDragging(e){
        e = e || window.event;
        e.preventDefault();

        initX = e.clientX;
        initY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = ElementDrag;
    }
    function ElementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    let deltaX = e.clientX - initX; 
    let deltaY = e.clientY - initY;

    let targetLeft = elmnt.offsetLeft + deltaX; 
    let targetTop  = elmnt.offsetTop + deltaY;

    initX = e.clientX;
    initY = e.clientY;


    const minLeft = 0;
    const maxLeft = window.innerWidth - elmnt.offsetWidth;
    
    const minTop = 35;
    const maxTop = window.innerHeight - elmnt.offsetHeight;


    let clampedLeft = Math.max(minLeft, Math.min(targetLeft, maxLeft));
    let clampedTop = Math.max(minTop, Math.min(targetTop, maxTop));

    elmnt.style.left = clampedLeft + "px";
    elmnt.style.top = clampedTop + "px";
}
    function stopDragging(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
// its the logic to move elements
dragElement(document.getElementById("start-window"));
dragElement(document.getElementById("note"));
dragElement(document.getElementById("wallpaper"));
dragElement(document.getElementById("music"));
dragElement(document.getElementById("calculator"));

const closeButtons = document.querySelectorAll(".close-btn");
const openButtons = document.querySelectorAll(".start-button");

function closeWindow(windowId){
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = "none";
}

function openWindow(windowId){
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = "flex";
}

closeButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    const windowId = e.target.id.slice(0, -5);
    closeWindow(windowId);
  });
});

openButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    const windowId = e.target.id.slice(0, -13);
    openWindow(windowId);
  });
});

const windowElements = document.querySelectorAll(".window");
let topZIndex = 100;
windowElements.forEach(windowElement => {
    windowElement.addEventListener("mouseenter", function() {
        topZIndex++;
        windowElement.style.zIndex = topZIndex;
    });
});



const noteBookTabs = document.querySelectorAll(".note-book-tab");

noteBookTabs.forEach(tab => {
    tab.addEventListener("click", function() {
        noteBookTabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
    });
});


const noteBookSections = document.querySelectorAll(".note-book");

noteBookTabs.forEach(tab => {
    tab.addEventListener("click", function() {
        const targetId = this.id.replace("-tab", "");
        noteBookSections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = "flex";
            } else {
                section.style.display = "none";
            }
        });
    });
});