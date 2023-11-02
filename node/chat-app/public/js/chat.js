const socket = io()

const $msgForm = document.getElementById('message-form')
const $messages = document.getElementById('messages')
const $message = $msgForm.querySelector('#message')

$msgForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = $message.value.trim()

  socket.emit('sendMessage', message, (error) => {
    $message.value = ''

    if (error) return console.log(error)
  })
})

socket.on('message', (message) => {
  const $newMsg = document.createElement('p')
  $newMsg.innerText = message
  $messages.insertAdjacentElement('beforeend', $newMsg)
})
