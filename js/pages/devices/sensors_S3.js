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

    // Animate in cards
    const sensorCardObserverOptions = { threshold: 0.3 }
    const sensorCardObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    }, sensorCardObserverOptions)

    sensorContainers.forEach((sensorContainer) =>
        sensorCardObserver.observe(sensorContainer)
    )

    // Lazy load images
    let sensorImages = []
    sensorContainers.forEach((container) => {
        sensorImages.push(container.querySelector('img'))
    })

    const sensorImageObserverOptions = { rootMargin: '300px' }
    const sensorImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.imgSrc = entry.target.dataset.src
            if (entry.isIntersecting) {
                entry.target.setAttribute('src', entry.imgSrc)
            }
        })
    }, sensorImageObserverOptions)

    sensorImages.forEach((img) => sensorImageObserver.observe(img))

    // -----------------
    // Attribute section
    // -----------------

    const attributeHeader = document.querySelector('.sub-header-2')

    const attributeHeaderObserverOptions = { threshold: 0.1 }
    const attributeHeaderObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    }, attributeHeaderObserverOptions)

    attributeHeaderObserver.observe(attributeHeader)
})()
