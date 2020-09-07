const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path")
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const FPS = 10;
// const wCap = new cv.VideoCapture(0);

// wCap.set(cv.CAP_PROP_FRAME_HEIGTH, 400);
// wCap.set(cv.CAP_PROP_FRAME_WIDTH, 400);

app.use(express.static(path.join(__dirname + '/public')));

io.on('connection', socket => {
    console.log('Some client connected');

    socket.on("vid", (data) => {
        // добавить функцию по обработке изображения
        console.log("test", data)
        // socket.emit("image", image);
    });
});

server.listen(PORT);