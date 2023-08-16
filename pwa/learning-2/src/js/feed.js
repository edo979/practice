import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'

var shareImageButton = document.querySelector('#share-image-button')
var createPostArea = document.querySelector('#create-post')
var closeCreatePostModalButton = document.querySelector(
  '#close-create-post-modal-btn'
)
var sharedMomentsArea = document.querySelector('#shared-moments')

function openCreatePostModal() {
  createPostArea.style.display = 'block'
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
  createPostArea.style.display = 'none'
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

const url = 'https://httpbin.org/get'
let networkDataRecived = false

function updateUI(posts) {
  posts.forEach((post) => createCard(post))
}

getDocs(collection(db, 'posts'))
  .then((snapshot) => {
    return snapshot.docs.map((doc) => doc.data())
  })
  .then(function (data) {
    console.log('From web', data)
    networkDataRecived = true
    clearCards()
    updateUI(data)
  })

// if ('caches' in window) {
//   caches
//     .match(url)
//     .then((response) => {
//       if (response) return response.json()
//     })
//     .then((data) => {
//       if (!networkDataRecived) {
//         console.log('From cache', data)
//         updateUI(data)
//         createCard()
//       }
//     })
// }
