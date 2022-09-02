// -------------------
//  Initialise slider
// -------------------
import Slider from '../../utils/autoSlider.js'

const slider = new Slider(document.querySelector('[data-slider-wrapper]'), {
    interval: 3800,
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
    // Main image observer
    const header = document.querySelector('header'),
        mainImgWrapper = document.querySelector('.main-img-wrapper'),
        observerOptions = { threshold: 0.9 }

    const navBarObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                mainImgWrapper.classList.add('come-in')
                slider.pauseSlider()
            } else {
                slider.resumeSlider()
            }
        })
    }, observerOptions)

    navBarObserver.observe(header)
})()
