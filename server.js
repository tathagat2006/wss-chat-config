var WebSocketserver = require('ws').Server,
ws = new WebSocketserver({port:8080})

// Connection: Upgrade;
// Upgrade: websocket;

var clients = [];
var clientIdx = 1;

function wsSend(type,client_uuid,nickname,message) {
    for(var i = 0 ; i< clients.length; i++) {
        var clientSocket = clients[i].ws
        if(clientSocket.readyState == WebSocket.OPEN) {
            console.log("clients [%s]: %s", clients[i].id, message)
            clientSocket.send(JSON.stringify({
                'type':type,
                'id': client_uuid,
                'message': message,
                'nickname': nickname,
             }))
        }
    }
}

ws.on('connection', function(ws) {
    var client_uuid = uuid.v4();
    var nickname = "AnonymousUSER" + clientIdx
    clientIdx +=1;
    clients.push({"id": id, "ws": ws, "nickname": nickname})
    var connect_message = nickname + 'has connected!'
    wsSend('notification',client_uuid,nickname,connect_message)
})

ws.on('message', function(message) {
    if(message.indexOf('/nick') == 0) {
        var nickname_array = message.split(' ')
        if(nickname_array.length > 2) {
            var old_nickname = nickname;
            nickname = nickname_array[1]
            var nickname_message = "Client " + old_nickname + " changed to " + nickname
            wsSend('nick_update',client_uuid,nickname,message)
        } 
    }else {
        wsSend('message', client_uuid, nickname, message)
    }
})

var closeSocket = function(customMessage) {
    for(var i = 0; i<clients.length; i++) {
        if(clients[i].id == client_uuid) {
              var disconnect_message;
              if(customMessage) {
                  disconnect_message = customMessage
              }else {
                  disconnect_message = nickname + ' Disconnected!'
              }
              wsSend('notification',client_uuid,nickname,disconnect_message)
              clients.splice(i,1)
        }
    }
}

ws.on('close', function() {
   closeSocket();
})