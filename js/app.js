// --------------------
//  Initialise globals
// --------------------
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
            scrollToTop()
        })
    })
}

function scrollToTop() {
    window.scrollTo(0, 0)
}

function preventDefault(e) {
    e.preventDefault()
}

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll' // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps
    document.body.appendChild(outer)

    // Creating inner element and placing it in the container
    const inner = document.createElement('div')
    outer.appendChild(inner)

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

    // Removing temporary elements
    outer.remove()

    return scrollbarWidth
}

// -----------------------------
//  Disabling / enabling scroll
// -----------------------------

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let scrollKeys = {
    32: true,
    33: true,
    34: true,
    35: true,
    37: true,
    38: true,
    39: true,
    40: true,
}

let allowedKeys = []

function preventDefaultForScrollKeys(e) {
    if (scrollKeys[e.keyCode]) {
        preventDefault(e)
        return false
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false
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

// Prevent middle mouse button scrolling
function preventMiddleMouseScroll(e) {
    if (e.buttons === 4) {
        preventDefault(e)
    }
}

let wheelOpt = supportsPassive ? { passive: false } : false
let wheelEvent = 'onwheel' in document ? 'wheel' : 'mousewheel'

function disableScroll(allowArray) {
    // Remove from scrollKeys => prevent disabling
    if (allowArray && allowArray.length > 0) {
        allowedKeys = allowArray
        allowedKeys.forEach((key) => {
            delete scrollKeys[key]
        })
    }
    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
    window.addEventListener('mousedown', preventMiddleMouseScroll, false)
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
    window.removeEventListener('touchmove', preventDefault, wheelOpt)
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    window.removeEventListener('mousedown', preventMiddleMouseScroll, false)

    // Reset scrollKeys
    allowedKeys.forEach((key) => {
        scrollKeys[key] = true
    })
    allowedKeys = []
}
