import incrementCounter from '../utils/incrementCounter.js'

// Page closure
;(function () {
    // -------------
    // Stat Counters
    // -------------
    const statsContainer = document.querySelector('.stats-container'),
        activeDeviceCounter = document.getElementById('activeDeviceCounter'),
        solarPowerCounter = document.getElementById('solarPowerCounter'),
        traveledCounter = document.getElementById('traveledCounter'),
        dataPointsCounter = document.getElementById('dataPointsCounter'),
        experienceCounter = document.getElementById('experienceCounter'),
        statOptions = {}

    let delay = 0,
        countersRan = false

    const statObserver = new IntersectionObserver(function (
        entries,
        statObserver
    ) {
        entries.forEach((entry) => {
            window.addEventListener(
                'load',
                () => {
                    if (entry.isIntersecting) {
                        delay = 700
                        entry.target.classList.add('delayed')
                    }
                },
                { once: true }
            )

            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')

                setTimeout(() => {
                    if (!countersRan) {
                        countersRan = true
                        setTimeout(() => {
                            incrementCounter(activeDeviceCounter, 0, 50000, 51)
                            incrementCounter(solarPowerCounter, 0, 2, 20)
                            incrementCounter(traveledCounter, 0, 875000000, 49)
                            incrementCounter(experienceCounter, 0, 20, 20)
                            incrementCounter(
                                dataPointsCounter,
                                0,
                                745000000,
                                49
                            )
                        }, delay)
                    }
                }, 10)
            }
        })
    },
    statOptions)

    statObserver.observe(statsContainer)

    // ---------------------------
    // Timeline & Header Observers
    // ---------------------------
    const timeline = document.querySelector('.timeline'),
        [...timelineSegs] = document.querySelectorAll('.timeline-segment'),
        [...headers] = document.querySelectorAll('.sub-header-2'),
        timelineOptions = { threshold: 0.1 },
        timelineAfterOptions = { threshold: 0.05 }

    const mainObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target.getBoundingClientRect().top > 1) {
                entry.target.classList.remove('come-in')
            }
        })
    }, timelineOptions)

    const timelineAfterObserver = new IntersectionObserver(function (
        entries,
        timelineAfterObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target.getBoundingClientRect().top > 1) {
                entry.target.classList.remove('come-in')
            }
        })
    },
    timelineAfterOptions)

    headers.forEach((header) => mainObserver.observe(header))
    timelineSegs.forEach((segment) => mainObserver.observe(segment))
    timelineAfterObserver.observe(timeline)

    // --------------------------
    // Partners sections Observer
    // --------------------------
    const partnersSection = document.querySelector('.partners-section'),
        partnersSectionObserverOptions = {
            threshold: 0.3,
        }

    const partnersSectionObserver = new IntersectionObserver(function (
        entries,
        sectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else {
                entry.target.classList.remove('come-in')
            }
        })
    },
    partnersSectionObserverOptions)

    partnersSectionObserver.observe(partnersSection)
})()
