;(function () {
    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        sectionObserverOptions = { threshold: 0 }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    }, sectionObserverOptions)

    sections.forEach((section) => sectionObserver.observe(section))

    // Delete Cookies btn
    const deleteCookiesBtn = document.getElementById('deleteCookiesBtn')
    deleteCookiesBtn.addEventListener('click', () => {
        localStorage.removeItem('allowMaps')
        localStorage.removeItem('hideScrollPrompt')
    })
})()
