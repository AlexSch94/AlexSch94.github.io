// -------------------
//  Initialise slider
// -------------------
import Slider from '../../utils/autoSlider.js'

const slider = new Slider(document.querySelector('[data-slider-wrapper]'), {
    interval: 3700,
    transitionDuration: 1100,
    delay: 2500,
    controls: false,
})

// Set smooth scroll behavior late (not performant while slider starts)
setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
}, 100)

// Closure page functions
;(function () {
    const header = document.querySelector('header'),
        mainImgWrapper = document.querySelector('.main-img-wrapper'),
        observerOptions = { threshold: 0.9 }

    const navBarObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                mainImgWrapper.classList.add('come-in')
            }
        })
    }, observerOptions)

    navBarObserver.observe(header)

    // -----------------
    // Portfolio section
    // -----------------
    const sensorContainers = document.querySelectorAll('.sensor-container')

    const sensorObserverOptions = { threshold: 0.3 }
    const sensorObserver = new IntersectionObserver(function (
        entries,
        sensorObserver
    ) {
        entries.forEach((entry) => {
            entry.imgEl = entry.target.querySelector('img')
            entry.imgSrc = entry.imgEl.dataset.src
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
                entry.imgEl.setAttribute('src', entry.imgSrc)
            }
        })
    },
    sensorObserverOptions)

    sensorContainers.forEach((sensorContainer) =>
        sensorObserver.observe(sensorContainer)
    )

    // -----------------
    // Attribute section
    // -----------------

    const attributeHeader = document.querySelector('.sub-header-2')

    const attributeHeaderObserverOptions = { threshold: 0.1 }
    const attributeHeaderObserver = new IntersectionObserver(function (
        entries,
        sensorObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    },
    attributeHeaderObserverOptions)

    attributeHeaderObserver.observe(attributeHeader)
})()
