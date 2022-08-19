import incrementCounter from '../utils/incrementCounter.js'

// Page Closure
;(function () {
    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        solarparkSection = document.getElementById('solarParkSection'),
        solarPowerCounter = document.getElementById('solarPowerCounter2'),
        partnersSection = document.querySelector('.partners-section')

    let countersRan = false

    const sectionObserverOptions = { threshold: 0.2 }
    const sectionObserver = new IntersectionObserver(function (
        entries,
        sectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
                if (
                    entry.target === solarparkSection &&
                    countersRan === false
                ) {
                    incrementCounter(solarPowerCounter, 0, 2000000, 49)
                    countersRan = true
                }
            } else if (entry.target === partnersSection) {
                entry.target.classList.remove('come-in')
            }
        })
    },
    sectionObserverOptions)

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })
})()
