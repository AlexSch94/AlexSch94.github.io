currentPage = 'home'
currentCategory = 'home'

window.addEventListener('load', () => {
    document.body.classList.add('ldd')
})

const overlayLogo = document.querySelector('.overlay-logo'),
    overlayText = document.querySelector('.overlay-text-container')

overlayLogo.addEventListener('animationend', () => {
    overlayText.style.top = `${overlayLogo.getBoundingClientRect().bottom}px`
})
