    const socket = io();

    socket.on('image', (image) => {
        const imageElem = document.getElementById('image');
        imageElem.src = `data:image/jpeg;base64,${image}`;
        console.log(imageElem.src);
    });
