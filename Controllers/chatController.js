var BaseController = require("./baseController"),
    fs = require("fs");
//model = new (require("../models/ContentModel")),
let agents = {};
let userPool = {};
module.exports = BaseController.extend ({
    on : function(io, socket) {
        socket.on('message', function(msg){
            const senderId = msg.senderId;
            const receiverId = msg.receiverId;

            const receiver = userPool[receiverId];
            receiver.socket.emit('message', msg);
        });

        socket.on('agent-assigned', function(data) {
            console.log(data);
        });

        socket.on('create-board', function(data) {

            console.log(data);
            userPool[data.chatBoardId] = {
                socket,
                userName: data.userName,
                id: data.chatBoardId
            };

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

                if(agent) {
                    // Notify user agent is assigned.
                    socket.emit('agent-connected', {
                        userName: agent.userName,
                        id: agent.id
                    });

                    // Notify agent user is assigned.
                    agent.socket.emit('user-connected', {
                        name: data.userName,
                        id: data.chatBoardId
                    })
                }

            }
        });
    }
});

