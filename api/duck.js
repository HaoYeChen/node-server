// const helpers = require("../helpers");
const {send} = require("../helpers");

module.exports = {
    GET: {
        params: ["id"],
        handler: function(req, res, p){
            //if true: there is / replace it & split it or else null
            let parms = p !== ""? p.replace("/", "").split("/"): null;
            send(req, res, {says: "Quack", method: req.method, parm: parms}, 200);
        }
    },
    POST: {
        handler: function(req, res){
            send(req, res, {says: "Quack", method: req.method}, 200);
        }
    }
}