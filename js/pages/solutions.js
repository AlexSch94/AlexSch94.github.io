currentPage = 'solutions'
currentCategory = 'solutions'

// Main page functionality
;(function () {
    /* -------------
    Sections Observer
    ------------- */
    const sections = document.querySelectorAll('section'),
        partnersSection = document.querySelector('.partners-section')

    const largeSectionObserverOptions = { threshold: 0.1 }
    const largeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    }, largeSectionObserverOptions)

    const mediumSectionObserverOptions = { threshold: 0.05 }
    const mediumSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    }, mediumSectionObserverOptions)

    const smallSectionObserverOptions = { threshold: 0.015 }
    const smallSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (
                entry.target.getBoundingClientRect().top > 1 ||
                entry.target === partnersSection
            ) {
                entry.target.classList.remove('come-in')
            }
        })
    }, smallSectionObserverOptions)

    /* ----------- 
    Appstore links 
    ----------- */
    // const iOSLinks = document.querySelector([""])
    let appstoreLinks

    function checkAppLinks() {
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
    }

    checkAppLinks()

    /* --------------
    Read more popouts 
    -------------- */
    let popoutOpen = false,
        popoutCloseBtn

    const popoutWrapper = document.getElementById('popoutWrapper'),
        popout = document.getElementById('popout')

    function openPopout() {
        popoutOpen = true
        disableScroll()
        popoutWrapper.style.display = 'flex'
        popout.classList.remove('popout-out')
        setTimeout(() => {
            popoutWrapper.style.opacity = '1'
        }, 10)
        window.addEventListener('keydown', escapePopout)

        // Find close button and assign close function
        popoutCloseBtn = document.getElementById('popoutCloseBtn')
        popoutCloseBtn.addEventListener('click', () => {
            closePopout()
        })
        // Stop closeBtn transition from affecting popoutWrapper
        popoutCloseBtn.addEventListener('transitionend', (e) => {
            e.stopPropagation()
        })
    }

    function closePopout() {
        popoutOpen = false
        enableScroll()
        popout.classList.add('popout-out')
        popoutWrapper.style.opacity = '0'
        popoutWrapper.addEventListener('transitionend', hidePopoutWrapper)
        window.removeEventListener('keydown', escapePopout)

        // Remove eventlisteners from closeBtn
        popoutCloseBtn.removeEventListener('click', () => {
            closePopout()
        })

        popoutCloseBtn.removeEventListener('transitionend', (e) => {
            e.stopPropagation()
        })
    }

    function escapePopout(e) {
        if (e.key === 'Escape') {
            closePopout()
        }
    }

    function hidePopoutWrapper() {
        popoutWrapper.style.display = 'none'
        popoutWrapper.removeEventListener('transitionend', hidePopoutWrapper)
    }

    // Close on click outside
    popoutWrapper.addEventListener('pointerdown', (e) => {
        if (e.target === popoutWrapper) closePopout()
    })

    // Remove popouts at small screens
    let readMoreBtns = document.querySelectorAll('.read-more-btn'),
        popoutEnabled = true

    function enablePopouts() {
        popoutEnabled = true
        readMoreBtns.forEach((btn) => {
            btn.style.display = 'initial'
        })
    }

    function disablePopouts() {
        popoutEnabled = false
        readMoreBtns.forEach((btn) => {
            btn.style.display = 'none'
        })
    }

    const attributes = {
        dotLink: {
            button: document.getElementById('dotLinkPopoutBtn'),
            content: `
                <div class="popout-icon-container">
                    <img src="./images/icons/icon-placeholder.png" alt="" class="popout-icon">
                    </div>

                <div class="popout-text-container">
                    <div class="popout-header">
                        <h3>DOT Link 4.0</h3>
                    </div>

                    <div class="popout-description">
                        <p class="bold">Complete Access through a new and improved interface.</p>
                        <p>DOT Link 4.0 is the new Web Front End for our individual users, which builds on the features of the DOT Unified API. It gives our users the easy and comprehensive access to their fleet analytics, as well as telematics and sensor data that they have come to expect, while providing improved speed and overall performance. Track and trace of assets, administrative tasks like adding new users, assets, groups, geofences or pairings as well as the creation of geofences and data sharing have been streamlined to provide a more efficient and thorough way of managing operational data, and keeping track of your fleets current status. The user interface has been overhauled to be more intuitive and provides our customers a customizable user experience free from unnecessary feature bloat.</p>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        scannerApp: {
            button: document.getElementById('scannerAppPopoutBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-placeholder.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>DOT pairing app</h3>
                        </div>

                        <div class="popout-description">
                            <p class="bold">Telematics setup made easy.</p>
                            <p><span class="nowrap">X-Rayl</span> Pointers do not require manual activation as they use renewable energy sources. Upon unpacking, the pointer will be automatically activated and configured. Just assign / pair it to a railcar and you are all set. Pairing can be done in either the web portal, or by using the <span class="nowrap">X-Rayl</span> Scanner app. </p>

                            <p>Before using the <span class="nowrap">X-Rayl</span> Scanner app for mobile devices for pairing, the user is required to authenticate via a code or signing sign in. All transmissions between the app and the DOT server are encrypted. </p>

                            <p>The X-Rayl Scanner App is available for Android™ 5.0 or higher and iOS® Version 11.0 or higher in the respective app store.</p>

                            <a class="appstore-link" href="https://play.google.com/store/apps/details?id=com.dot_telematik.pointeractivation&gl=AT" target="_blank" data-appStoreLink data-linktype="android" >Find the app for Android™ here</a>

                            <a class="appstore-link" href="xraylscanner://startapp" target="_blank" data-appStoreLink data-linktype="iOS">Find the app for iOS® here</a>

                            <a href=""></a>
                        </div>
                    </div>                                
                </div>

                <div class="more-info-links">
                    <a href="./products/scanner.html" class="link1">Go to page</a>
                </div>
                            
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        mileage: {
            button: document.getElementById('mileageBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-mileage.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                        <h3>Mileage calculation</h3>
                        </div>
                        
                        <div class="popout-description">
                            <p class="bold">Maximise utilisation and improve maintenance cycles.</p>
                            <p>Rail based assets are susceptible to fluctuations in utilisation leading to large discrepancies in the distance traveled each month. The assets might stay stationary, or they could travel for thousands of kilometers and see exposure to considerable stress. Currently the rolling stock with all its components must be maintained at regular intervals, for safety reasons. If the exact mileage of each individual wagon is known, maintenance can be carried out in a targeted manner and does not have to blindly happen based on fixed intervals, allowing for considerable savings.</p>
                            
                            <p>DOTs tested and verified algorithm records mileage with an accuracy of over 98%.</p>
                        </div>
                    </div>
                </div>
                
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        startStop: {
            button: document.getElementById('startStopBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-placeholder.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                        <h3>Start-Stop recognition</h3>
                        </div>
                        
                        <div class="popout-description">
                            <p class="bold">Discern between movement and standstill.</p>
                            <p>Pointers from the S17 series upwards have an integrated high-precision acceleration sensor that detects any form of movement. With the "start-stop" feature, the transmission frequency can be reduced at standstill to save significant amounts of energy. The transmission interval reduction is set by a freely configurable factor. The baseline transmission interval is 30 minutes, so entering a factor of 48 for example, the interval can be increased to 24 hours at standstill. The start of an assets trip (container, freight wagon, etc.) is reported within two minutes. Standstills are reported after about five minutes.</p>
                        </div>
                    </div>
                </div>  
                        
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        brkHealthIndic: {
            button: document.getElementById('brkHealthIndicBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-health.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Brake health indicator</h3>
                        </div>

                        <div class="popout-description">
                            <p class="bold">Precise analysis of working parts.</p>
                            <p>The strain on freight wagons depends on a variety of factors. A significant factor in terms of wear on brake systems is the amount of scaled altitude. To better estimate this wear and consequently optimise maintenance, DOT has developed the <span class="nowrap">X-Rayl</span> DOT-Link Altimeter algorithm, which precisely calculates the meters of altitude covered based on the trip.</p>

                            <p>The basis for the scaled altitude is a high-resolution digital model with which the travelled distance is compared. To provide a high degree of accuracy, various route characteristics, e.g. tunnels, are treated specially. This approach is far superior to a purely GPS-based solution due to the data accuracy and enables a view of the actual wear caused by the topography for the first time.</p>
                        </div>
                    </div>
                </div> 
                        
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        ctHeatingAnalysis: {
            button: document.getElementById('ctHeatingAnalysisBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-temperature.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Container/tank heating analysis</h3>
                        </div>
                        <div class="popout-description">
                        <p class="bold">Automatically record the start and end of heating, e.g. for billing purposes.</p> 
                            <p>For some substances, transported by containers and railcars, the temperature must be within specified limits. Tank-containers might require heating to achieve this. The heating process is done by the means of a pipe which runs through the tank-container guiding hot water or steam. Since this process involves costs and is also invoiced, it is advantageous to record the exact start, the temperature of the heating medium and the end of the heating process. This feature makes it possible. For this purpose, a sensor box is screwed onto a specially developed device and attached directly to the steam or water pipe. A gradient recognition system detects the start and end of the heating process with great precision and records the temperature profile. This can then be viewed and reused in the DOT-Link web portal.</p>
                        </div>
                    </div>
                </div>
                        
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        shockDetection: {
            button: document.getElementById('shockDetectionBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-shock.svg" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Advanced shock detection</h3>
                        </div>
                        <div class="popout-description">
                            <p class="bold">Simultaneously acceleration acquisition with different configurations and filter settings.</p>
                            <p>The <span class="nowrap">X-Rayl</span> Pointers as well as the <span class="nowrap">X-Rayl</span> Sensor S3ACC-D include three high-precision 3-axis accelerometers featuring a wide array of detection ranges. All sensors have been specifically chosen to cover different shock detection scenarios, that can be expected in the railway environment, from measuring small changes in the mg range as well as shocks up to 200g with a high resolution. Configurable frequency filters allow detection of events from slow shunting shocks to the detection of fast impacts, which may cause superstructure damage.</p>
                            <p>Adjustable thresholds allow immediate alarming when exceeded.</p>
                        </div>
                    </div>
                </div>
                        
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        wagHealthIndic: {
            button: document.getElementById('wagHealthIndicBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-health.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Wagon Health Indicator</h3>
                        </div>
                        <div class="popout-description">
                            <p class="bold">Improve maintenance intervals.</p>
                            <p>Since rail assets are subject to very diverse conditions and patterns of use, it is difficult to ascertain whether a railcar needs extra maintenance. Travelled mileage alone does not provide a comprehensive picture of the current state of the car, since the percentage of loaded/unloaded travel, track conditions and various other parameters can influence its state. To provide an insight into the current “health state” of an asset, the <span class="nowrap">X-Rayl</span> Pointers are configured to regularly measure the vibration patterns occurring on the asset. Since damage to the wheel sets (e.g. flat spots), bogies or superstructure change the vibration pattern in discernible ways, DOT has developed an algorithm to detect these changes. The final product is the Wagon Health Indicator which starts at 100% for newly equipped wagons, and decreases gradually if damage is detected. This value is calculated daily for each asset that is equipped with an <span class="nowrap">X-Rayl</span> Pointer, allowing for identification of assets that might be in need of extra maintenance. In case of longer cars with more than 2 bogies, the mounting of additional vibration sensor S3VIB-D might be needed to capture a full “picture” of the wagons state.</p>
                        </div>
                    </div>
                </div>
                        
            <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        brkHealthIndic2: {
            button: document.getElementById('brkHealthIndic2Btn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-brake.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Brake Health Indicator</h3>
                        </div>
                        <div class="popout-description">
                            <p class="bold">Improve maintenance intervals.</p>
                            <p>The timely maintenance of railcar brake systems is an important factor in keeping railcars operational and working at maximum utilisation, since unplanned maintenance can lead to severe interruptions in logistical flows. To monitor the usage of the brake system DOT has developed an algorithm that analyses the data generated by the <span class="nowrap">X-Rayl</span> Sensor S3PRS-D, installed in the brake air conduct of a rail asset. Every time the brake is applied the pressure in this air conduct rises accordingly, a stronger brake activation leads to a higher pressure, than when braking lightly. By analysing the pressure profile and the brake application frequency, which is higher in hilly or mountainous terrain, the algorithm can estimate the resulting brake wear of each asset over time. This Brake Health Indicator is calculated continuously for each equipped asset, allowing our customers to predictively send cars with high brake utilisation to a workshop for brake maintenance, before they are put out of service due to worn down brakes.</p>
                        </div>
                    </div>
                </div>
                            
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        sub1GhzPrep: {
            button: document.getElementById('sub1GhzPrepBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-frequency.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Sub 1GHz preparation</h3>
                        </div>
                        <div class="popout-description">
                            <p class="bold">Overcome larger distances of several wagon lengths by means of "Sub 1GHz”.</p>
                            <p>The technology that will be used for future intra-train communication (i.e. communication between freight wagons and the locomotive) is not yet clearly defined today. In Working Group 4 of the ITSS, it is currently being considered to solve this via the 2.4 GHz interface, in which each telematics device serves as a relay to bridge the length of a train in several hops. The LM-EJ takes this uncertainty into account by providing a dedicated radio transmitter and receiver for sub 1Ghz with a power of 20 dBm. Although an external antenna is required, the Sub 1Ghz offers several advantages over the 2.4Ghz spectrum.</p>
                            <p>Range of Sub 1Ghz Wireless: Sub 1Ghz offers more range than 2.4Ghz. Sub 1Ghz wireless transmission provides 1.5 - 2 times the distance coverage than 2.4Ghz spectrum. In addition, the Sub 1Ghz wireless spectrum has a long-range mode, which can reach further than 100 km, if the power is sufficient.</p>
                            <p>Lower power consumption: Wireless sub 1Ghz RF requires a lower power signal from the transmitter-receiver compared to the 2.4Ghz spectrum to maintain the same output power signal at the receiver.</p>
                            <p>Interference: The wireless sub 1Ghz spectrum can handle interference better. This is because they operate at a lower frequency and share this spectrum with fewer existing applications.</p>
                        </div>
                    </div>
                </div>
                                
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
        extIntefacePkg: {
            button: document.getElementById('extIntefacePkgBtn'),
            content: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-placeholder.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>External Interface Package</h3>
                        </div>
                        <div class="popout-description">
                            <p class="bold">Transfer data to third-party systems</p>
                            <p>For a long time, the compatibility of telematic applications from different providers was not guaranteed, because data exchange was not standardised. Initiated by the dialogue between the members of the Technical Innovation Circle for Rail Freight Transport (TIS) and telematics system providers, the Industry Platform for Telematics and Sensor Technology in Rail Freight Transport (ITSS) was founded, which deals with the standardisation of interfaces in the rail telematics sector. DOT participates in ITSS and can provide telematics data in compliance with the ITSS standard.</p>
                            <p>In addition, the DOT Unified API offers a comprehensive interface to all data not covered by the ITSS standard. Here, both active querying (pull procedure) and setting up notifications of data changes (push procedure) are possible, which enables close integration into existing internal processes.</p>
                        </div>
                    </div>
                </div>
                                
                <button id="popoutCloseBtn" class="popout-close-btn"><span class="iconify x-icon" data-icon="akar-icons:circle-x"></span></button>`,
        },
    }

    // Add eventlisteners to each button and assign / update content based on attribute
    Object.keys(attributes).forEach((key) => {
        attributes[key].button.addEventListener('click', () => {
            popout.innerHTML = attributes[key].content
            checkAppLinks()
            openPopout()
        })
    })

    /* -----------
    Responsiveness
    ----------- */
    function switchObservers(size) {
        if (size === 'large') {
            sections.forEach((section) => {
                largeSectionObserver.observe(section)
            })

            sections.forEach((section) => {
                mediumSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                smallSectionObserver.unobserve(section)
            })
        } else if (size === 'medium') {
            sections.forEach((section) => {
                largeSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                mediumSectionObserver.observe(section)
            })

            sections.forEach((section) => {
                smallSectionObserver.unobserve(section)
            })
        } else {
            sections.forEach((section) => {
                largeSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                mediumSectionObserver.unobserve(section)
            })

            sections.forEach((section) => {
                smallSectionObserver.observe(section)
            })
        }
    }

    const solResizeHandler = (function () {
        let newScreenSize
        let screenSize

        function getScreenSize() {
            let width = window.innerWidth,
                height = window.innerHeight

            if (width > 1200) {
                newScreenSize = 'large'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'large'
            } else if (width > 700) {
                newScreenSize = 'medium'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'medium'
            } else {
                newScreenSize = 'small'
                if (newScreenSize !== screenSize) {
                    onScreenSizeChange(newScreenSize)
                }
                screenSize = 'small'
            }

            // Enable / disable popouts
            if (width < 450 || height < 640) {
                if (popoutOpen) {
                    closePopout()
                }
                if (popoutEnabled) {
                    disablePopouts()
                }
            } else if (!popoutEnabled) {
                enablePopouts()
            }
        }

        function onScreenSizeChange(size) {
            if (size === 'large') {
                switchObservers(size)
            }
            if (size === 'medium') {
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
