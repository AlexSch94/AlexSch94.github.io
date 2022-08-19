;(function () {
    let categories = []

    class Category {
        constructor(name, parent, menu, items) {
            this.name = name
            this.parent = parent
            this.menu = menu
            this.items = items
            this.active = false

            categories.push(this)
        }
    }

    const home = new Category('home', document.getElementById('homeLink')),
        login = new Category(
            'login',
            document.querySelector('.login-btn-container')
        ),
        openLoginBtn = login.parent,
        loginMobile = new Category(
            'loginMobile',
            document.getElementById('loginMobile')
        ),
        openLoginMobileBtn = loginMobile.parent,
        applications = new Category(
            'applications',
            document.getElementById('applicationsLink'),
            document.getElementById('applicationsDropdown'),
            [...document.querySelectorAll('.app-dd-item')]
        ),
        products = new Category(
            'products',
            document.getElementById('productsLink'),
            document.getElementById('productsDropdown'),
            [...document.querySelectorAll('.prod-dd-item')]
        ),
        devices = new Category(
            'devices',
            document.getElementById('devicesLink'),
            document.getElementById('devicesDropdown'),
            [...document.querySelectorAll('.dev-dd-item')]
        ),
        about = new Category(
            'about',
            document.getElementById('aboutLink'),
            document.getElementById('aboutDropdown'),
            [...document.querySelectorAll('.about-dd-item')]
        ),
        language = new Category(
            'language',
            document.getElementById('languageLink'),
            document.getElementById('languageDropdown'),
            [...document.querySelectorAll('.lang-dd-item')]
        ),
        languageMobile = new Category(
            'languageMobile',
            document.getElementById('languageMobile'),
            document.getElementById('languageDropdownMobile'),
            [...document.querySelectorAll('.lang-dd-item-mobile')]
        ),
        dropDownMenus = document.querySelectorAll('.nav-dropdown-menu'),
        dropDownItems = document.querySelectorAll('.dropdown-link'),
        menuFader = document.querySelector('.menu-fader'),
        menuBtn = document.querySelector('.menu-icon-container'),
        topNav = document.querySelector('.top-nav')

    // Init
    categories.forEach((category) => {
        if (category.menu) {
            setupDropdown(category)
        } else {
            setupNoDropdown(category)
        }
    })

    // Add eventlisteners to nav links without dropdown
    function setupNoDropdown(element) {
        // Desktop Hover
        element.parent.addEventListener('mouseenter', (e) => {
            if (window.innerWidth <= 1000 || isTouch) return
            deselectCategories()
            element.parent.classList.add('active')
            element.active = true
        })

        element.parent.addEventListener('mouseleave', (e) => {
            if (window.innerWidth <= 1000 || isTouch) return
            if (e.relatedTarget !== loginWrapper) {
                element.parent.classList.remove('active')
                element.active = false
                highlightCurrentCategory()
            }
        })

        // Mobile selection / higlighting
        element.parent.addEventListener('click', (e) => {
            if (window.innerWidth > 1000 && !isTouch) return
            if (element.active === false) {
                deselectCategories()
                deselectMenus()
                element.parent.classList.add('active')
                element.active = true
            } else {
                element.parent.classList.remove('active')
                element.active = false
            }
        })
    }

    // Add eventlisteners to nav links with dropdown
    function setupDropdown(element) {
        // Desktop hover (open / close)
        element.parent.addEventListener('mouseenter', (e) => {
            if (!isTouch) {
                if (window.innerWidth <= 1000) return
                deselectAll(element)
                element.parent.classList.add('active')
                element.items[0].classList.add('selected')
                element.menu.classList.add('open')
                element.active = true
            }
        })

        element.parent.addEventListener('mouseleave', (e) => {
            if (window.innerWidth <= 1000) return
            element.parent.classList.remove('active')
            element.menu.classList.remove('open')
            highlightCurrentCategory()
            element.active = false
        })

        // Click functionality for Touchscreens and Smallscreen-Menu
        element.parent.addEventListener('click', function (e) {
            if (element.items.includes(e.target)) {
                return
            }
            if (window.innerWidth <= 1000 || isTouch) {
                //allow to toggle menu without following link for touchscreens and in small screen menu
                let [...list] = e.target.classList
                if (
                    list.includes('nav-link') ||
                    list.includes('icon-dropdown')
                ) {
                    e.preventDefault()
                }
                // set / unset active states
                if (element.active === false) {
                    deselectAll(element)
                    element.parent.classList.add('active')
                    element.menu.classList.add('open')
                    element.active = true
                    return false
                } else {
                    element.parent.classList.remove('active')
                    element.menu.classList.remove('open')
                    element.active = false
                    highlightCurrentCategory()
                }
            }
        })

        // Deselect dropdown item on mouseleave
        element.menu.addEventListener('mouseleave', (e) => {
            element.items.forEach((item) => {
                if (e.relatedTarget !== element.parent) {
                    item.classList.remove('selected')
                }
            })
        })

        // Close menu / highlight dropdown item on click (for mobile view)
        element.items.forEach((item) => {
            item.addEventListener('pointerup', (e) => {
                element.items.forEach((item) =>
                    item.classList.remove('selected')
                )
                item.classList.add('selected')

                if (window.innerWidth <= 1000 || isTouch) {
                    setTimeout(() => {
                        closeMenu()
                    }, 200)
                }
            })
        })
    }

    //Highlight dropdown items
    dropDownItems.forEach((item) => {
        item.addEventListener('mouseenter', function (e) {
            dropDownItems.forEach((item) => {
                item.classList.remove('selected')
            })
            e.target.classList.add('selected')
        })

        item.addEventListener('click', function (e) {
            dropDownItems.forEach((item) => {
                item.classList.remove('selected')
            })
            e.target.parentNode.classList.add('selected')
        })
    })

    function deselectAll() {
        deselectMenus()
        deselectCategories()
    }

    function deselectMenus() {
        for (let i = 0; i < dropDownMenus.length; i++) {
            dropDownMenus[i].classList.remove('open')
        }
    }

    function deselectCategories() {
        categories.forEach((category) => {
            category.parent.classList.remove('active')
            category.active = false
        })
    }

    function highlightCurrentCategory() {
        if (window.innerWidth <= 1000) return
        switch (currentCategory) {
            case 'home':
                home.parent.classList.add('active')
                break

            case 'applications':
                applications.parent.classList.add('active')
                break

            case 'products':
                products.parent.classList.add('active')
                break

            case 'devices':
                devices.parent.classList.add('active')
                break

            case 'about':
                about.parent.classList.add('active')
                break

            case 'contact':
                contact.parent.classList.add('active')
                break

            case 'language':
                language.parent.classList.add('active')
                break
        }
    }

    // Active class used for highlighting on desktop = open dropdown on mobile -> remove
    window.addEventListener('load', () => {
        if (window.innerWidth <= 1000) {
            deselectCategories()
        }
    })

    // ------------------
    //  Smallscreen menu
    // ------------------
    menuBtn.addEventListener('click', (e) => {
        if (!mainMenuOpen) {
            openMenu()
        } else {
            closeMenu()
        }
    })

    function openMenu() {
        mainMenuOpen = true
        topNav.classList.add('open')
        menuBtn.classList.add('active')
        menuFader.style.display = 'initial'
        setTimeout(() => {
            menuFader.classList.add('visible')
        }, 10)
        navBar.classList.add('sticky')

        if (currentPage === 'home') {
            hideIndexNavigation()
            vid.pause()
            sectionAnimation.classList.add('animation-pause')
        }

        // Disable scrolling of body -> add padding instead of scrollbar width
        if (currentPage !== 'home') {
            if (document.body.scrollHeight > window.innerHeight) {
                document.body.style.overflowY = 'hidden'
                document.body.style.paddingRight = getScrollbarWidth() + 'px'
            }
        }
    }

    function closeMenu() {
        mainMenuOpen = false
        topNav.classList.remove('open')
        menuBtn.classList.remove('active')
        menuFader.addEventListener('transitionend', hideMenuFader)
        menuFader.classList.remove('visible')
        deselectCategories()
        deselectMenus()
        if (currentPage !== 'home') {
            if (window.pageYOffset === 0) navBar.classList.remove('sticky')
        }

        if (currentPage === 'home') {
            showIndexNavigation()
            vid.play()
            sectionAnimation.classList.remove('animation-pause')
        }

        // Enable scrolling of body -> remove scrollbar padding
        if (currentPage !== 'home') {
            if (document.body.scrollHeight > window.innerHeight) {
                document.body.style.overflowY = 'visible'
                document.body.style.paddingRight = '0px'
            }
        }
    }

    menuFader.addEventListener('click', closeMenu)

    function hideMenuFader() {
        menuFader.style.display = 'none'
        menuFader.removeEventListener('transitionend', hideMenuFader)
    }

    // ------------
    //  Login form
    // ------------
    const loginSubmitBtn = document.getElementById('loginSubmitBtn'),
        loginContainer = document.querySelector('.login-container'),
        loginWrapper = document.querySelector('.login-wrapper'),
        loginForm = document.getElementById('loginForm'),
        loginCloseBtn = document.getElementById('loginCloseBtn'),
        userNameInput = document.getElementById('UserName'),
        userPasswordInput = document.getElementById('UserPassword'),
        focusOrder = [
            userNameInput,
            userPasswordInput,
            loginSubmitBtn,
            loginCloseBtn,
        ]

    let currentFocus

    // Open login
    openLoginBtn.addEventListener('click', () => {
        openLogin()
    })

    openLoginMobileBtn.addEventListener('click', () => {
        openLogin()
    })

    function openLogin() {
        loginWrapper.style.display = 'flex'
        loginContainer.classList.remove('login-out')
        setTimeout(() => {
            loginWrapper.style.opacity = '1'
        }, 10)
        window.addEventListener('keydown', loginEnterKeyDown)
        window.addEventListener('keyup', loginEnterKeyUp)
        window.addEventListener('keydown', escapeLogin)

        window.addEventListener('keydown', restrictFocus)

        // Focus first input field
        currentFocus = 1
        focusOrder[currentFocus - 1].focus()

        // Disable scrolling
        disableScroll([32])
        if (currentPage === 'home') {
            myFullpage.setAllowScrolling(false)
        }
    }

    // Restrict focus within login form while open

    function restrictFocus(e) {
        // Focus on tab key
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                currentFocus--
                if (currentFocus === 0) {
                    currentFocus = focusOrder.length
                }
            } else {
                currentFocus++
                if (currentFocus > focusOrder.length) {
                    currentFocus = 1
                }
            }
            focusOrder[currentFocus - 1].focus()
            e.preventDefault()
            return
        }

        // Prevent scrolling on spacebar
        if (
            document.activeElement !== userNameInput &&
            document.activeElement !== userPasswordInput
        ) {
            if ((e.keyCode = 32)) {
                e.preventDefault()
            }
        }
    }

    // Close login
    loginCloseBtn.addEventListener('click', closeLogin)

    function closeLogin() {
        loginForm.reset()
        loginContainer.classList.add('login-out')
        loginWrapper.style.opacity = '0'
        loginWrapper.addEventListener('transitionend', hideLoginWrapper)
        loginMobile.parent.classList.remove('active')
        login.active = false
        loginMobile.active = false
        window.removeEventListener('keydown', loginEnterKeyDown)
        window.removeEventListener('keyup', loginEnterKeyUp)
        window.removeEventListener('keydown', escapeLogin)
        window.removeEventListener('keydown', restrictFocus)
        deselectCategories()
        highlightCurrentCategory()

        // Enable scrolling
        enableScroll()
        if (currentPage === 'home') {
            myFullpage.setAllowScrolling(true)
        }
    }

    // Close on click outside
    loginWrapper.addEventListener('pointerdown', (e) => {
        if (e.target === loginWrapper) closeLogin()
    })

    // Close on Esc key
    function escapeLogin(e) {
        if (e.key === 'Escape') {
            closeLogin()
        }
    }

    function hideLoginWrapper() {
        loginWrapper.style.display = 'none'
        loginWrapper.removeEventListener('transitionend', hideLoginWrapper)
    }

    // Stop close button bubbling -> Prevent prematurely removing loginwrapper
    loginCloseBtn.addEventListener('transitionend', (e) => {
        e.stopPropagation()
    })

    // Style button on pointer interaction
    loginSubmitBtn.addEventListener('pointerdown', () => {
        loginSubmitBtn.classList.add('active')
    })

    loginSubmitBtn.addEventListener('pointerup', () => {
        loginSubmitBtn.classList.remove('active')
    })

    loginSubmitBtn.addEventListener('pointerleave', () => {
        loginSubmitBtn.classList.remove('active')
        loginSubmitBtn.blur()
    })

    // Submit form & style button on key press
    function loginEnterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (
                document.activeElement === loginSubmitBtn ||
                document.activeElement === userNameInput ||
                document.activeElement === userPasswordInput
            ) {
                loginSubmitBtn.classList.add('active')
                currentFocus = 1
            } else if (document.activeElement === loginCloseBtn) {
                loginCloseBtn.classList.add('active')
            }
        }
    }

    // Remove style from button on keyup
    function loginEnterKeyUp(e) {
        if (e.key === 'Enter') {
            if (
                document.activeElement === loginSubmitBtn ||
                document.activeElement === userNameInput ||
                document.activeElement === userPasswordInput
            ) {
                loginSubmitBtn.click()
                loginSubmitBtn.classList.remove('active')
            } else if (document.activeElement === loginCloseBtn) {
                loginCloseBtn.classList.remove('active')
                closeLogin()
            }
        }
    }

    // ------------------------------
    //  Navbar intersectionObservers
    // ------------------------------
    ;(function () {
        const header = document.querySelector('header'),
            navBar = document.querySelector('.nav-bar'),
            heroSection = document.querySelector('.hero-section')

        let observerOptions = { threshold: 0.9 }

        function handleAnyScrollEntry(entry) {
            if (!entry.isIntersecting) {
                // Add sticky nav
                navBar.classList.add('sticky')
                // Fade out hero section
                if (heroSection) {
                    heroSection.classList.add('fade')
                }
            } else {
                if (!mainMenuOpen && currentPage !== 'home') {
                    // Remove sticky nav
                    navBar.classList.remove('sticky')
                }
                // Fade in hero section
                if (heroSection) {
                    heroSection.classList.remove('fade')
                }
            }
        }

        const desktopAnyScrollObserver = new IntersectionObserver(function (
            entries,
            desktopAnyScrollObserver
        ) {
            entries.forEach((entry) => {
                handleAnyScrollEntry(entry)
            })
        },
        observerOptions)

        const tabletAnyScrollObserver = new IntersectionObserver(function (
            entries,
            tabletAnyScrollObserver
        ) {
            entries.forEach((entry) => {
                handleAnyScrollEntry(entry)
            })
        },
        observerOptions)

        const mobileAnyScrollObserver = new IntersectionObserver(function (
            entries,
            mobileAnyScrollObserver
        ) {
            entries.forEach((entry) => {
                handleAnyScrollEntry(entry)
            })
        },
        observerOptions)

        function switchObservers(size) {
            if (size === 'desktop') {
                desktopAnyScrollObserver.observe(header)
                tabletAnyScrollObserver.unobserve(header)
                mobileAnyScrollObserver.unobserve(header)
            } else if (size === 'tablet') {
                tabletAnyScrollObserver.observe(header)
                desktopAnyScrollObserver.unobserve(header)
                mobileAnyScrollObserver.unobserve(header)
            } else {
                mobileAnyScrollObserver.observe(header)
                desktopAnyScrollObserver.unobserve(header)
                tabletAnyScrollObserver.unobserve(header)
            }
        }

        // Resize handling
        ;(function () {
            let newScreenSize
            let screenSize

            window.addEventListener('resize', () => {
                getScreenSize()

                // Stop menu opening while resizing window
                let resizeTimer
                window.addEventListener('resize', (e) => {
                    topNav.classList.add('animation-stop')
                    dropDownMenus.forEach((menu) => {
                        menu.classList.add('animation-stop')
                    })

                    clearTimeout(resizeTimer)
                    resizeTimer = setTimeout(() => {
                        topNav.classList.remove('animation-stop')
                        dropDownMenus.forEach((menu) => {
                            menu.classList.remove('animation-stop')
                        })
                    }, 50)
                })
            })

            // Get Screen width -> react if significant change is detected
            function getScreenSize() {
                let width = window.innerWidth

                if (width > 1000) {
                    newScreenSize = 'desktop'
                    if (newScreenSize !== screenSize) {
                        onScreenSizeChange(newScreenSize)
                        screenSize = 'desktop'
                    }
                    highlightCurrentCategory()

                    if (mainMenuOpen) {
                        closeMenu()
                    }
                } else if (width > 500) {
                    newScreenSize = 'tablet'
                    if (newScreenSize !== screenSize) {
                        onScreenSizeChange(newScreenSize)
                        screenSize = 'tablet'
                    }
                } else {
                    newScreenSize = 'mobile'
                    if (newScreenSize !== screenSize) {
                        onScreenSizeChange(newScreenSize)
                        screenSize = 'mobile'
                    }
                }
            }

            function onScreenSizeChange(size) {
                if (size === 'desktop') {
                    switchObservers(size)
                }
                if (size === 'tablet') {
                    switchObservers(size)
                    deselectCategories()
                }
                if (size === 'mobile') {
                    switchObservers(size)
                    deselectCategories()
                }
            }

            // Assess size at load
            getScreenSize()
        })()
    })()
})()
