currentPage = 'company'
currentCategory = 'about'
;(function () {
    /* ----------
    Stat Counters 
    ----------- */
    // Delay until shown by animation
    let delay = 500

    const statsWrapper = document.querySelector('.stats-wrapper'),
        statsContainer = document.querySelector('.stats-container'),
        activeDeviceCounter = document.getElementById('activeDeviceCounter'),
        solarPowerCounter = document.getElementById('solarPowerCounter'),
        traveledCounter = document.getElementById('traveledCounter'),
        dataPointsCounter = document.getElementById('dataPointsCounter'),
        experienceCounter = document.getElementById('experienceCounter'),
        statOptions = {}

    const statObserver = new IntersectionObserver(function (
        entries,
        statObserver
    ) {
        entries.forEach((entry) => {
            window.addEventListener(
                'load',
                () => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('delayed')
                    }
                },
                { once: true }
            )

            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
                delay = 0
            }
        })
    },
    statOptions)

    statObserver.observe(statsContainer)

    setTimeout(() => {
        incrementCounter(activeDeviceCounter, 0, 50)
        incrementCounter(solarPowerCounter, 0, 2, 20)
        incrementCounter(traveledCounter, 0, 2.3, 23)
        incrementCounter(experienceCounter, 0, 20, 20)
        incrementCounter(dataPointsCounter, 0, 745)
    }, delay)

    /* -------------------------
    Timeline & Header Observers  
    ------------------------- */
    const timeline = document.querySelector('.timeline'),
        [...timelineSegs] = document.querySelectorAll('.timeline-segment'),
        [...headers] = document.querySelectorAll('.sub-header-2'),
        timelineOptions = {
            threshold: 0.1,
        },
        timelineAfterOptions = {
            threshold: 0.05,
        }

    const mainObserver = new IntersectionObserver(function (
        entries,
        mainObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else {
                if (!entry.target.classList.contains('sub-header-2')) {
                    entry.target.classList.remove('come-in')
                }
            }
        })
    },
    timelineOptions)

    const timelineAfterObserver = new IntersectionObserver(function (
        entries,
        timelineAfterObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else {
                entry.target.classList.remove('come-in')
            }
        })
    },
    timelineAfterOptions)

    headers.forEach((header) => mainObserver.observe(header))
    timelineSegs.forEach((segment) => mainObserver.observe(segment))
    timelineAfterObserver.observe(timeline)

    /* -------------
    Partners sections Observer
    ------------- */
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
