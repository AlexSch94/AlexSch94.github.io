currentPage = 'home'
currentCategory = 'home'

// Main page functionality
;(function () {
    /* --------
    Intro video
    -------- */
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
})()

/* ---------- 
Scroll prompt 
---------- */
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

/* -------------------------------------
Hide index navigation while menu is open
------------------------------------- */

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

/* -----------------
Sustainability cards
----------------- */

const cardsWrapper = document.querySelector('.cards-wrapper'),
    cardObserverOptions = {
        threshold: 1,
    }

const cardObserver = new IntersectionObserver(function (
    entries,
    attibuteObserver
) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('come-in')
        }
    })
},
cardObserverOptions)

cardObserver.observe(cardsWrapper)
