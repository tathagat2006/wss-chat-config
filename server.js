var WebSocketserver = require('ws').Server,
ws = new WebSocketserver({port:8080})

// Connection: Upgrade;
// Upgrade: websocket;

var clients = [];

ws.on('connection', function(ws) {
    var client_uuid = uuid.v4();
    var nickname = client_uuid.substr(0,8)
    clients.push({"id": id, "ws": ws, "nickname": nickname})
    console.log("clients [%s] connected", clients_uuid) 
})

ws.on('message', function(message) {
    for(var i = 0 ; i< clients.length; i++) {
        var clientSocket = clients[i].ws
        if(clientSocket.readyState == WebSocket.OPEN) {
            console.log("clients [%s]: %s", clients[i].id, message)
            clientSocket.send(JSON.stringify({
                'id': client_uuid,
                'message': message,
             }))
        }
    }
})

ws.on('close', function() {
    for(var i = 0;i< clients.length; i++) {
        if(clients[i].id == client_uuid) {
            console.log('client [%s] disconnected', client_uuid)
            clients.splice(i,1)
        }
    }
})