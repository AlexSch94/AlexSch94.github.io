;(function () {
    // Adjust padding to fit footer in 1 viewport
    const mainWrapper = document.querySelector('.main-wrapper'),
        footer = document.querySelector('footer')

    function setMainWrapperPadding() {
        let footerHeight = getComputedStyle(footer).getPropertyValue('height')
        mainWrapper.style.paddingBottom = footerHeight
    }

    window.addEventListener('resize', setMainWrapperPadding)

    setMainWrapperPadding()

    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        sectionObserverOptions = { threshold: 0.1 }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    }, sectionObserverOptions)

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })
})()
