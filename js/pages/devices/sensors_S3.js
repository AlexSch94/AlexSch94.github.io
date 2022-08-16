currentPage = 'sensors_S3'
currentCategory = 'devices'
hasPreview = true

const heroImgContainer = document.querySelector('.hero-img-container'),
    previewWrapper = document.querySelector('.preview-wrapper')

// --------------------
// Preview Slider Setup
// --------------------
const slider = document.querySelector('.slider')

let slides = document.getElementsByName('slide')

const clonedSlide = slides[0].cloneNode(true)
slider.append(clonedSlide)

let interval = 3700,
    transitionDuration = 1100

// Set smooth scroll behavior late (not performant while slider starts)
setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
}, 100)

// Closure page functions
;(function () {
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
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
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
