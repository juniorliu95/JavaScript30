const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const panel = document.querySelector('.controls');

let width=canvas.width;
let height=canvas.height;

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(localMediaStream => {
        // console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    });
};

function setAspectRatio(){
    const vh = video.videoHeight;
    const vw = video.videoWidth;
    const aspect = vh / vw;
    const sh = window.innerHeight - panel.offsetHeight;
    const sw = window.innerWidth;

    canvas.height= sh;
    canvas.width=sw;
    // console.log(canvas.height);

    width = panel.offsetWidth;
    height = parseInt(width * aspect);
    if (height > sh){
        height = sh;
        width = height / aspect;
    };

    ctx.clearRect(0, 0, width, 200);
}

function paintToCanvas(){
    setAspectRatio();
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = rgbSplit(pixels);
        // ctx.putImageData(pixels, 0, 0);
    }, 16);
};

function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    const photo = canvas.toDataURL('image/jpeg');
    // console.log(photo);
    const link = document.createElement('a');
    link.href = photo;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${photo}" alt="Handsome Man" /">`;
    // link.textContent = "Download image";
    strip.insertBefore(link, strip.firstChild);
};

getVideo();
video.addEventListener("canplay", paintToCanvas);
window.addEventListener("resize", setAspectRatio);