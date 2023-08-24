const preloader = document.getElementById('preloader'),
    sectionAnimation = document.getElementById('sectionAnimation'),
    vid = document.getElementById('introVideo'),
    indexNavigationContainer = document.getElementById('fp-nav'),
    indexNavigationLinks = indexNavigationContainer.querySelectorAll('a'),
    footer = document.getElementById('footer'),
    footerLinks = footer.querySelectorAll('a')

// Page closure
;(function () {
    // ------------------------------------------------------------
    // ----------------- Page load / intro video ------------------
    // ------------------------------------------------------------
    const loadStart = new Date()

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
            if (document.body.classList.contains('fp-viewing-1')) {
                vid.play()
            }
            vid.setAttribute('data-autoplay', true)

            sectionAnimation.classList.remove('animation-pause')
        }, loaderTimeout)
    })
    // ----------------------------------------
    // ------------ Scroll prompt -------------
    // ----------------------------------------
    const scrollPrompt = document.getElementById('scrollPrompt'),
        overlayText = document.querySelector('.overlay-text')

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
})()

// ----------------------------------------
// --------------- Fullpage ---------------
// ----------------------------------------
function handleSlideChange() {
    setIndexNavPosition()
    setFPTabIndex()
}

// Set tabindex
indexNavigationLinks.forEach((link) => {
    link.tabIndex = '-1'
})

function setFPTabIndex() {
    setTimeout(() => {
        if (document.body.classList.contains('fp-viewing-6')) {
            footerLinks.forEach((link) => {
                link.tabIndex = '0'
            })
        } else {
            footerLinks.forEach((link) => {
                link.tabIndex = '-1'
            })
        }
    }, 10)
}
setFPTabIndex()

// Set fp-nav position according to footer height
function setIndexNavPosition() {
    footerHeight = footer.clientHeight
    setTimeout(() => {
        if (document.body.classList.contains('fp-viewing-6')) {
            let transform = `translateX(-50%) translateY(${-footerHeight}px)`
            indexNavigationContainer.style.transform = transform
        } else {
            indexNavigationContainer.style.transform = 'translateX(-50%) translateY(0)'
        }
    }, 10)
}

window.addEventListener(wheelEvent, handleSlideChange)
window.addEventListener('resize', handleSlideChange)
window.addEventListener('load', handleSlideChange)
window.addEventListener('touchmove', handleSlideChange)
indexNavigationContainer.addEventListener('click', handleSlideChange)
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setTimeout(() => {
            handleSlideChange()
        }, 100)
    }
})

//  Hide fullpage index navigation while menu is open
function showIndexNavigation() {
    indexNavigationContainer.removeEventListener('transitionend', removeIndexNavigation)
    indexNavigationContainer.style.display = 'initial'
    setTimeout(() => addIndexNavigation(), 10)
}

function hideIndexNavigation() {
    indexNavigationContainer.style.opacity = '0'
    indexNavigationContainer.addEventListener('transitionend', removeIndexNavigation)
}

function addIndexNavigation() {
    indexNavigationContainer.style.opacity = '1'
}

function removeIndexNavigation() {
    indexNavigationContainer.style.display = 'none'
}
