// --------------------
//  Initialise globals
// --------------------
const isTouch = 'ontouchstart' in window || 0 < navigator.msMaxTouchPoints,
    logoLink = document.querySelector('.logo-container').querySelector('a'),
    scrollToTopBtns = document.querySelectorAll('.scroll-to-top-btn'),
    cacheParam = '?v=04.07.2023',
    currentLanguage = document.documentElement.getAttribute('lang'),
    navBar = document.querySelector('.nav-bar')

let isIOS = false
if (navigator.userAgent.match(/(iPhone|iPad)/)) {
    isIOS = true
}

let isFirefox = false
if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
    isFirefox = true
}

// Scroll to top events
if (scrollToTopBtns) {
    scrollToTopBtns.forEach((button) => button.addEventListener('click', () => scrollToTop()))

    scrollToTopBtns.forEach((button) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                scrollToTop()

                if (logoLink) {
                    logoLink.focus()
                    document.activeElement.blur()
                }
            }
        })
    })
}

function scrollToTop() {
    window.scrollTo(0, 0)
}

// -----------------------------
//       Generic helpers
// -----------------------------
function preventDefault(e) {
    e.preventDefault()
}

// Force refresh of DOM element by replacing itself
function replaceElement(e) {
    const element = e,
        copy = e.clone()

    copy.replaceElement(element)
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
var supportsPassive = false
try {
    window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
            get: function () {
                return (supportsPassive = true)
            },
        })
    )
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false
let wheelEvent = 'onwheel' in document ? 'wheel' : 'mousewheel'

// Prevent middle mouse button scrolling
function preventMiddleMouseScroll(e) {
    if (e.buttons === 4) {
        preventDefault(e)
    }
}

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
