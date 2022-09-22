const buttons = document.querySelectorAll(".timer__controls button");
const custom = document.querySelector("form[name='customForm']");
const display = document.querySelector(".display");
let timerID;

function changeTime(currentLeft){
    let h, m, s;
    s = (currentLeft % 60).toString();
    m = Math.round(currentLeft / 60);
    h = (Math.round(m / 60)).toString();
    m = (m % 60).toString();
    h = h.padStart(2,"0");
    m = m.padStart(2,"0");
    s = s.padStart(2,"0");
    return h+":"+m+":"+s;
}

function countdown(timeLeft) {
    let currentLeft = timeLeft;
    const left = document.querySelector(".display__time-left");

    const endTime = document.querySelector(".display__end-time");
    endTime.textContent = changeTime(timeLeft);

    return () => {
        left.textContent = changeTime(currentLeft);
        currentLeft -= 1;
        if (currentLeft < 0){
            left.style.color = 'red';
            clearInterval(timerID);
        };
    };
};

function setTimer(e){
    clearInterval(timerID);
    let timeLeft;
    //for buttons
    if (this.nodeName.toLowerCase() == "button"){
        timeLeft = parseInt(this.dataset.time);
    } else {
        e.preventDefault();
        // for textContent
        // debugger;
        timeLeft = parseInt(this.childNodes[1].value) * 60;
        this.childNodes[1].value = "";
        // console.log(this);
        
    };
    const countFunc = countdown(timeLeft);
    timerID = setInterval(countFunc, 1000);
};

buttons.forEach(button => {
    button.addEventListener("click", setTimer);
});
custom.addEventListener("submit", setTimer);