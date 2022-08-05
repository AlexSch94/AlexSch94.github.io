// Globals
let currentPage = '',
    currentCategory = '',
    hasPreview = false,
    mainMenuOpen = false

const isTouch = 'ontouchstart' in window || 0 < navigator.msMaxTouchPoints,
    navBar = document.querySelector('.nav-bar'),
    scrollToTopBtns = document.querySelectorAll('.scroll-to-top-btn')

let isIOS = false
if (navigator.userAgent.match(/(iPhone|iPad)/)) {
    isIOS = true
}

if (scrollToTopBtns) {
    scrollToTopBtns.forEach((button) => {
        button.addEventListener('click', () => {
            window.scrollTo(0, 0)
        })
    })
}

function preventDefault(e) {
    e.preventDefault()
}

function scrollToTop() {
    window.scrollTo(0, 0)
}

/* -----------------------
Disable / enable scrolling
----------------------- */

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var scrollKeys = { 32: 1, 33: 1, 34: 1, 35: 1, 37: 1, 38: 1, 39: 1, 40: 1 }

function preventDefaultForScrollKeys(e) {
    if (scrollKeys[e.keyCode]) {
        preventDefault(e)
        return false
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
    window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true
            },
        })
    )
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false
var wheelEvent = 'onwheel' in document ? 'wheel' : 'mousewheel'

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
    window.removeEventListener('touchmove', preventDefault, wheelOpt)
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
}
