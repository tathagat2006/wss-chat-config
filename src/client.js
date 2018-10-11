var ws = new WebSocket('ws://localhost:8080')
ws.onclose('open', function() {
    console.log('connection opened to the server')
})