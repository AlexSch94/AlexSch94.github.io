currentPage = 'sensor_PRS-D'
currentCategory = 'products'

/* -----------------
Preview Slider Setup
----------------- */
const slider = document.querySelector('.slider')

let slides = document.getElementsByName('slide')

const clonedSlide = slides[0].cloneNode(true)
slider.append(clonedSlide)

let interval = 5500,
    transitionDuration = 1100
