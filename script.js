const timeElement = document.getElementById('time');

function updateTime() {
    let currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = currentTime;
}
// the clock will update every second
setInterval(updateTime, 1000);


function dragElement(elmnt){
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
    function ElementDrag(e){
        e=e|| window.event;
        e.preventDefault();
        currentX = initX - e.clientX;
        currentY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;

        elmnt.style.top = (elmnt.offsetTop - currentY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - currentX) + "px";
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