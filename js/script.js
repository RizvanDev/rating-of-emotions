"use strict"

const emojiContainer = document.querySelector('.stars__emotions')
const stars = document.querySelectorAll('.stars__star')
const eventTypes = ['mouseover', 'mouseout', 'click']

const notes = value => {
   const obj = {
      1: 'terribly!',
      2: 'badly!',
      3: 'not good!',
      4: `i'm just hate it!`,
      5: 'leaves much to be desired!',
      6: 'unsatisfactory!',
      7: 'not bad!',
      8: 'normal!',
      9: 'good!',
      10: 'excellent!',
   }
   return obj[value]
}

const setSmiles = value => {
   const obj = {
      1: './images/icons/evil-face.png',
      2: './images/icons/evil-face.png',
      3: './images/icons/confused-face.png',
      4: './images/icons/confused-face.png',
      5: './images/icons/emotionless-face.png',
      6: './images/icons/emotionless-face.png',
      7: './images/icons/smiley-with-squinted-eyes.png',
      8: './images/icons/smiley-with-squinted-eyes.png',
      9: './images/icons/smiley-face-with-stars.png',
      10: './images/icons/smiley-face-with-stars.png',
   }
   return obj[value]
}

const showValue = value => emojiContainer.children[0].innerHTML = notes(value)

const setValue = value => {

   emojiContainer.setAttribute('data-total', value)


   if (emojiContainer.getAttribute('data-total')) {

      stars.forEach(star => star.style.cursor = 'default')
      emojiContainer.children[1].style.opacity = "1"
      emojiContainer.children[1].setAttribute('src', setSmiles(value))

      for (const star of stars) {
         eventTypes.forEach(type => star.removeEventListener(type, chooseStars))
      }
   }
}

const chooseStars = event => {

   const starValue = event.currentTarget.dataset.estimation

   if (event.type === 'mouseover') {
      showValue(starValue)
      return stars.forEach((star, index) => index < starValue ? star.classList.add('--hover') : star.classList.remove('--hover'))
   }
   if (event.type === 'mouseout') {
      emojiContainer.children[0].innerHTML = '';
      return stars.forEach(star => star.classList.remove('--hover'))
   }
   if (event.type === 'click') {
      setValue(starValue)
      return stars.forEach((star, index) => index < starValue ? star.classList.add('--enable') : star)
   }
}

const chooseEvent = () => {
   for (const star of stars) {
      eventTypes.forEach(type => star.addEventListener(type, chooseStars))
   }
}
chooseEvent()

const resetValue = () => {

   const resetBtn = document.querySelector('.stars__reset')

   const reset = () => {

      emojiContainer.removeAttribute('data-total');
      emojiContainer.children[0].innerHTML = '';
      emojiContainer.children[1].removeAttribute('src')
      emojiContainer.children[1].style.opacity = "0"

      stars.forEach(star => star.classList.remove('--enable'));
      stars.forEach(star => star.style.cursor = 'pointer');
      chooseEvent()
   }

   return resetBtn.addEventListener('click', reset)
}
resetValue()