class Cookies {
    static set(name, value, options) {
        const { days = 1, hours = null, minutes = null } = options
        let domain, domainParts, host

        let expires = ''
        if (options) {
            const date = new Date()
            let timeToAdd = 0
            timeToAdd += days * 24 * 60 * 60 * 1000
            timeToAdd += hours * 60 * 60 * 1000
            timeToAdd += minutes * 60 * 1000
            date.setTime(date.getTime() + timeToAdd)
            expires = '; expires=' + date.toUTCString()
        }

        host = location.host
        if (host.split('.').length === 1) {
            // no "." in a domain - it's localhost or something similar
            const cookie = name + '=' + value + expires + '; path=/'
            document.cookie = cookie
        } else {
            // Remember the cookie on all subdomains.
            // Start with trying to set cookie to the top domain. (example: if user is on foo.com, try to set cookie to domain ".com")
            // If the cookie will not be set, it means ".com" is a top level domain and we need to set the cookie to ".foo.com"
            domainParts = host.split('.')
            domainParts.shift()
            domain = '.' + domainParts.join('.')
            const cookie = name + '=' + value + expires + '; path=/; domain=' + domain
            document.cookie = cookie

            // Check if cookie was successfuly set to the given domain - otherwise it was a Top-Level Domain
            if (this.get(name) == null || this.get(name) != value) {
                domain = '.' + host // append "." to current domain
                const cookie = name + '=' + value + expires + '; path=/; domain=' + domain
                document.cookie = cookie
            }
        }
    }

    static get(name) {
        var nameEQ = name + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    static erase = (name) => this.set(name, '', { days: -1 })

    static resetLoginCookies() {
        this.erase('accessToken')
        this.erase('refreshToken')
    }
}

// --------------------
//  Initialise globals
// --------------------
const isTouch = 'ontouchstart' in window || 0 < navigator.msMaxTouchPoints,
    logoLink = document.querySelector('.logo-container').querySelector('a'),
    scrollToTopBtns = document.querySelectorAll('.scroll-to-top-btn'),
    cacheParam = '?v=03.07.2023',
    currentLanguage = document.documentElement.getAttribute('lang'),
    navBar = document.querySelector('.nav-bar'),
    isIOS = navigator.userAgent.match(/(iPhone|iPad)/) != null,
    isFirefox = window.navigator.userAgent.indexOf('Firefox') !== -1

// Which version of DOT Link was last logged into from this page
let savedVersionChoice = localStorage.getItem('useDotLink')
let use4 = savedVersionChoice != null && savedVersionChoice !== 'false' // true = use DL4.0
Cookies.resetLoginCookies()

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

function updateFavicon() {
    const favicon = document.getElementById('favicon')
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
    // console.log('Dark Mode:', isDarkMode);
    // console.log('Light Mode:', isLightMode);

    if (isDarkMode) {
        favicon.href = `/images/logos/dot_logo_white.svg${cacheParam}`
    } else if (isLightMode) {
        favicon.href = `/images/logos/dot_logo.svg${cacheParam}`
    } else {
        // Default to light mode if no preference is set
        favicon.href = `/images/logos/dot_logo.svg${cacheParam}`
    }
}

// Add an event listener to listen for changes to the color scheme preference
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)')

darkModeMediaQuery.addEventListener('change', updateFavicon)
lightModeMediaQuery.addEventListener('change', updateFavicon)

// Update the favicon on initial load
document.addEventListener('DOMContentLoaded', updateFavicon)

// -----------------------------
//       Generic helpers
// -----------------------------
scrollToTop = () => window.scrollTo(0, 0)
preventDefault = (e) => e.preventDefault()

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
    })
    clearTimeout(id)
    return response
}

// Force refresh of DOM element by replacing itself
function replaceElement(e) {
    const element = e
    const copy = e.cloneNode(true)
    element.replaceWith(copy)
}

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll' // Forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar' // Needed for WinJS apps
    document.body.appendChild(outer)
    const inner = document.createElement('div') // Creating inner element and placing it in the container
    outer.appendChild(inner)
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth // Difference between container's full width and the child width
    outer.remove() // Removing temporary elements
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
        // 37: true,
        38: true,
        // 39: true,
        40: true,
    },
    allowedKeys = []

function preventDefaultForScrollKeys(e) {
    if (scrollKeys[e.keyCode]) {
        preventDefault(e)
        return false
    }
}

// Modern Chrome requires { passive: false } when adding event
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
    allowedKeys.forEach((key) => (scrollKeys[key] = true))
    allowedKeys = []
}

function cubicEaseOut(inputValue, minValue) {
    if (inputValue <= 0) return minValue
    const maxInput = 100 // Maximum 100%
    const t = inputValue / maxInput
    return minValue + (1 - Math.pow(1 - t, 2)) * (inputValue - minValue) // Eased value
}

function calculateVisiblePercentage(element, offset = 0) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const visibleHeight = Math.min(rect.bottom - offset, windowHeight) - Math.max(rect.top - offset, 0)

    if (visibleHeight > 0) {
        const visiblePercentage = (visibleHeight / rect.height) * 100
        return Math.min(visiblePercentage, 100) // Ensure no more than 100%
    }
    return 0 // Element is not visible
}

const base64UrlDecode = (str) => atob(str.replace(/-/g, '+').replace(/_/g, '/'))

// ------------------------------------------------------
// ------------------- Login handling -------------------

let errorContainer
let errorMessageElement
const loginForm = document.getElementById('loginForm')
if (loginForm) {
    // Handling applies only on pages with login form
    const vSwitchBtnContainer = document.querySelector('.vswitch-btn-container')
    errorContainer = document.getElementById('errorContainer')
    errorMessageElement = document.getElementById('errorMessage')
    if (use4) vSwitchBtnContainer.classList.add('useNew') // Initial selection
    vSwitchBtnContainer.addEventListener('click', () => {
        use4 = !use4
        localStorage.setItem('useDotLink', use4) // Save for future
        use4 ? vSwitchBtnContainer.classList.add('useNew') : vSwitchBtnContainer.classList.remove('useNew')
    })
}
