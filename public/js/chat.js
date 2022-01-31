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
    console.log(username.value, message.value)
})

socket.on('chat:message', function(data){
    
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    <p>`
})

const userCentroMensajes = document.getElementById('username')
const textoCentroMensajes = document.getElementById('texto')
const botonCentroMensajes = document.getElementById('enviar')

function addMessage(e) { 

  e.preventDefault()

  var mensaje = { 
    author: {
        email: userCentroMensajes.value, 
        nombre: document.getElementById('firstname').value, 
        apellido: document.getElementById('lastname').value, 
        edad: document.getElementById('age').value, 
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value
    },
    text: textoCentroMensajes.value
  }

  socket.emit('new-message', mensaje); 

  textoCentroMensajes.value = ''
  textoCentroMensajes.focus()

  botonCentroMensajes.disabled = true
}

userCentroMensajes.addEventListener('input', () => {
    let hayEmail = userCentroMensajes.value.length
    let hayTexto = textoCentroMensajes.value.length
    textoCentroMensajes.disabled = !hayEmail
    botonCentroMensajes.disabled = !hayEmail || !hayTexto
})

textoCentroMensajes.addEventListener('input', () => {
    let hayTexto = textoCentroMensajes.value.length
    botonCentroMensajes.disabled = !hayTexto
})