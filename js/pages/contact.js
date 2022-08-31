;(function () {
    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        sectionObserverOptions = { threshold: 0.1 }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    }, sectionObserverOptions)

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })

    // -------------
    //  Google maps
    // -------------
    const googleMapsModule = document.querySelector('.google-map'),
        googleMapsSrc = googleMapsModule.dataset.src,
        googleMapsPlaceholder = document.querySelector(
            '.google-map-placeholder'
        ),
        enableGoogleMapsBtn = document.getElementById('gmAcceptBtn')

    enableGoogleMapsBtn.addEventListener('transitionend', (e) => {
        e.stopPropagation()
    })

    function enableGoogleMaps() {
        googleMapsModule.setAttribute('src', googleMapsSrc)

        googleMapsPlaceholder.style.opacity = '0'
        googleMapsPlaceholder.addEventListener('transitionend', () => {
            googleMapsPlaceholder.style.display = 'none'
        })

        localStorage.setItem('allowMaps', true)
    }

    if (localStorage.getItem('allowMaps') === 'true') {
        enableGoogleMaps()
    } else {
        googleMapsPlaceholder.style.display = 'flex'
    }

    enableGoogleMapsBtn.addEventListener('click', () => {
        enableGoogleMaps()
    })
})()
