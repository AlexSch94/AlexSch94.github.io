currentPage = 'home'
currentCategory = 'home'

const preloader = document.getElementById('preloader'),
    sectionAnimation = document.getElementById('sectionAnimation'),
    overlayLogoContainer = document.querySelector('.overlay-logo'),
    overlayLogo = overlayLogoContainer.querySelector('img'),
    vid = document.getElementById('introVideo')

// Main page functionality
;(function () {
    // -------------------------
    //  Page load / intro video
    // -------------------------
    const loadStart = new Date(),
        preloader = document.getElementById('preloader'),
        sectionAnimation = document.getElementById('sectionAnimation'),
        overlayLogo = overlayLogoContainer.querySelector('img')

    let loaderTimeout = 0

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

        // Add smoothing time if loader becomes visible
        // if (loadTime > 200) {
        //     loaderTimeout = 1000
        // }
        loaderTimeout = 100000

        setTimeout(() => {
            // Remove fade and add src to img late for visually smooth loading (img pops up if not delayed -> it already loads for navbar)
            preloader.classList.add('ldd')
            preloader.addEventListener('transitionend', () => {
                preloader.remove()
            })

            // Start Video / Animations
            vid.play()
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
// Hide index navigation while menu is open
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
