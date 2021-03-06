var ws = new WebSocket('ws://localhost:8080/')
var nickname = ""


ws.onopen = function() {
    console.log('connection opened to the server')
}

function appendLog(type,nickname,message) {
    var messages = document.getElementById('messages')
    var messageElem = document.createElement('li')
    var preface_label;
    if(type == 'notification') {
        preface_label = "<span class=\"label label-info\">*</span>"
    } else if(type == "nick_update") {
        preface_label = "<span class=\"label label-warning\">*</span>"
    }else {
        preface_label = "<span class=\"label label-success\">" + nickname + "</span>"
    }
    var message_text = "<h2>" + preface_label + "&nbsp;&nbsp;" + message + "</h2>"
    messageElem.innerHTML = message_text
    messages.appendChild(messageElem)
}


ws.onmessage = function(e) {
    var data = JSON.parse(e.data)
    nickname = data.nickname
    appendLog(data.type,data.nickname,data.message)
    console.log("ID: [%s]", data.id, data.message)
}

function sendMessage() {
    var messageField = document.getElementById('message');
    if(ws.readyState == WebSocket.OPEN) {
        ws.send(messageField.value)
    }
    messageField.value = ""
    messageField.focus()
}

ws.onclose = function(e) {
    appendLog('Connection closed!')
    console.log('Connection closed!')
}

function disconnect() {
    ws.close()
}

