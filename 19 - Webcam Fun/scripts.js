const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const panel = document.querySelector('.controls');
const rgbs = document.querySelectorAll('.rgb input[type="range"]');

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
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = rgbCrop(pixels);
        // pixels = rgbSplit(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 20);
};

function rgbCrop(pixels){
    // console.log(pixels);
    for (let i = 0; i < pixels.data.length; i+=4) {
        for (let j=0;j<3;j++){
            // debugger;
            if (pixels.data[i+j] < rgbs[j*2].value){
                // debugger;
                pixels.data[i+j] = rgbs[j*2].value;
            };
            if (pixels.data[i+j] > rgbs[j*2+1].value){
                pixels.data[i+j] = rgbs[j*2+1].value;
            };
                
        };
    };
    return pixels;
};

function rgbSplit(pixels){
    for (let i = 0; i < pixels.data.length; i+=4){
        // dont need to care about undefined.
        pixels.data[i-50] = pixels.data[i];
        pixels.data[i+250] = pixels.data[i+1];
        pixels.data[i-500] = pixels.data[i+2];
    };
    return pixels;
}

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