currentPage = 'home'
currentCategory = 'home'

const vid = document.getElementById('introVideo')

let indexNavigation

window.addEventListener('load', () => {
    indexNavigation = document.getElementById('fp-nav')

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

function showIndexNavigation() {
    indexNavigation.removeEventListener('transitionend', removeIndexNavigation)
    indexNavigation.style.display = 'initial'
    setTimeout(() => {
        indexNavigation.style.opacity = '1'
    }, 10)
}

function hideIndexNavigation() {
    indexNavigation.style.opacity = '0'
    indexNavigation.addEventListener('transitionend', removeIndexNavigation)
}

function removeIndexNavigation() {
    indexNavigation.style.display = 'none'
}
