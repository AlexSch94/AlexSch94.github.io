;(function () {
    const partnersSection = document.querySelector('.partners-section'),
        partnersSectionObserverOptions = { threshold: 0.3 }

    const partnersSectionObserver = new IntersectionObserver(function (
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
    partnersSectionObserverOptions)

    partnersSectionObserver.observe(partnersSection)
})()
