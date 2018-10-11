var WebSocketserver = require('ws').Server,
ws = new WebSocketserver({port:8080})

Connection: Upgrade;
Upgrade: websocket;
ws.on('connection', function(socket) {
    console.log('clients connected')
    socket.on('message', function() {
        console.log(message)
    })
})