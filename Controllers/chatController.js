var BaseController = require("./baseController"),
    fs = require("fs");
//model = new (require("../models/ContentModel")),

module.exports = BaseController.extend ({
    on : function(io, socket) {
        socket.on('message', function(msg){
            io.sockets.emit( 'message', msg );
        });
    }
});
