currentPage = 'job0002'
currentCategory = 'about'
;(function () {
    /* -------------
    Sections Observer
    ------------- */
    const sections = document.querySelectorAll('section'),
        sectionObserverOptions = {
            threshold: 0.07,
        }

    const sectionObserver = new IntersectionObserver(function (
        entries,
        sectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target.getBoundingClientRect().top > 1) {
                entry.target.classList.remove('come-in')
            }
        })
    },
    sectionObserverOptions)

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })
})()
