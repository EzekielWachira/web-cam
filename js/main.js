let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const photos = document.getElementById('photos')
const photoButton = document.getElementById('photo-button')
const clearButton = document.getElementById('clear-btn')
const photoFilter = document.getElementById('photo-filter')

navigator.mediaDevices.getUserMedia(
    {
        video: true,
        audio: false
    }
).then((stream) => {
    video.srcObject = stream
    video.play()
}).catch((error) => {
    console.log(error);
}) 


video.addEventListener('canplay', (e) => {
    if(!streaming){
        height = video.videoHeight / (video.videoWidth / width)

        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)

    }
}, false)


photoButton.addEventListener('click', (e) => {
    takePicture()
    e.preventDefault()
}, false)

function takePicture(){
    const context = canvas.getContext('2d')    
    if(width && height){
        canvas.height = height
        canvas.width = width
        context.drawImage(video, 0, 0, width, height)

        const imageUrl = canvas.toDataURL('image/png')
        console.log(imageUrl);

        const img = document.createElement('img')
        img.setAttribute('src', imageUrl)
        img.style.filter = filter
        photos.appendChild(img)
    }
}

photoFilter.addEventListener('change', (e) => {
    filter = e.target.value
    video.style.filter = filter
    e.preventDefault()
})

clearButton.addEventListener('click', (e) => {
    photos.innerHTML = ''
    filter = 'none'
    video.style.filter = filter
    photoFilter.selectedIndex = 0
    e.preventDefault()
})