currentPage = 'home'
currentCategory = 'home'

const overlayLogo = document.querySelector('.overlay-logo'),
    overlayText = document.querySelector('.overlay-text-container')

overlayLogo.addEventListener('animationend', () => {
    overlayText.style.top = `${overlayLogo.getBoundingClientRect().bottom}px`
})
