const socket = require('socket.io');

let io;
module.exports = {
    init : (httpServer) => {
         io = socket(httpServer);
         return io;
    }
}