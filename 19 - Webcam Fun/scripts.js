const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
};

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 20);
};

function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    const photo = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = photo;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${photo}alt="Handsome Man" /">`;
    // link.textContent = "Download image";
    strip.insertBefore(link, strip.firstChild);
};

getVideo();
video.addEventListener("canplay", paintToCanvas);