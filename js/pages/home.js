currentPage = 'home'
currentCategory = 'home'

const vid = document.getElementById('introVideo')

window.addEventListener('load', () => {
    document.body.classList.add('ldd')

    // Start Video
    vid.currentTime = 1.5
    vid.play()
})

// Loop Video
vid.addEventListener('ended', () => {
    vid.currentTime = 8.3525
    vid.play()
})

const overlayLogo = document.querySelector('.overlay-logo'),
    overlayText = document.querySelector('.overlay-text-container')

overlayLogo.addEventListener('animationend', () => {
    overlayText.style.top = `${overlayLogo.getBoundingClientRect().bottom}px`
})
