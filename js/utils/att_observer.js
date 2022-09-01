;(function () {
    const attributesWrapper = document.querySelector('.attributes-wrapper'),
        attributeContainers = document.querySelectorAll('.attribute-container')

    // Normal size observer
    const attributeObserverOptions = { threshold: 0.3 }
    const attributeObserver = new IntersectionObserver(function (
        entries,
        attibuteObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    },
    attributeObserverOptions)

    // Small size observer
    const smallAttributeObserverOptions = { threshold: 0.1 }
    const smallAttributeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            }
        })
    }, smallAttributeObserverOptions)

    // ----------------
    //  Responsiveness
    // ----------------
    function switchObservers(size) {
        if (size === 'large') {
            attributeContainers.forEach((attributeContainer) =>
                attributeObserver.observe(attributeContainer)
            )

            attributeContainers.forEach((attributeContainer) =>
                smallAttributeObserver.unobserve(attributeContainer)
            )
        } else if (size === 'small') {
            attributeContainers.forEach((attributeContainer) =>
                attributeObserver.unobserve(attributeContainer)
            )

            attributeContainers.forEach((attributeContainer) =>
                smallAttributeObserver.observe(attributeContainer)
            )
        }
    }

    ;(function () {
        let newScreenSize
        let screenSize

        function getScreenSize() {
            let width = window.innerWidth,
                height = window.innerHeight

            if (width > 700) {
                newScreenSize = 'large'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'large'
            } else {
                newScreenSize = 'small'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'small'
            }
        }

        function onScreenSizeChange(size) {
            if (size === 'large') {
                switchObservers(size)
            }
            if (size === 'small') {
                switchObservers(size)
            }
        }

        getScreenSize()

        window.addEventListener('resize', getScreenSize)
    })()
})()
