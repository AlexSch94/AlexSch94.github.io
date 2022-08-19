currentPage = 'home'
currentCategory = 'home'

const preloader = document.getElementById('preloader'),
    sectionAnimation = document.getElementById('sectionAnimation'),
    vid = document.getElementById('introVideo')

// Page closure
;(function () {
    // -------------------------
    //  Page load / intro video
    // -------------------------
    const loadStart = new Date(),
        preloader = document.getElementById('preloader'),
        sectionAnimation = document.getElementById('sectionAnimation')

    let loaderTimeout = 0

    // Disable fullpage scrolling until loaded
    myFullpage.setAllowScrolling(false)

    // Vid setup & loop
    vid.currentTime = 1.5
    vid.pause()
    vid.addEventListener('ended', () => {
        vid.currentTime = 8.3525
        vid.play()
    })

    window.addEventListener('load', () => {
        const loadEnd = new Date(),
            loadTime = loadEnd - loadStart

        // Let preloader run for min 1s if loadtime is long enough for animation to start
        if (loadTime >= 200) {
            loaderTimeout = 1200 - loadTime
            if (loaderTimeout < 0) loaderTimeout = 0
        }

        setTimeout(() => {
            // Remove preloader
            preloader.classList.add('ldd')
            preloader.addEventListener('transitionend', () => {
                preloader.remove()
            })

            // Enable fullpage scrolling
            myFullpage.setAllowScrolling(true)

            // Start video / animations
            vid.play()
            vid.setAttribute('data-autoplay', true)
            sectionAnimation.classList.remove('animation-pause')
        }, loaderTimeout)
    })
})()

// ---------------
//  Scroll prompt
// ---------------
const scrollPrompt = document.getElementById('scrollPrompt'),
    overlayText = document.querySelector('.overlay-text'),
    indexNavigationContainer = document.getElementById('fp-nav')

function showScrollPrompt() {
    setTimeout(() => {
        scrollPrompt.style.display = 'flex'
        setTimeout(() => {
            scrollPrompt.style.opacity = '1'
            scrollPrompt.style.transform = 'scale(1)'
        }, 10)
    }, 200)
}

function disableScrollPrompt() {
    scrollPrompt.addEventListener('transitionend', () => {
        scrollPrompt.style.display = 'none'
    })
    scrollPrompt.style.opacity = '0'
    scrollPrompt.style.transform = 'scale(0)'

    window.removeEventListener('keyup', validateScroll)
    window.removeEventListener('touchmove', validateScroll)
    window.removeEventListener('DOMMouseScroll', validateScroll)
    window.removeEventListener(wheelEvent, validateScroll)
    indexNavigationContainer.removeEventListener('click', validateScroll)

    localStorage.setItem('hideScrollPrompt', true)
}

function validateScroll() {
    setTimeout(() => {
        if (!document.body.classList.contains('fp-viewing-1')) {
            disableScrollPrompt()
        }
    }, 80)
}

if (!localStorage.getItem('hideScrollPrompt')) {
    overlayText.addEventListener('animationend', () => {
        showScrollPrompt()
    })

    scrollPrompt.addEventListener('click', () => {
        disableScrollPrompt()
    })

    window.addEventListener('keyup', validateScroll)
    window.addEventListener('touchmove', validateScroll)
    window.addEventListener('DOMMouseScroll', validateScroll)
    window.addEventListener(wheelEvent, validateScroll)
    indexNavigationContainer.addEventListener('click', validateScroll)
}

// ----------------------------------------
// Hide fullpage index navigation while menu is open
// ----------------------------------------
function showIndexNavigation() {
    indexNavigationContainer.removeEventListener(
        'transitionend',
        removeIndexNavigation
    )
    indexNavigationContainer.style.display = 'initial'
    setTimeout(() => {
        indexNavigationContainer.style.opacity = '1'
    }, 10)
}

function hideIndexNavigation() {
    indexNavigationContainer.style.opacity = '0'
    indexNavigationContainer.addEventListener(
        'transitionend',
        removeIndexNavigation
    )
}

function removeIndexNavigation() {
    indexNavigationContainer.style.display = 'none'
}
