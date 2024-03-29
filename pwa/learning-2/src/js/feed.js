var shareImageButton = document.querySelector('#share-image-button')
var createPostArea = document.querySelector('#create-post')
var closeCreatePostModalButton = document.querySelector(
  '#close-create-post-modal-btn'
)
var sharedMomentsArea = document.querySelector('#shared-moments')
let form = document.querySelector('form')
let titleInput = document.querySelector('#title')
let locationInput = document.querySelector('#location')

function openCreatePostModal() {
  // createPostArea.style.display = 'block'
  // setTimeout(() => {
  createPostArea.style.transform = 'translateY(0)'
  // }, 1)

  if (deferredPrompt) {
    deferredPrompt.prompt()

    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome)

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation')
      } else {
        console.log('User added to home screen')
      }
    })

    deferredPrompt = null
  }
}

function closeCreatePostModal() {
  createPostArea.style.transform = 'translateY(100vh)'
}

shareImageButton.addEventListener('click', openCreatePostModal)

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal)

// async function onSaveButtonClicked(e) {
//   if ('caches' in window) {
//     const userReqCache = await caches.open('user-req')
//     userReqCache.addAll(['https://httpbin.org/get', '/src/images/sf-boat.jpg'])
//   }
// }

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild)
  }
}

function createCard(data) {
  var cardWrapper = document.createElement('div')
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp'
  var cardTitle = document.createElement('div')
  cardTitle.className = 'mdl-card__title'
  cardTitle.style.backgroundImage = `url("${data.image}")`
  cardTitle.style.backgroundSize = 'cover'
  cardTitle.style.height = '180px'
  cardWrapper.appendChild(cardTitle)
  var cardTitleTextElement = document.createElement('h2')
  cardTitleTextElement.className = 'mdl-card__title-text'
  cardTitleTextElement.textContent = data.location
  cardTitleTextElement.style.color = 'black'
  cardTitle.appendChild(cardTitleTextElement)
  var cardSupportingText = document.createElement('div')
  cardSupportingText.className = 'mdl-card__supporting-text'
  cardSupportingText.textContent = data.title
  cardSupportingText.style.textAlign = 'center'
  // var cardSaveButton = document.createElement('button')
  // cardSaveButton.textContent = 'Save'
  // cardSaveButton.addEventListener('click', onSaveButtonClicked)
  // cardSupportingText.appendChild(cardSaveButton)
  cardWrapper.appendChild(cardSupportingText)
  componentHandler.upgradeElement(cardWrapper)
  sharedMomentsArea.appendChild(cardWrapper)
}

let networkDataRecived = false

function updateUI(posts) {
  posts.forEach((post) => {
    createCard(post)
  })
}

async function getDataFromStore() {
  try {
    const res = await fetch('http://localhost:5000/posts')
    const data = await res.json()

    if (!res.ok) return

    console.log('From web', data)
    networkDataRecived = true
    clearCards()
    updateUI(data)
  } catch (error) {
    console.log(error)
  }
}

getDataFromStore()

if ('indexedDB' in window) {
  readAllData('posts').then((data) => {
    if (!networkDataRecived) {
      console.log('From Cache', data)
      updateUI(data)
    }
  })
}

async function sentData() {
  try {
    const res = await fetch('http://localhost:5000/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        //prettier-ignore
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        image:
          'http://127.0.0.1:9199/v0/b/pwagram-practice.appspot.com/o/sf-boat.jpg?alt=media&token=0aacd8e0-976c-4c87-af2e-f570580f06fb',
      }),
    })

    const data = await res.json()
    console.log('From online sending data', data)
  } catch (error) {
    console.log(error)
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (titleInput.value.trim() === '' || locationInput.value.trim() === '') {
    alert('Please enter valid data')
    return
  }

  closeCreatePostModal()

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((sw) => {
      const post = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        image:
          'http://127.0.0.1:9199/v0/b/pwagram-practice.appspot.com/o/sf-boat.jpg?alt=media&token=0aacd8e0-976c-4c87-af2e-f570580f06fb',
      }

      writeData('sync-posts', post)
        .then(() => sw.sync.register('sync-new-posts'))
        .then(() => {
          const snackbarCotainer = document.querySelector('#confirmation-toast')
          const data = { message: 'Your Post was saved for syncing!' }
          snackbarCotainer.MaterialSnackbar.showSnackbar(data)
        })
        .then(() => {
          readAllData('sync-posts').then((data) => createCard(post))
        })
        .catch((e) => console.log(e))
    })
  } else {
    sentData()
  }
})
