export default class Slider {
    constructor(sliderWrapper, sliderOptions) {
        this.wrapper = sliderWrapper
        this.options = sliderOptions
        this.container = document.createElement('div')

        // Get slides and add name attribute to convert them to a live NodeList
        this.initialSlides = this.wrapper.querySelectorAll('[data-slide]')
        this.initialSlides.forEach((attribute) =>
            attribute.setAttribute('name', 'slide')
        )
        this.slides = document.getElementsByName('slide')

        // Methods
        this.nextSlide = function () {
            this.currentIndex++
            this.currentTranslate = this.setCurrentTranslate()
            this.setSliderPosition()

            // Allocate active classes to slides
            this.slides.forEach((slide) => {
                slide.classList.remove('active')
            })

            this.slides[this.currentIndex].classList.add('active')

            // Remove fixed on slider start to allow fade out
            if (this.currentIndex === 1) {
                this.slides[0].classList.remove('fixed')
            }

            // Reset from cloned slide to start after transition
            if (this.currentIndex === this.slides.length - 1) {
                this.currentIndex = 0
                setTimeout(() => {
                    this.slides.forEach((slide) => {
                        slide.classList.remove('active')
                    })
                    this.slides[this.currentIndex].classList.add('active')
                    //Add fixed to prevent flickering on slider reset
                    this.slides[this.currentIndex].classList.add('fixed')
                    this.resetSlider()
                }, this.transitionDuration + 100)
            }
        }

        this.getSliderWidth = () => this.container.getBoundingClientRect().width

        this.setCurrentTranslate = () =>
            this.currentIndex * -this.getSliderWidth()

        this.resetSlider = function () {
            // Move to start without transition
            this.container.style.transition = 'none'
            setTimeout(() => {
                this.setPositionByIndex()
            }, 10)
            // Add back transition and restart
            setTimeout(() => {
                this.container.style.transition = `transform ${this.transitionDuration}ms ease-in-out`
            }, 40)
        }

        this.setSliderPosition = () => {
            this.container.style.transform = `translateX(${this.currentTranslate}px)`
        }

        this.setPositionByIndex = () => {
            this.currentTranslate = this.currentIndex * -this.getSliderWidth()
            this.setSliderPosition()
        }

        this.pauseSlider = () => {
            if (this.active) {
                clearInterval(this.autoSlideTimer)
                clearInterval(this.startingTimeout)

                this.active = false
            }
        }

        this.resumeSlider = () => {
            if (!this.active) {
                this.autoSlideTimer = setInterval(() => {
                    this.nextSlide()
                }, this.interval)

                this.active = true
            }
        }

        //Pause in background
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState !== 'visible') {
                this.pauseSlider()
            } else {
                this.resumeSlider()
            }
        })

        this.controlSlider = function (newIndex) {
            // Stop
            clearInterval(this.autoSlideTimer)
            // Set Index and restart
            this.currentIndex = newIndex
            this.setPositionByIndex()
            this.resumeSlider()

            // Active class slide
            this.slides.forEach((slide) => {
                slide.classList.remove('active')
            })
            this.slides[this.currentIndex].classList.add('active')
        }

        // Init
        this.startingTimeout = null
        setUpSlider(this)
        initSlider(this)
    }
}

function setUpSlider(slider) {
    // Setup Wrapper
    slider.wrapper.classList.add('slider-wrapper')

    // Setup Container
    slider.wrapper.append(slider.container)
    slider.container.classList.add('slider-container')

    // Clone last slide and append them
    const clonedSlide = slider.slides[0].cloneNode(true)
    slider.container.append(clonedSlide)
    // Add classes to slides and move them into container
    for (let i = 0; i < slider.slides.length; i++) {
        slider.slides[0].classList.add('slide')
        slider.container.appendChild(slider.slides[0])
    }

    slider.active = false
    slider.autoSlideTimer = null

    // Get options
    slider.currentIndex = slider.options.startingSlide - 1 || 0
    slider.interval = slider.options.interval || 4000
    slider.transitionDuration = slider.options.transitionDuration || 1000
    slider.options.delay === undefined
        ? (slider.delay = slider.interval)
        : (slider.delay = slider.options.delay)

    // Responsiveness
    let timer
    window.addEventListener('resize', (e) => {
        clearInterval(slider.autoSlideTimer)
        clearTimeout(timer)

        slider.container.style.transition = 'none'
        timer = setTimeout(() => {
            slider.container.style.transition = `transform ${slider.transitionDuration}ms ease-in-out`
            slider.autoSlideTimer = setInterval(() => {
                slider.nextSlide()
            }, slider.interval)
        }, 50)
        slider.setPositionByIndex()
    })

    // Controls
    if (slider.options.controls) {
        // Container
        slider.controls = document.querySelector('[data-slider-controls]')
        slider.controls.classList.add('slider-controls')

        // Previous button
        slider.prevBtn = document.createElement('div')
        slider.prevBtn.classList.add('prev-btn')
        slider.controls.append(slider.prevBtn)

        slider.prevBtnImg = document.createElement('img')
        slider.prevBtnImg.setAttribute(
            'src',
            slider.options.controls.prevBtnSrc
        )
        slider.prevBtn.append(slider.prevBtnImg)

        slider.prevBtn.addEventListener('click', () => {
            if (slider.currentIndex > 0) {
                slider.controlSlider(slider.currentIndex - 1)
            } else {
                slider.controlSlider(slider.slides.length - 2)
            }
        })

        // Next button
        slider.nextBtn = document.createElement('div')
        slider.nextBtn.classList.add('next-btn')
        slider.controls.append(slider.nextBtn)

        slider.nextBtnImg = document.createElement('img')
        slider.nextBtnImg.setAttribute(
            'src',
            slider.options.controls.nextBtnSrc
        )
        slider.nextBtn.append(slider.nextBtnImg)

        slider.nextBtn.addEventListener('click', () => {
            if (slider.currentIndex < slider.slides.length - 2) {
                slider.controlSlider(slider.currentIndex + 1)
            } else {
                slider.controlSlider(0)
            }
        })
    }
}

function initSlider(slider) {
    slider.active = true

    slider.slides[slider.currentIndex].classList.add('active')
    // Set transition duration
    slider.container.style.transition = `transform ${slider.transitionDuration}ms ease-in-out`

    // Set translate to reflect starting slide
    if (slider.options.startingSlide) {
        slider.container.style.transition = 'none'
        slider.currentTranslate = slider.setCurrentTranslate()
        slider.setSliderPosition()
        setTimeout(() => {
            slider.container.style.transition = `transform ${slider.transitionDuration}ms ease-in-out`
        }, 550)
    }

    slider.startingTimeout = setTimeout(() => {
        // Start slider
        slider.nextSlide()

        slider.autoSlideTimer = setInterval(() => {
            slider.nextSlide()
        }, slider.interval)
    }, slider.delay)
}
