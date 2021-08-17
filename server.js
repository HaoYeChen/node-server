const http = require("http");
const controller = require("./controller")

//callback function will be called everytime it get called outside
http.createServer(controller).listen(3003, function(){
    console.log("Server started, gå til http://localhost:3003");
});