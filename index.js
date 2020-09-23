const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');
const Role = db.role;

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Drop and Resync with { force: true }');
    initial();
});

app.use(express.static(path.join(__dirname + '/public')));

require('./app/router/router.js')(app);
io.on('connection', socket => {
    console.log('Some client connected');

    socket.on("vid", (image) => {
        // добавить функцию по обработке изображения
        io.emit("image", image);
    });
});

server.listen(PORT);

function initial() {
    Role.create({
        id: 1,
        name: "USER"
    });

    Role.create({
        id: 2,
        name: "ADMIN"
    });
}