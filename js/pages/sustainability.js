currentPage = 'sustainability'
currentCategory = 'about'
;(function () {
    function incrementCounter(
        element,
        currentVal,
        finalVal,
        steps = 40,
        duration = 2500
    ) {
        const timeout = duration / steps,
            increment = (finalVal - currentVal) / steps

        let array = [],
            valString = '',
            part1 = 0,
            part2 = 0

        for (let i = 0; i < steps; i++) {
            currentVal += increment
            currentVal = Math.floor(currentVal)
            valString = currentVal.toString()
            if (currentVal > 999) {
                part1 = valString.slice(0, 1)
                part2 = valString.slice(1, 4)

                valString = part1 + '.' + part2
            }

            array.push(valString)
        }

        let i = 0
        let counterInterval = setInterval(() => {
            element.textContent = array[i]
            i++
            if (i === steps) {
                clearInterval(counterInterval)
            }
        }, timeout)
    }

    function replaceElement(e) {
        const element = e,
            copy = e.clone()

        copy.replaceElement(element)
    }

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
