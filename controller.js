const helpers = require("./helpers")
const logger = require("./logger");
const api = {};

api["/api/duck"] = require("./api/duck");
api["/api/cat"] = require("./api/cat");

module.exports = function(req, res){ // 2 argument

    logger(req, res);
    const url = req.url;
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;

    const regEx = /^\/((css|img|js)\/)?[\w-]+\.(html|css|png|jpe?g|js|gif|tiff|svg|bmp)$/i; // i = ignore lower or upper case
    let result = endpoint.match(regEx);

    if(result) {
        // helpers.sendFile(req, res, "./static/" + result[0]);
        helpers.streamFile(req, res, "./static/" + result[0]);
        return;
    }

    //hvis jeg er her, der ikke fundet et match
    // const apiRX = /^\/api\/\w+$/;
    // const apiRX = /^\/api\/\w+\/*\w+\/*\w+$/;
    const apiRX = /^(\/api\/\w+)(\/\w+)?$/;
    result = endpoint.match(apiRX);
    console.log(result);
    if(result){
        //hvis jeg er her, der fundet et match
        if(api[result[1]]){
            if(api[result[1]][req.method]){
                //hvis jeg er her, er der fundet en metode der matcher req.method
                api[result[1]][req.method].handler(req, res, result[2]);
                return;
            }
            helpers.send(req, res, {msg: "Metode ikke tilladt her"}, 405);
            return;
        }
    }

    console.log(result);

    // if(endpoint === "/index.html"){
    //     helpers.sendFile(req, res, "./static/index.html");
    //     return;
    // }

    // helpers.send(req, res, {message: "Ressource '" + endpoint + "' not avaliable"}, 404);
    helpers.send(req, res, {message: `Ressource '${endpoint}' not avaliable`}, 404);
    

    // helpers.send(req, res, {besked: "her kommer beskeden"});
    // res.statusCode = 200;
    // res.setHeader("Content-type", "text/plain");
    // res.end("Hello World...test");
}