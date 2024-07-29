;(function () {
    let currentJob = '',
        popoutOpen = false,
        popoutCloseBtn

    const mainContentEn =
        "At DOT, we believe in flexibility and diversity. That's why we can't provide a fixed job description, hours, or salary. We value each candidate's unique skills and experiences, tailoring the specifics of each person's role in the company accordingly.\nIf you are interested in the position, contact us, and let's shape your career together!"

    secondaryContendEn = () =>
        `Apply now, via mail at <span class="nowrap"><a href="mailto:karriere@dot-telematik.com?subject=Application DOT Telematik - ${currentJob}">karriere@dot-telematik.com</a></span>, or by calling us under <span class="nowrap">+43 660 40 44 144</span>`

    const contentDe =
        'Bei DOT glauben wir an Flexibilität und Vielfalt. Deshalb publizieren wir keine festen Stellenbeschreibungen, Arbeitszeiten oder Gehälter. Wir schätzen die einzigartigen Fähigkeiten und Erfahrungen jeder Bewerberin und jedes Bewerbers und passen die Details der Rolle in unserem Unternehmen entsprechend an. Wenn Interesse an der Position besteht, kontaktiere uns und lass uns gemeinsam deine Karriere gestalten!'

    secondaryContendDe = () =>
        `Bewirb dich jetzt via Email unter <span class="nowrap"><a href="mailto:karriere@dot-telematik.com?subject=Bewerbung DOT Telematik - ${currentJob}">karriere@dot-telematik.com</a></span>, oder telefonisch unter <span class="nowrap">+43 660 40 44 144</span>`

    const jobButtons = document.querySelectorAll('.job-button'),
        popoutWrapper = document.getElementById('popoutWrapper'),
        popout = document.getElementById('popout')

    jobButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentJob = btn.getAttribute('data-title')
            popout.innerHTML = innerPopout()
            openPopout()
        })
    })

    function innerPopout() {
        let btnSource =
            currentLanguage === 'en'
                ? './images/icons/icon-xmark.png' + cacheParam
                : '../images/icons/icon-xmark.png' + cacheParam

        return `
            <div class="popout-main">
                <div class="popout-text-container">
                    <h3 class="popout-header">${currentJob}</h3>

                    <div class="popout-description">
                        <p>${currentLanguage === 'en' ? mainContentEn : contentDe}</p>
                        <p>${currentLanguage === 'en' ? secondaryContendEn() : secondaryContendDe()}</p>
                        <p></p>
                    </div>
                </div>
            </div>

            <button id="popoutCloseBtn" class="popout-close-btn">
                <img src="${btnSource}" class="x-icon" draggable="false">
            </button>
        `
    }

    function openPopout() {
        popoutOpen = true
        popoutWrapper.style.display = 'flex'
        popout.classList.remove('popout-out')
        setTimeout(() => (popoutWrapper.style.opacity = '1'), 10)
        window.addEventListener('keydown', escapePopout)

        // Find close button and assign close function
        popoutCloseBtn = popout.querySelector('#popoutCloseBtn')
        popoutCloseBtn.addEventListener('click', () => closePopout())

        // Stop closeBtn transition from affecting popoutWrapper
        popoutCloseBtn.addEventListener('transitionend', (e) => e.stopPropagation())
    }

    function closePopout() {
        popoutOpen = false
        currentJob = ''
        popout.classList.add('popout-out')
        popoutWrapper.style.opacity = '0'
        popoutWrapper.addEventListener('transitionend', hidePopoutWrapper)
        window.removeEventListener('keydown', escapePopout)

        // Remove eventlisteners from closeBtn
        popoutCloseBtn.removeEventListener('click', () => closePopout())
        popoutCloseBtn.removeEventListener('transitionend', (e) => e.stopPropagation())
    }

    // Close popout on clicking header
    document.querySelector('.nav-bar').addEventListener('click', () => {
        if (popoutOpen) closePopout()
    })
    // Close on click outside
    popoutWrapper.addEventListener('pointerdown', (e) => {
        if (e.target === popoutWrapper) closePopout()
    })

    function escapePopout(e) {
        if (e.key === 'Escape') closePopout()
    }

    function hidePopoutWrapper() {
        popoutWrapper.style.display = 'none'
        popoutWrapper.removeEventListener('transitionend', hidePopoutWrapper)
    }

    // ------------------------------------
    // --- Locking scroll during popout ---
    // ------------------------------------
    let prevTouchY, currentTouchY
    document.body.addEventListener(wheelEvent, popoutScrollHandler, wheelOpt) // modern desktop
    document.body.addEventListener('DOMMouseScroll', popoutScrollHandler, false) // older FF
    document.body.addEventListener('keydown', popoutScrollHandler, false)
    document.body.addEventListener('mousedown', popoutScrollHandler, false)
    document.body.addEventListener('touchmove', popoutScrollHandler, wheelOpt) // mobile
    document.body.addEventListener('touchend', () => {
        prevTouchY = null
        currentTouchY = null
    })

    function popoutScrollHandler(e) {
        if (popoutOpen) {
            let type = e.type
            let target = document.querySelector('.popout-main')

            switch (type) {
                case 'wheel':
                    e.preventDefault()
                    target.scrollBy(e.deltaX, e.deltaY)
                    break

                case 'touchmove':
                    e.preventDefault()
                    prevTouchY = e.changedTouches[0].screenY
                    if (currentTouchY) {
                        target.scrollBy(0, currentTouchY - prevTouchY)
                    }
                    currentTouchY = prevTouchY
                    break

                case 'mousedown':
                    if (e.buttons === 4) {
                        preventDefault(e)
                    }
                    break

                case 'keydown':
                    if (scrollKeys[e.keyCode]) {
                        preventDefault(e)
                        return false
                    }
                    break
            }
        }
    }
})()
