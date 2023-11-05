const socket = io()

const $msgForm = document.getElementById('message-form')
const $messages = document.getElementById('messages')
const $message = $msgForm.querySelector('#message')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// Templates
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML
const messageTemplate = document.getElementById('message-template').innerHTML

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})

$msgForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = $message.value.trim()

  socket.emit('sendMessage', { message, username }, (error) => {
    $message.value = ''

    if (error) return alert(error)
  })
})

socket.on('message', ({ message, userSending }) => {
  const msgClass = userSending === username ? 'alert-success' : 'alert-warning'
  const html = Mustache.render(messageTemplate, { message, msgClass })

  $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('roomData', ({ room, users }) => {
  const $sideBar = document.getElementById('sidebar')
  $sideBar.innerHTML = Mustache.render(sidebarTemplate, { room, users })
})
