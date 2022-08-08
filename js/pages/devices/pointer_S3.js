currentPage = 'pointer_S3'
currentCategory = 'devices'
hasPreview = true

const previewWrapper = document.querySelector('.preview-wrapper')

/* -----------------
Preview Slider Setup
----------------- */
const slider = document.querySelector('.slider')

let slides = document.getElementsByName('slide')

const clonedSlide = slides[0].cloneNode(true)
slider.append(clonedSlide)

let interval = 4200,
    transitionDuration = 1100
