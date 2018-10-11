var ws = new WebSocket('ws://localhost:8080')
ws.onclose('open', function() {
    console.log('connection opened to the server')
})

function sendMessage(){
    ws.send($('#message').val())
}

ws.onclose('message', function(e) {
    var data = JSON.parse(e.data)
    var messages = document.getElementById('messages')
    var message = document.createElement('li')
    message.innerHTML = data.message
    messages.appendChild(message)
})

