;(function () {
    const homeLink = document.getElementById('homeLink'),
        home = {
            parent: homeLink,
            active: false,
        },
        // Applications
        applicationsLink = document.getElementById('applicationsLink'),
        applicationsDropdown = document.getElementById('applicationsDropdown'),
        [...appDDItems] = document.querySelectorAll('.app-dd-item'),
        applications = {
            parent: applicationsLink,
            menu: applicationsDropdown,
            items: appDDItems,
            active: false,
        },
        // Products
        productsLink = document.getElementById('productsLink'),
        productsDropdown = document.getElementById('productsDropdown'),
        [...prodDDItems] = document.querySelectorAll('.prod-dd-item'),
        products = {
            parent: productsLink,
            menu: productsDropdown,
            items: prodDDItems,
            active: false,
        },
        // Devices
        devicesLink = document.getElementById('devicesLink'),
        devicesDropdown = document.getElementById('devicesDropdown'),
        [...devDDItems] = document.querySelectorAll('.dev-dd-item'),
        devices = {
            parent: devicesLink,
            menu: devicesDropdown,
            items: devDDItems,
            active: false,
        },
        // About
        aboutLink = document.getElementById('aboutLink'),
        aboutDropdown = document.getElementById('aboutDropdown'),
        [...aboutDDItems] = document.querySelectorAll('.about-dd-item'),
        about = {
            parent: aboutLink,
            menu: aboutDropdown,
            items: aboutDDItems,
            active: false,
        },
        // Language
        languageLink = document.getElementById('languageLink'),
        languageDropdown = document.getElementById('languageDropdown'),
        [...langDDItems] = document.querySelectorAll('.lang-dd-item'),
        language = {
            parent: languageLink,
            menu: languageDropdown,
            items: langDDItems,
            active: false,
        },
        // Language Mobile
        languageLinkMobile = document.getElementById('languageMobile'),
        languageDropdownMobile = document.getElementById(
            'languageDropdownMobile'
        ),
        [...langDDItemsMobile] = document.querySelectorAll(
            '.lang-dd-item-mobile'
        ),
        languageMobile = {
            parent: languageLinkMobile,
            menu: languageDropdownMobile,
            items: langDDItemsMobile,
            active: false,
        },
        // Login
        openLoginBtn = document.querySelector('.login-btn-container'),
        login = {
            parent: openLoginBtn,
            active: false,
        },
        //Login Mobile
        openLoginBtnMobile = document.getElementById('loginMobile'),
        loginMobile = {
            parent: openLoginBtnMobile,
            active: false,
        },
        dropDownMenus = document.querySelectorAll('.nav-dropdown-menu'),
        dropDownItems = document.querySelectorAll('.dropdown-link'),
        menuFader = document.querySelector('.menu-fader'),
        menuBtn = document.querySelector('.menu-icon-container'),
        topNav = document.querySelector('.top-nav'),
        categories = [
            home,
            applications,
            products,
            devices,
            about,
            language,
            languageMobile,
            login,
            loginMobile,
        ]

    /* ------------------
    Nav links & Dropdowns 
    ------------------- */
    // Init
    setupNoDropdown(home)
    setupDropdown(applications)
    setupDropdown(products)
    setupDropdown(devices)
    setupDropdown(about)
    setupNoDropdown(login)
    setupNoDropdown(loginMobile)
    setupDropdown(language)
    setupDropdown(languageMobile)

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
            element.parent.classList.remove('active')
            element.active = false
            highlightCurrentCategory()
        })

        // Mobile selection
        element.parent.addEventListener('click', (e) => {
            if (window.innerWidth > 1000 && isTouch) return
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

    window.addEventListener('click', (e) => {})

    // Add eventlisteners to nav links with dropdown
    function setupDropdown(element) {
        // Click functionality for Touchscreens and Smallscreen-Menu
        element.parent.addEventListener('click', function (e) {
            if (element.items.includes(e.target)) return
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

        // Open / close menus on mouse hover
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

        // Deselect dropdown items on mouseleave (for mobile view)
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

    function deselectAll(element) {
        deselectMenus()
        deselectItems(element)
        deselectCategories()
    }

    function deselectMenus() {
        for (let i = 0; i < dropDownMenus.length; i++) {
            dropDownMenus[i].classList.remove('open')
        }
    }

    function deselectItems(element) {
        for (let i = 0; i < element.items.length; i++) {
            element.items[i].classList.remove('selected')
        }
    }

    function deselectCategories() {
        categories.forEach((category) => {
            category.parent.classList.remove('active')
            category.active = false
        })
    }

    //Highlight last moused over dropdown item
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

    /* -------------
    Smallscreen menu 
    ---------------*/
    menuBtn.addEventListener('click', (e) => {
        if (!mainMenuOpen) {
            openMenu()
        } else {
            closeMenu()
        }
    })

    function openMenu() {
        topNav.classList.add('open')
        menuBtn.classList.add('active')
        menuFader.style.display = 'initial'
        setTimeout(() => {
            menuFader.classList.add('visible')
        }, 10)
        navBar.classList.add('sticky')
        mainMenuOpen = true
        if (currentPage === 'home') {
            hideIndexNavigation()
            vid.pause()
            sec0AnimElements.forEach((element) => {
                element.classList.add('animation-pause')
            })
        }
    }

    function closeMenu() {
        topNav.classList.remove('open')
        menuBtn.classList.remove('active')
        menuFader.addEventListener('transitionend', hideMenuFader)
        menuFader.classList.remove('visible')
        deselectCategories()
        deselectMenus()
        mainMenuOpen = false
        if (currentPage !== 'home' && currentPage !== 'test') {
            if (window.pageYOffset === 0) navBar.classList.remove('sticky')
        }
        if (currentPage === 'home') {
            showIndexNavigation()
            vid.play()
            sec0AnimElements.forEach((element) => {
                element.classList.remove('animation-pause')
            })
        }
    }

    menuFader.addEventListener('click', closeMenu)

    function hideMenuFader() {
        menuFader.style.display = 'none'
        menuFader.removeEventListener('transitionend', hideMenuFader)
    }

    /* --------
    Login functionality 
    --------- */
    let loginOpen = false

    const loginSubmitBtn = document.getElementById('loginSubmitBtn'),
        loginContainer = document.querySelector('.login-container'),
        loginWrapper = document.querySelector('.login-wrapper'),
        loginForm = document.getElementById('loginForm'),
        loginCloseBtn = document.getElementById('loginCloseBtn'),
        userNameInput = document.getElementById('UserName'),
        userPasswordInput = document.getElementById('UserPassword')

    openLoginBtn.addEventListener('click', () => {
        openLogin()
    })

    openLoginBtnMobile.addEventListener('click', () => {
        openLogin()
    })

    //Restrict Focus within LoginForm while open
    function restrictFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === userNameInput) {
                    loginCloseBtn.focus()
                    e.preventDefault()
                }
            } else {
                if (document.activeElement === loginCloseBtn) {
                    userNameInput.focus()
                    e.preventDefault()
                }
            }
        }
    }

    function openLogin() {
        loginOpen = true
        disableScroll()
        loginWrapper.style.display = 'flex'
        loginContainer.classList.remove('login-out')
        setTimeout(() => {
            loginWrapper.style.opacity = '1'
        }, 10)
        window.addEventListener('keydown', clickLoginSubmit)
        window.addEventListener('keyup', releaseLoginSubmit)
        window.addEventListener('keydown', escapeLogin)
        // Focus first input field after animating in
        setTimeout(() => {
            userNameInput.focus()
        }, 320)
        window.addEventListener('keydown', restrictFocus)
    }

    function closeLogin() {
        loginOpen = false
        enableScroll()
        loginForm.reset()
        loginContainer.classList.add('login-out')
        loginWrapper.style.opacity = '0'
        loginWrapper.addEventListener('transitionend', hideLoginWrapper)
        loginMobile.parent.classList.remove('active')
        loginMobile.active = false
        window.removeEventListener('keydown', clickLoginSubmit)
        window.removeEventListener('keyup', releaseLoginSubmit)
        window.removeEventListener('keydown', escapeLogin)
        window.removeEventListener('keydown', restrictFocus)
    }

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

    function clickLoginSubmit(e) {
        if (e.key === 'Enter') {
            if (
                document.activeElement === loginSubmitBtn ||
                document.activeElement === userNameInput ||
                document.activeElement === userPasswordInput
            ) {
                loginSubmitBtn.click()
                loginSubmitBtn.classList.add('active')
            }
        }
    }

    function releaseLoginSubmit(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            loginSubmitBtn.classList.remove('active')
        }
    }

    function escapeLogin(e) {
        if (e.key === 'Escape') {
            closeLogin()
        }
    }

    function hideLoginWrapper() {
        loginWrapper.style.display = 'none'
        loginWrapper.removeEventListener('transitionend', hideLoginWrapper)
    }

    loginCloseBtn.addEventListener('click', closeLogin)

    // Stop closeBtn transition from affecting LoginWrapper
    loginCloseBtn.addEventListener('transitionend', (e) => {
        e.stopPropagation()
    })

    // Close on click outside
    loginWrapper.addEventListener('pointerdown', (e) => {
        if (e.target === loginWrapper) closeLogin()
    })

    // Style LoginBtn on hover
    openLoginBtn.addEventListener('mouseenter', (e) => {
        openLoginBtn.classList.add('active')
    })

    openLoginBtn.addEventListener('mouseleave', (e) => {
        openLoginBtn.classList.remove('active')
    })

    /* NavBar observers */
    ;(function () {
        let headerHeight, navBarHeight
        const header = document.querySelector('header'),
            navBar = document.querySelector('.nav-bar'),
            heroSection = document.querySelector('.hero-section')

        let desktopOptions = {
            rootMargin: '-460px 0px 0px 0px',
        }
        let tabletOptions = {
            rootMargin: '-400px 0px 0px 0px',
        }
        let mobileOptions = {
            rootMargin: '-350px 0px 0px 0px',
        }

        function handleAnyScrollEntry(entry) {
            if (!entry.isIntersecting) {
                // Add sticky nav
                navBar.classList.add('sticky')
                // Fade out hero section
                if (heroSection) {
                    heroSection.classList.add('fade')
                }
                // Fade in preview
                if (hasPreview) {
                    previewWrapper.classList.add('come-in')
                }
            } else {
                if (!mainMenuOpen) {
                    // Rem sticky nav
                    navBar.classList.remove('sticky')
                }
                // Fade in hero section
                if (heroSection) {
                    heroSection.classList.remove('fade')
                }
                // Fade out preview
                if (hasPreview) {
                    previewWrapper.classList.remove('come-in')
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
        desktopOptions)

        const tabletAnyScrollObserver = new IntersectionObserver(function (
            entries,
            tabletAnyScrollObserver
        ) {
            entries.forEach((entry) => {
                handleAnyScrollEntry(entry)
            })
        },
        tabletOptions)

        const mobileAnyScrollObserver = new IntersectionObserver(function (
            entries,
            mobileAnyScrollObserver
        ) {
            entries.forEach((entry) => {
                handleAnyScrollEntry(entry)
            })
        },
        mobileOptions)

        function switchObservers(size) {
            if (size === 'desktop') {
                headerHeight = 460
                desktopAnyScrollObserver.observe(header)
                tabletAnyScrollObserver.unobserve(header)
                mobileAnyScrollObserver.unobserve(header)
            } else if (size === 'tablet') {
                headerHeight = 400
                tabletAnyScrollObserver.observe(header)
                desktopAnyScrollObserver.unobserve(header)
                mobileAnyScrollObserver.unobserve(header)
            } else {
                headerHeight = 350
                mobileAnyScrollObserver.observe(header)
                desktopAnyScrollObserver.unobserve(header)
                tabletAnyScrollObserver.unobserve(header)
            }
        }

        // Resize handling
        const navResizeHandler = (function () {
            let newScreenSize
            let screenSize

            window.addEventListener('resize', () => {
                getScreenSize()

                // Stop Menu opening while resizing window
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

            // Get Screen width and initiate changes if significant change is detected
            function getScreenSize() {
                let width = window.innerWidth

                if (width > 1000) {
                    newScreenSize = 'desktop'
                    if (newScreenSize !== screenSize) {
                        onScreenSizeChange(newScreenSize)
                    }
                    screenSize = 'desktop'

                    if (mainMenuOpen) {
                        closeMenu()
                    }

                    highlightCurrentCategory()
                } else if (width > 500) {
                    newScreenSize = 'tablet'
                    if (newScreenSize !== screenSize) {
                        onScreenSizeChange(newScreenSize)
                    }
                    screenSize = 'tablet'
                } else {
                    newScreenSize = 'mobile'
                    if (newScreenSize !== screenSize) {
                        onScreenSizeChange(newScreenSize)
                    }
                    screenSize = 'mobile'
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

            // Remove active class from category on smallscreen load
            window.addEventListener('load', () => {
                if (window.innerWidth <= 1000) {
                    deselectCategories()
                }
            })

            // Assess size at load
            getScreenSize()
        })()
    })()
})()
