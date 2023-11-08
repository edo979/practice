const socket = io()

const $msgForm = document.getElementById('message-form')
const $messages = document.getElementById('messages')
const $message = $msgForm.querySelector('#message')
const $msgContainer = document.getElementById('message-container')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// Templates
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML
const messageTemplate = document.getElementById('message-template').innerHTML
const sysMessageTemplate = document.getElementById(
  'system-message-template'
).innerHTML

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})

$msgForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = $message.value.trim()

  socket.emit('sendMessage', message, ({ error }) => {
    $message.value = ''

    if (error) return alert(error)
  })
})

socket.on('message', ({ message, userSending }) => {
  const msgClass = userSending === username ? 'alert-success' : 'alert-warning'
  const html = Mustache.render(messageTemplate, {
    message,
    username: userSending,
    msgClass,
  })

  $messages.insertAdjacentHTML('beforeend', html)

  autoscroll()
})

socket.on('systemMsg', (message) => {
  const html = Mustache.render(sysMessageTemplate, { message })
  $messages.insertAdjacentHTML('beforeend', html)

  autoscroll()
})

socket.on('roomData', ({ room, users }) => {
  const $sideBar = document.getElementById('sidebar')
  $sideBar.innerHTML = Mustache.render(sidebarTemplate, { room, users })

  autoscroll()
})

function autoscroll() {
  const $newMsg = $messages.lastElementChild
  const newMsgStyle = getComputedStyle($newMsg)
  const newMsgMargin = parseInt(newMsgStyle.marginBottom)
  const newMsgHeight =
    $newMsg.offsetHeight + newMsgMargin + parseFloat(newMsgStyle.marginBottom)
  const visibleH = $msgContainer.offsetHeight
  const containerH = $msgContainer.scrollHeight
  const scrollOffset = $msgContainer.scrollTop + visibleH

  if (containerH - newMsgHeight <= scrollOffset)
    $msgContainer.scrollTop = $msgContainer.scrollHeight

  console.log('containerH', containerH)
  console.log('scrolloffset', scrollOffset)
  console.log('containerH - newMsgHeight', containerH - newMsgHeight)
  console.log('newMsgMargin', newMsgMargin)
}
