currentPage = 'scanner'
currentCategory = 'products'
hasPreview = true

const previewWrapper = document.querySelector('.preview-wrapper')

;(function checkAppLinks() {
    appstoreLinks = document.querySelectorAll('[data-appStoreLink]')

    appstoreLinks.forEach((link) => {
        link.style.display = 'none'
        if (isIOS) {
            if (link.getAttribute('data-linktype') === 'iOS') {
                link.style.display = 'initial'
            }
        } else {
            if (link.getAttribute('data-linktype') !== 'iOS') {
                link.style.display = 'initial'
            }
        }
    })
})()
