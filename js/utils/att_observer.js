const attributesWrapper = document.querySelector('.attributes-wrapper'),
    attributeContainers = document.querySelectorAll('.attribute-container'),
    attributeObserverOptions = {
        threshold: 0.3,
    }

const attributeObserver = new IntersectionObserver(function (
    entries,
    attibuteObserver
) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('come-in')
        } else if (entry.target.getBoundingClientRect().top > 1) {
            entry.target.classList.remove('come-in')
        }
    })
},
attributeObserverOptions)

attributeContainers.forEach((attributeContainer) =>
    attributeObserver.observe(attributeContainer)
)
