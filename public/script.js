const socket = io.connect(window.location.hostname);

socket.on('image', (image) => {
    const imageElem = document.getElementById('image');
    imageElem.src = `data:image/jpeg;base64,${image}`
});