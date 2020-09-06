const cv = require("opencv4nodejs")
const express = require("express");
const path = require("path")
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const FPS = 10;
const wCap = new cv.VideoCapture(0);

wCap.set(cv.CAP_PROP_FRAME_HEIGTH, 400);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 400);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode(".jpg", frame).toString("base64");
    io.emit("image", image);
}, 1000 / FPS)

server.listen(3000);