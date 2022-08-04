;(function () {
    let currentIndex = 0,
        currentTranslate = 0,
        sliderWidth,
        sliderActive = false,
        autoSlideTimer

    // Init
    function initSlider() {
        // Allocate active classes
        slides[0].classList.add('active')

        setTimeout(() => {
            nextSlide()
            // Start slider
            autoSlideTimer = setInterval(nextSlide, interval)

            // Set transition duration
            slider.style.transition = `transform ${transitionDuration}ms ease-in-out`

            sliderActive = true
        }, interval * 0.7)
    }

    // Functions
    function nextSlide() {
        currentIndex++
        currentTranslate = currentIndex * -getSliderWidth()
        setSliderPosition()

        // Allocate active classes to slides
        slides.forEach((slide) => {
            slide.classList.remove('active')
        })
        slides[currentIndex].classList.add('active')

        // Remove fixed on slider start to allow fade out
        if (currentIndex === 1) {
            slides[0].classList.remove('fixed')
        }

        // Reset from cloned slide to start after transition
        if (currentIndex === slides.length - 1) {
            setTimeout(() => {
                currentIndex = 0
                slides.forEach((slide) => {
                    slide.classList.remove('active')
                })
                slides[currentIndex].classList.add('active')
                //Add fixed to prevent flickering on slider reset
                slides[currentIndex].classList.add('fixed')
                resetSlider()
            }, transitionDuration + 100)
        }
    }

    function resetSlider() {
        // Move to start without transition
        slider.style.transition = 'none'
        setTimeout(() => {
            setPositionByIndex()
        }, 10)
        // Add back transition and restart
        setTimeout(() => {
            slider.style.transition = `transform ${transitionDuration}ms ease-in-out`
        }, 40)
    }

    getSliderWidth = () => (sliderWidth = slider.getBoundingClientRect().width)

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -getSliderWidth()
        setSliderPosition()
    }

    function controlSlider(newIndex) {
        // Stop
        clearInterval(autoSlideTimer)
        // Set Index and restart
        currentIndex = newIndex
        setPositionByIndex()
        autoSlideTimer = setInterval(nextSlide, interval)

        // Active class slide
        slides.forEach((slide) => {
            slide.classList.remove('active')
        })
        slides[currentIndex].classList.add('active')
    }

    // Responsive to viewport
    let timer
    window.addEventListener('resize', () => {
        clearInterval(autoSlideTimer)
        clearTimeout(timer)

        slider.style.transition = 'none'
        timer = setTimeout(() => {
            slider.style.transition = `transform ${transitionDuration}ms ease-in-out`
            autoSlideTimer = setInterval(nextSlide, interval)
        }, 50)
        setPositionByIndex()
    })

    initSlider()
})()
