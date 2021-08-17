// const helpers = require("../helpers");
const {send} = require("../helpers");

module.exports = {
    GET: {
        params: ["id"],
        handler: function(req, res, params){
            send(req, res, {says: "Miauw", method: req.method, parm: p}, 200);
        }
    },
    POST: {
        handler: function(req, res){
            send(req, res, {says: "Miauw", method: req.method}, 200);
        }
    }
}