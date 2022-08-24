const video = document.querySelector("video");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress .progress__filled");
const togglePlay = document.querySelector("button[title='Toggle Play']");
const tracks = document.querySelectorAll("input[type='range']");
const plays = document.querySelectorAll("button[data-skip]");

let play = false;

function updataProgressFilled(){
    progressBar.style.flexBasis = (video.currentTime / video.duration * 100).toString() + "%";
}

setInterval(updataProgressFilled, 1);

function updateProgress(e){
    // console.log(e);

    const dragTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = dragTime;
    updataProgressFilled();
};

function playStop(){
    play = !play;
    if (play){
        video.play();
        togglePlay.innerHTML = "||";
    } else {
        video.pause();
        togglePlay.innerHTML = "►";
    }
        
};

function changeTrack(){
    // console.log(this.value);
    video[this.name] = this.value;
};

function changePlay(){
    console.log(this["data-skip"]);
    video.currentTime += parseInt(this.dataset.skip);
};

function keyChangePlay(e){
    // console.log(e);
    if (e.code == "ArrowLeft"){
        video.currentTime -= 10;
    } else if (e.code == "ArrowRight"){
        video.currentTime += 10;
    };
};

togglePlay.addEventListener("click", playStop);
video.addEventListener("click", playStop);
document.addEventListener("keydown", (e) => {if (e.code == "Space") playStop();});
document.addEventListener("keydown", keyChangePlay);

tracks.forEach(track => track.addEventListener("click", changeTrack));
tracks.forEach(track => track.addEventListener("mousemove", changeTrack));
plays.forEach(play => play.addEventListener("click", changePlay));

let mousedown = false;
progress.addEventListener('click', updateProgress);
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
progress.addEventListener("mousemove", () => {if(mousedown){updateProgress};});