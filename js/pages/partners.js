;(function () {
    // --------------------------
    // Partners sections Observer
    // --------------------------
    const partnersSection = document.querySelector('.partners-section'),
        partnersSectionObserverOptions = {}

    const partnersSectionObserver = new IntersectionObserver(function (
        entries,
        sectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    },
    partnersSectionObserverOptions)

    partnersSectionObserver.observe(partnersSection)
})()
