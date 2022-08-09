currentPage = 'applications'
currentCategory = 'applications'

// Main page functionality
;(function () {
    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        partnersSection = document.querySelector('.partners-section')

    const largeSectionObserverOptions = { threshold: 0.1 }
    const largeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    }, largeSectionObserverOptions)

    const mediumSectionObserverOptions = { threshold: 0.05 }
    const mediumSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    }, mediumSectionObserverOptions)

    const smallSectionObserverOptions = { threshold: 0.015 }
    const smallSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    }, smallSectionObserverOptions)

    // -------------------
    // Advantages observer
    // -------------------

    const advantageWrappers = document.querySelectorAll('.advantage-wrapper')

    const largeAdvantageObserverOptions = { threshold: 0.3 }
    const largeAdvantageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target.getBoundingClientRect().top > 1) {
                entry.target.classList.remove('come-in')
            }
        })
    }, largeAdvantageObserverOptions)

    const mediumAdvantageObserverOptions = { threshold: 0.1 }
    const mediumAdvantageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target.getBoundingClientRect().top > 1) {
                entry.target.classList.remove('come-in')
            }
        })
    }, mediumAdvantageObserverOptions)

    // --------------
    // Responsiveness
    // --------------
    function switchObservers(size) {
        if (size === 'large') {
            // Sections
            sections.forEach((section) => {
                largeSectionObserver.observe(section)
            })

            sections.forEach((section) => {
                mediumSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                smallSectionObserver.unobserve(section)
            })

            // Advantages
            advantageWrappers.forEach((advantageWrapper) =>
                largeAdvantageObserver.observe(advantageWrapper)
            )

            advantageWrappers.forEach((advantageWrapper) =>
                mediumAdvantageObserver.unobserve(advantageWrapper)
            )
        } else if (size === 'medium') {
            // Sections
            sections.forEach((section) => {
                largeSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                mediumSectionObserver.observe(section)
            })

            sections.forEach((section) => {
                smallSectionObserver.unobserve(section)
            })
            // Advantages
            advantageWrappers.forEach((advantageWrapper) =>
                largeAdvantageObserver.unobserve(advantageWrapper)
            )

            advantageWrappers.forEach((advantageWrapper) =>
                mediumAdvantageObserver.observe(advantageWrapper)
            )
        } else {
            sections.forEach((section) => {
                largeSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                mediumSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                smallSectionObserver.observe(section)
            })
            // Advantages
            advantageWrappers.forEach((advantageWrapper) =>
                largeAdvantageObserver.unobserve(advantageWrapper)
            )

            advantageWrappers.forEach((advantageWrapper) =>
                mediumAdvantageObserver.observe(advantageWrapper)
            )
        }
    }

    const solResizeHandler = (function () {
        let newScreenSize
        let screenSize

        function getScreenSize() {
            let width = window.innerWidth

            if (width > 1200) {
                newScreenSize = 'large'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'large'
            } else if (width > 700) {
                newScreenSize = 'medium'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'medium'
            } else {
                newScreenSize = 'small'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'small'
            }
        }

        function onScreenSizeChange(size) {
            if (size === 'large') {
                switchObservers(size)
            }
            if (size === 'medium') {
                switchObservers(size)
            }
            if (size === 'small') {
                switchObservers(size)
            }
        }

        getScreenSize()

        window.addEventListener('resize', getScreenSize)
    })()
})()
