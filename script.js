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
dragElement(document.getElementById("gallery"));
dragElement(document.getElementById("clock"));
dragElement(document.getElementById("message"));
dragElement(document.getElementById("music"));
dragElement(document.getElementById("browser"));

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



const resources = [
  { name: "a lazy person", path: "./Resources/a lazy person.png" },
  { name: "my thoughts", path: "./Resources/my thoughts.jpg" },
  { name: "choose wallpaper", path: "./Resources/choose wallpaper.jpg" },
  { name: "earth is crying", path: "./Resources/music.jpg" },
  { name: "calender", path: "./Resources/calender.jpg" },
  { name: "my photo", path: "./Resources/my photo.jpg" },
  { name: "wallpaper", path: "./Resources/wallpaper.jpg" },
  { name: "lazy", path: "./Resources/LAZY.png" },
  {name: "main back", path: "./Resources/main back.jpg"},
  {name: "not so lazy", path: "./Resources/not so lazy.jpg"},
  {name:"a world after the horizon", path: "./Resources/browser.jpg"},
];

let currentPhotoIndex = 1;

const photoElement = document.getElementById("photo-display");
const photoNameElement = document.getElementById("photo-name");

function displayPhoto(index){
    const resource = resources[index];
    photoElement.style.backgroundImage = `url('${encodeURI(resource.path)}')`;
    photoNameElement.textContent = resource.name;
}

const previousButton = document.getElementById("previous-photo");
const nextButton = document.getElementById("next-photo");

nextButton.addEventListener("click", function() {
  currentPhotoIndex = (currentPhotoIndex + 1) % resources.length;
  displayPhoto(currentPhotoIndex);
});

previousButton.addEventListener("click", function() {
  currentPhotoIndex = (currentPhotoIndex - 1 + resources.length) % resources.length;
  displayPhoto(currentPhotoIndex);
});

// Add this line at the very bottom of script.js
displayPhoto(currentPhotoIndex);

// clock logic

const clockHours = document.getElementById('clock-hours');
const clockMunite = document.getElementById('clock-munite');
const clockColon = document.getElementById('clock-colon');

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    clockHours.textContent = hours;
    clockMunite.textContent = minutes;
}

updateClock();
setInterval(updateClock, 1000);

// music logic

const Songs = [
    "./Resources/music/music-1.mp3",
    "./Resources/music/music-2.mp3",
    "./Resources/music/music-3.mp3"
];

let currentSongIndex = 0;

const playButton = document.getElementById('play-pause-btn');
const priviousMusicButton = document.getElementById('prev-btn');
const nextMusicButton = document.getElementById('next-btn');
const cd = document.getElementById('cd');

let isPlaying = false;
let currentSong = Songs[currentSongIndex]; // load for the first time
let audio_url = encodeURI(currentSong); // make the url
let audio = new Audio(currentSong); // create audio object

// when changeing music, its changeing index, and helper function loads new song and update ui 
function changeCurrentTrack() {
    audio.pause(); //stop the privious audio
    audio_url = encodeURI(Songs[currentSongIndex]); //load the new song
    audio.src = audio_url; // update url
    audio.load(); // load it to play

    // change ui, waiting for user to confirm play
    isPlaying = false;
    playButton.innerHTML = '&#9654;';
    cd.classList.remove('playing');
}

// privious and next buttons
priviousMusicButton.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex - 1 + Songs.length) % Songs.length;
    changeCurrentTrack();
});
nextMusicButton.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex + 1) % Songs.length;
    changeCurrentTrack();
});

playButton.addEventListener('click', function() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        playButton.innerHTML = '&#10074;&#10074;';
        cd.classList.add('playing');

        audio.play()

    } else {
        audio.pause()
        playButton.innerHTML = '&#9654;';
        cd.classList.remove('playing');
    }
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    playButton.innerHTML = '&#9654;';
    cd.classList.remove('playing');
});

// motivational quotes logic  
const qute_box = document.getElementById('middle-bar-for-quote');

fetch("https://dummyjson.com/quotes/random")
  .then(response => response.json())
  .then(data => {
    if (qute_box) {
      qute_box.textContent = data.quote;   
      console.log(data.quote);
    }
  })


// browser logic
const searchInput = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');

function doSearch(query){
    if (query) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
    }
}

searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim();
    doSearch(query);
    searchInput.value = '';
});

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        doSearch(query);
        searchInput.value = '';
    }
});