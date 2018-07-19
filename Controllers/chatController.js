/*
 * Controller to handle socket request related to Chat
 * @author  Isha CHopde
 */
const BaseController = require("./baseController"),
    fs = require("fs");

// Store the agent information.    
let agents = {};

// Stores the user information.
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

        socket.on('user-status-change', (user) => {
            const { userId, isOnline, isAgent} = user;
            let connectedUsers = []
            connectedUsers = (isAgent) ? agents[userId].connectedUsers : [userPool[userId].agent.id]
            
            connectedUsers.forEach(connectedUser => {
                userPool[connectedUser].socket.emit("user-status-change", user);
            });
        })

        socket.on('create-board', function(data) {
            userPool[data.chatBoardId] = {
                socket,
                userName: data.userName,
                id: data.chatBoardId,
            };

            if(data.isAgent) {
                agents[data.chatBoardId] = {
                    socket,
                    userName: data.userName,
                    id: data.chatBoardId,
                    connectedUsers: []
                };
                console.log(JSON.stringify(agents[data.chatBoardId].userName));
            } else {

                // Get available agent. Can be done separately, but for this exercise
                // assuption is agent is running before we run the user.
                const randomAgent = function (obj) {
                    var keys = Object.keys(obj)
                    return obj[keys[ keys.length * Math.random() << 0]];
                };


                //
                const agent = randomAgent(agents);

                // Store user information in UserPool
                userPool[data.chatBoardId] = {
                    ...userPool[data.chatBoardId],
                    agent: agent
                };
                
                if(agent) {
                    agents[agent.id] = {
                        ...agents[agent.id],
                        connectedUsers: [
                            ...agents[agent.id].connectedUsers,
                            data.chatBoardId // Add new user to the agent connected user list.
                        ]
                    }
                    // Notify user agent is assigned.
                    socket.emit('agent-connected', {
                        userName: agent.userName,
                        id: agent.id,
                        isOnline: true
                    });

                    // Notify agent user is assigned.
                    agent.socket.emit('user-connected', {
                        name: data.userName,
                        id: data.chatBoardId,
                        isOnine: true
                    })
                }

            }
        });
    }
});

