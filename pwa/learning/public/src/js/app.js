if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('Service worker registered'))
}

var deferredPrompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt fired')
  e.preventDefault()
  deferredPrompt = e
  return false
})
