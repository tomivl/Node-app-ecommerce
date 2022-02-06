const socket = io()
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')
let date = new Date()

btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        message: message.value,
        username: username.value,
        date: date.getDate()
    })
    
})

socket.on('chat:message', function(data){
    
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    <p>`
})
