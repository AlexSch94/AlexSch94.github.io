currentPage = 'sustainability'
currentCategory = 'about'
;(function () {
    /* -------------
    Sections Observer
    ------------- */
    const sections = document.querySelectorAll('section'),
        solarparkSection = document.getElementById('solarParkSection'),
        solarPowerCounter = document.getElementById('solarPowerCounter2'),
        partnersSection = document.querySelector('.partners-section'),
        sectionObserverOptions = {
            threshold: 0.2,
        }

    const sectionObserver = new IntersectionObserver(function (
        entries,
        sectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
                if (entry.target === solarparkSection) {
                    incrementCounter(solarPowerCounter, 0, 2000)
                }
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    },
    sectionObserverOptions)

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })
})()
