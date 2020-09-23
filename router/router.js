const authJwt = require('./verifyJwtToken');

module.exports = function (app) {
    const controller = require("../controller/controller.js");
    app.post("/signin", controller.signin);
    app.get("/home", [authJwt.verifyToken], controller.homeBoard);
    app.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}