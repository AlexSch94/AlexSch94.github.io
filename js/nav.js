const currentCategory = document.body.dataset.category

let isHomePage = false
if (currentCategory === 'home') {
    isHomePage = true
}

;(function () {
    let categories = []

    class Category {
        constructor(name, parent, menu, items) {
            const obj = { name, parent, menu, items }
            Object.assign(this, obj)

            this.subLinks = []

            if (this.parent.querySelector('a')) {
                this.mainLink = this.parent.querySelector('a')
            }

            if (this.items) {
                this.items.forEach((item) => {
                    this.subLinks.push(item.querySelector('a'))
                })
            }

            this.active = false

            categories.push(this)
        }
    }

    const home = new Category('home', document.getElementById('homeLink')),
        login = new Category('login', document.querySelector('.login-btn-container')),
        openLoginBtn = login.parent,
        loginMobile = new Category('loginMobile', document.getElementById('loginMobile')),
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
        devices = new Category('devices', document.getElementById('devicesLink'), document.getElementById('devicesDropdown'), [
            ...document.querySelectorAll('.dev-dd-item'),
        ]),
        about = new Category('about', document.getElementById('aboutLink'), document.getElementById('aboutDropdown'), [
            ...document.querySelectorAll('.about-dd-item'),
        ]),
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
        topNav = document.querySelector('.top-nav'),
        mainLinks = [],
        subLinks = []

    categories.forEach((ctg) => {
        // setup mainLinks
        if (ctg.parent.querySelector('a')) {
            mainLinks.push(ctg.parent.querySelector('a'))
        } else if (ctg.parent.querySelector('div')) {
            mainLinks.push(ctg.parent.querySelector('div'))
        }
        // setup subLink
        if (ctg.items) {
            ctg.items.forEach((item) => {
                subLinks.push(item.querySelector('a'))
            })
        }
    })

    if (isFirefox) {
        subLinks.forEach((link) => link.classList.add('ff-styling'))
    }

    // Main langLink has no functionality on desktop
    const langLinkDesktop = document.getElementById('langLinkDesktop'),
        lldIndex = mainLinks.indexOf(langLinkDesktop)
    if (lldIndex > -1) {
        mainLinks.splice(lldIndex, 1)
    }

    let mainMenuOpen = false,
        loginOpen = false,
        loginOpening = false

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
            if (window.innerWidth <= 1000 || isTouch) {
                return
            }
            deselectCategories()
            element.parent.classList.add('active')
            element.active = true
        })

        element.parent.addEventListener('mouseleave', (e) => {
            if (window.innerWidth <= 1000 || isTouch) {
                return
            }
            if (e.relatedTarget !== loginWrapper) {
                element.parent.classList.remove('active')
                element.active = false
                highlightCurrentCategory()
            }
        })

        // Mobile selection / higlighting
        element.parent.addEventListener('click', (e) => {
            if (window.innerWidth > 1000 && !isTouch) {
                return
            }
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
                if (window.innerWidth <= 1000) {
                    return
                }
                deselectAll()
                element.parent.classList.add('active')
                element.parent.querySelector('a').focus()
                element.parent.querySelector('a').blur()
                element.items[0].classList.add('selected')
                element.menu.classList.add('open')
                element.active = true
            }
        })

        element.parent.addEventListener('mouseleave', (e) => {
            if (window.innerWidth <= 1000) {
                return
            }
            element.parent.classList.remove('active')
            element.items[0].classList.remove('selected')
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
                // allow to toggle menu without following link for touchscreens and in small screen menu
                let [...list] = e.target.classList
                if (list.includes('nav-link') || list.includes('icon-dropdown')) {
                    e.preventDefault()
                }
                // set / unset active states - manage subLink tabIndex
                setLinkTabIndex([subLinks], 'hide')
                if (element.active === false) {
                    deselectAll()
                    element.parent.classList.add('active')
                    element.menu.classList.add('open')
                    element.active = true
                    // Make subLinks tabbable
                    element.subLinks.forEach((link) => link.setAttribute('tabindex', '0'))
                    return false
                } else {
                    element.parent.classList.remove('active')
                    element.menu.classList.remove('open')
                    element.active = false
                    highlightCurrentCategory()
                    // Make subLinks untabbable
                    element.subLinks.forEach((link) => link.setAttribute('tabindex', '-1'))
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
                element.items.forEach((item) => item.classList.remove('selected'))
                item.classList.add('selected')

                if (window.innerWidth <= 1000 || isTouch) {
                    setTimeout(() => {
                        closeMenu()
                    }, 200)
                }
            })
        })
    }

    // Highlight dropdown items
    dropDownItems.forEach((item) => {
        item.addEventListener('mouseenter', function (e) {
            dropDownItems.forEach((item) => {
                item.classList.remove('selected')
                document.activeElement.blur()
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
        for (let c = 0; c < categories.length; c++) {
            if (categories[c].menu) {
                categories[c].menu.classList.remove('open')
                categories[c].items.forEach((item) => {
                    item.classList.remove('selected')
                })
            }
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

            case 'language':
                language.parent.classList.add('active')
                break

            default:
                return
        }
    }

    // Used to enable / disable tabbing over elements
    function setLinkTabIndex(targets, state) {
        if (state === 'show') {
            targets.forEach((target) => {
                target.forEach((link) => link.setAttribute('tabindex', '0'))
            })
        } else if (state === 'hide') {
            targets.forEach((target) => {
                target.forEach((link) => link.setAttribute('tabindex', '-1'))
            })
        }
    }

    if (window.innerWidth <= 1000) {
        setLinkTabIndex([mainLinks, subLinks], 'hide')
    }

    // Keyboard control
    window.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return
        if ([...dropDownItems].find((item) => item.contains(document.activeElement))) {
            categories.forEach((ctg) => {
                if (ctg.menu) {
                    if (ctg.items.find((item) => item.contains(document.activeElement))) {
                        ctg.mainLink.focus()
                        deselectMenus()
                    }
                }
            })
        }
    })

    window.addEventListener('click', (e) => {
        if (window.innerWidth > 1000 && isDropDownMenuOpen() && !isTouch) {
            deselectMenus()
        }
    })

    function isDropDownMenuOpen() {
        let result = false
        dropDownMenus.forEach((menu) => {
            if (menu.classList.contains('open')) {
                result = true
            }
        })
        return result
    }

    // ------------------------------------------------------------------------
    // --------------------------- Smallscreen menu ---------------------------
    // ------------------------------------------------------------------------
    function openMenu() {
        mainMenuOpen = true

        menuBtn.focus()
        topNav.classList.add('open')
        menuBtn.classList.add('active')
        menuFader.style.display = 'initial'
        setTimeout(() => {
            menuFader.classList.add('visible')
        }, 10)
        navBar.classList.add('sticky')
        menuFader.removeEventListener('transitionend', hideMenuFader)

        if (isHomePage) {
            hideIndexNavigation()
            vid.pause()
            sectionAnimation.classList.add('animation-pause')
        }

        // Close on Esc
        window.addEventListener('keydown', closeMenuOnEsc)

        setLinkTabIndex([mainLinks], 'show')
    }

    function closeMenu() {
        mainMenuOpen = false

        topNav.classList.remove('open')
        menuBtn.classList.remove('active')
        menuFader.addEventListener('transitionend', hideMenuFader)
        menuFader.classList.remove('visible')
        deselectCategories()
        deselectMenus()
        if (!isHomePage) {
            if (window.pageYOffset === 0) {
                navBar.classList.remove('sticky')
            }
        }

        if (isHomePage) {
            showIndexNavigation()
            vid.play()
            sectionAnimation.classList.remove('animation-pause')
        }

        window.removeEventListener('keydown', closeMenuOnEsc)

        setLinkTabIndex([mainLinks], 'hide')
    }

    function onMenuBtnClick() {
        if (!mainMenuOpen) {
            openMenu()
        } else if (mainMenuOpen) {
            closeMenu()
        }
    }

    menuBtn.addEventListener('click', (e) => {
        onMenuBtnClick()
    })

    menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') onMenuBtnClick()
    })

    menuFader.addEventListener('click', closeMenu)

    function hideMenuFader() {
        menuFader.style.display = 'none'
        menuFader.removeEventListener('transitionend', hideMenuFader)
    }

    function closeMenuOnEsc(e) {
        if (e.key === 'Escape' && !loginOpen && !loginOpening) {
            closeMenu()
            menuBtn.focus()
        }
    }

    // ------------------------------------------------------------------------
    // ------------------------------ Login form ------------------------------
    // ------------------------------------------------------------------------
    const loginSubmitBtn = document.getElementById('loginSubmitBtn'),
        loginContainer = document.querySelector('.login-container'),
        loginWrapper = document.querySelector('.login-wrapper'),
        loginCloseBtn = document.getElementById('loginCloseBtn'),
        userNameInput = document.getElementById('UserName'),
        userPasswordInput = document.getElementById('UserPassword'),
        loginFocusOrder = [userNameInput, userPasswordInput, loginSubmitBtn, loginCloseBtn]

    let currentFocusLogin = 1,
        prevFocusEl

    // ----------
    // Open login
    function openLogin() {
        loginOpening = true
        loginWrapper.style.display = 'flex'
        setTimeout(() => {
            loginWrapper.style.opacity = '1'
        }, 10)

        // Add login-specific behaviour
        loginContainer.classList.remove('login-out')
        window.addEventListener('keydown', loginEnterKeyDown)
        window.addEventListener('keyup', loginEnterKeyUp)
        window.addEventListener('keydown', escapeLogin)
        window.addEventListener('keydown', restrictFocus)
        loginContainer.addEventListener('animationend', onLoginOpened)

        // Disable scrolling
        disableScroll([32])
        if (isHomePage) {
            myFullpage.setAllowScrolling(false)
        }

        prevFocusEl = document.activeElement

        deselectAll()
        if (window.innerWidth <= 1000) {
            setLinkTabIndex([subLinks], 'hide')
        }
    }

    function onLoginOpened() {
        loginOpen = true
        loginOpening = false
        focusLoginForm()
        loginContainer.removeEventListener('animationend', onLoginOpened)
    }

    openLoginBtn.addEventListener('click', () => {
        if (!loginOpen) {
            openLogin()
        }
    })

    openLoginBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !loginOpen) {
            openLogin()
        }
    })

    openLoginMobileBtn.addEventListener('click', () => {
        if (!loginOpen) openLogin()
    })

    openLoginMobileBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !loginOpen) {
            openLogin()
        }
    })

    // Focus appropriate input field
    function focusLoginForm() {
        if (!loginFocusOrder.includes(document.activeElement)) {
            if (userNameInput.value) {
                if (userPasswordInput.value) {
                    // Form filled
                    currentFocusLogin = 3
                } else {
                    // Only username present
                    currentFocusLogin = 2
                }
            } else {
                // No username
                currentFocusLogin = 1
            }

            loginFocusOrder[currentFocusLogin - 1].focus()
        }
    }

    // Restrict focus within login form while open
    function restrictFocus(e) {
        // Focus on tab key
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                currentFocusLogin--
                if (currentFocusLogin === 0) {
                    currentFocusLogin = loginFocusOrder.length
                }
            } else {
                currentFocusLogin++
                if (currentFocusLogin > loginFocusOrder.length) {
                    currentFocusLogin = 1
                }
            }
            loginFocusOrder[currentFocusLogin - 1].focus()
            e.preventDefault()
            return
        }

        // Prevent scrolling on spacebar
        if (e.keyCode === 32) {
            if (document.activeElement !== userNameInput && document.activeElement !== userPasswordInput) {
                e.preventDefault()
            }
        }
    }

    // -----------
    // Close login
    loginCloseBtn.addEventListener('click', closeLogin)

    function closeLogin() {
        if (!loginOpen || loginOpening) return

        loginContainer.classList.add('login-out')
        loginWrapper.style.opacity = '0'
        loginWrapper.addEventListener('transitionend', onLoginClosed)
        loginMobile.parent.classList.remove('active')
        login.active = false
        loginMobile.active = false

        // Remove login-specific behaviour
        window.removeEventListener('keydown', loginEnterKeyDown)
        window.removeEventListener('keyup', loginEnterKeyUp)
        window.removeEventListener('keydown', escapeLogin)
        window.removeEventListener('keydown', restrictFocus)

        deselectCategories()
        highlightCurrentCategory()

        // Enable scrolling
        enableScroll()
        if (isHomePage) {
            myFullpage.setAllowScrolling(true)
        }

        prevFocusEl.focus()
    }

    function onLoginClosed() {
        loginOpen = false
        hideLoginWrapper()
    }

    // Close on click outside
    loginWrapper.addEventListener('pointerdown', (e) => {
        if (e.target === loginWrapper) {
            closeLogin()
        }
    })

    // Close on Esc key
    function escapeLogin(e) {
        if (e.key === 'Escape') {
            closeLogin()
        }
    }

    function hideLoginWrapper() {
        loginWrapper.style.display = 'none'
        loginWrapper.removeEventListener('transitionend', onLoginClosed)
    }

    // Stop close button bubbling -> Prevent its transitionend from immediately closing loginwrapper
    loginCloseBtn.addEventListener('transitionend', (e) => {
        e.stopPropagation()
    })

    loginCloseBtn.addEventListener('mouseleave', () => loginCloseBtn.blur())

    // Submit login
    function onLoginSubmitPress() {
        loginSubmitBtn.classList.add('active')
    }

    function onLoginSubmitRelease() {
        loginSubmitBtn.classList.remove('active')

        // Set currentFocusLogin based on element autofocused by browser
        currentFocusLogin = loginFocusOrder.indexOf(document.activeElement) + 1
    }

    // Style button on pointer interaction
    loginSubmitBtn.addEventListener('pointerdown', () => {
        onLoginSubmitPress()
    })

    loginSubmitBtn.addEventListener('pointerup', () => {
        onLoginSubmitRelease()
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
                // If form is focused
                document.activeElement === loginSubmitBtn ||
                document.activeElement === userNameInput ||
                document.activeElement === userPasswordInput
            ) {
                onLoginSubmitPress()
            } else if (document.activeElement === loginCloseBtn) {
                // If close btn is focused
                loginCloseBtn.classList.add('active')
            }
        }
    }

    // Remove style from button on keyup
    function loginEnterKeyUp(e) {
        if (e.key === 'Enter') {
            if (
                // If form is focused
                document.activeElement === loginSubmitBtn ||
                document.activeElement === userNameInput ||
                document.activeElement === userPasswordInput
            ) {
                loginSubmitBtn.click()
                onLoginSubmitRelease()
            } else if (document.activeElement === loginCloseBtn) {
                // If close btn is focused
                loginCloseBtn.classList.remove('active')
                closeLogin()
            }
        }
    }

    // ------------------------------
    //  Header intersectionObservers
    // ------------------------------
    ;(function () {
        const header = document.querySelector('header'),
            navBar = document.querySelector('.nav-bar'),
            heroSection = document.querySelector('.hero-section')

        const navBarObserverOptions = { threshold: 1 }
        const navBarObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                handleAnyScrollEntry(entry)
            })
        }, navBarObserverOptions)

        navBarObserver.observe(header)

        function handleAnyScrollEntry(entry) {
            if (!entry.isIntersecting) {
                // Add sticky nav
                navBar.classList.add('sticky')
            } else {
                if (!mainMenuOpen && !isHomePage) {
                    // Remove sticky nav
                    navBar.classList.remove('sticky')
                }
            }
        }

        function setHeroSectionOpacity() {
            let navBarHeight = parseInt(window.getComputedStyle(navBar).height, 10)
            let percentage = cubicEaseOut(calculateVisiblePercentage(heroSection, navBarHeight), 0)
            heroSection.style.opacity = percentage + '%'
            // Array.from(heroSection.children).forEach((component) => (component.style.opacity = percentage + '%'))
        }

        if (!isHomePage) {
            window.addEventListener('scroll', setHeroSectionOpacity)
        }

        // Resize handling
        let newScreenSize, screenSize, prevScreenSize
        window.addEventListener('resize', () => {
            adaptScreensize()

            // Stop menu opening while resizing window
            let resizeTimer
            window.addEventListener('resize', (e) => {
                topNav.classList.add('animation-stop')
                dropDownMenus.forEach((menu) => menu.classList.add('animation-stop'))
                clearTimeout(resizeTimer)
                resizeTimer = setTimeout(() => {
                    topNav.classList.remove('animation-stop')
                    dropDownMenus.forEach((menu) => menu.classList.remove('animation-stop'))
                    if (window.innerWidth <= 1000) {
                        setLinkTabIndex([mainLinks, subLinks], 'hide')
                        deselectAll()
                    } else {
                        setLinkTabIndex([mainLinks, subLinks], 'show')
                    }
                }, 50)
            })
        })

        // Get Screen width -> react if significant change is detected
        function adaptScreensize() {
            let width = window.innerWidth

            if (width > 1000) {
                newScreenSize = 'desktop'
                if (mainMenuOpen) closeMenu()

                if (newScreenSize !== screenSize) {
                    // Save old screensize
                    prevScreenSize = screenSize
                    // Changes based on new screensize
                    onScreenSizeChange(newScreenSize)
                    // Set current screensize
                    screenSize = 'desktop'
                }
            } else if (width > 500) {
                newScreenSize = 'tablet'
                if (newScreenSize !== screenSize) {
                    prevScreenSize = screenSize
                    onScreenSizeChange(newScreenSize)
                    screenSize = 'tablet'
                }
            } else {
                newScreenSize = 'mobile'
                if (newScreenSize !== screenSize) {
                    prevScreenSize = screenSize
                    onScreenSizeChange(newScreenSize)
                    screenSize = 'mobile'
                }
            }
        }

        function onScreenSizeChange(size) {
            if (size === 'desktop') highlightCurrentCategory()
            if (size === 'tablet' && prevScreenSize === 'desktop') deselectCategories()
            if (size === 'mobile' && prevScreenSize === 'desktop') deselectCategories()
        }

        adaptScreensize() // Assess size at load
        if (!isHomePage) setHeroSectionOpacity() // Set hero opacity at load
    })()
})()
