currentPage = 'legal'
currentCategory = 'none'
;(function () {
    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        sectionObserverOptions = {
            threshold: 0,
        }

    const sectionObserver = new IntersectionObserver(function (
        entries,
        sectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    },
    sectionObserverOptions)

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })
})()
