const timeElement = document.getElementById('time');

function updateTime() {
    let currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = currentTime;
}

setInterval(updateTime, 1000);