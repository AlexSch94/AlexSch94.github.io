currentPage = 'contact'
currentCategory = 'about'
;(function () {
    /* -------------
    Sections Observer
    ------------- */
    const sections = document.querySelectorAll('section'),
        sectionObserverOptions = {
            threshold: 0.1,
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

    /* ---------
    Contact form
    ---------- */
    const contactForm = document.getElementById('contactForm'),
        contactSubmitBtn = document.getElementById('contactSubmitBtn'),
        submitIndicator = document.getElementById('submitIndicator'),
        loadingDots = document.getElementById('loadingDots')

    function startLoader() {
        submitIndicator.style.display = 'flex'
        setTimeout(() => {
            submitIndicator.style.opacity = '1'
        }, 10)

        let loaderInterval = setInterval(() => {
            if (loadingDots.innerText.length < 3) {
                loadingDots.innerText += '.'
            } else {
                loadingDots.innerText = ''
            }
        }, 400)
    }

    contactForm.addEventListener('submit', (e) => {
        startLoader()
    })

    contactSubmitBtn.addEventListener('pointerdown', () => {
        contactSubmitBtn.classList.add('active')
    })

    contactSubmitBtn.addEventListener('pointerup', () => {
        contactSubmitBtn.classList.remove('active')
    })

    contactSubmitBtn.addEventListener('pointerleave', () => {
        contactSubmitBtn.classList.remove('active')
        contactSubmitBtn.blur()
    })
})()
