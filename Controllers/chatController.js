var BaseController = require("./baseController"),
    fs = require("fs");
//model = new (require("../models/ContentModel")),
let agents = {};
let userPool = {};
module.exports = BaseController.extend ({
    on : function(io, socket) {
        socket.on('message', function(msg){
            console.log(msg);
            const agentId = msg.agentId;
            agents[agentId].socket.emit('message', msg);
           // io.sockets.emit( 'message', msg );
        });

        socket.on('agent-assigned', function(data) {
            console.log(data);
        });

        socket.on('create-board', function(data) {
            console.log(data);
            if(data.isAgent) {
                agents[data.chatBoardId] = {
                    socket,
                    userName: data.userName,
                    id: data.chatBoardId
                };
                console.log(JSON.stringify(agents[data.chatBoardId].userName));
            } else {

                // Get available agent.
                const randomAgent = function (obj) {
                    var keys = Object.keys(obj)
                    return obj[keys[ keys.length * Math.random() << 0]];
                };


                //
                const agent = randomAgent(agents);
                console.log(agent);

              //  io.sockets.emit('agent-assigned', "dffdd" );
                socket.emit('agent-assigned', {
                    userName: agent.userName,
                    id: agent.id
                 });
            }
        });
    }
});
