const socket = io()

const $msgForm = document.getElementById('message-form')
const $messages = document.getElementById('messages')
const $message = $msgForm.querySelector('#message')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// Templates
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})

$msgForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = $message.value.trim()

  socket.emit('sendMessage', message, (error) => {
    $message.value = ''

    if (error) return alert(error)
  })
})

socket.on('message', (message) => {
  const $newMsg = document.createElement('p')
  $newMsg.innerText = message
  $messages.insertAdjacentElement('beforeend', $newMsg)
})

socket.on('roomData', ({ room, users }) => {
  const $sideBar = document.getElementById('sidebar')
  $sideBar.innerHTML = Mustache.render(sidebarTemplate, { room, users })
})
