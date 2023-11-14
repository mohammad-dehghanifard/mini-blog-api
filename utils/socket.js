const socket = require('socket.io');

let io;
module.exports = {
    init : (httpServer) => {
         io = socket(httpServer,{
            cors : {
                origin : "http://localhost:3000",
                method :["GET","POST","PUT","DELETE"]
            }
         });
         return io;
    },

    getIo : () => {
        if(!io){
            throw new Error("socket.io is not available...");
        }
        return io;
    }
}