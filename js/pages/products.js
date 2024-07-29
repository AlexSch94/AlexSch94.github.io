// Page closure
;(function () {
    // -----------------
    // Sections Observer
    // -----------------
    const sections = document.querySelectorAll('section'),
        partnersSection = document.querySelector('.partners-section')

    const largeSectionObserverOptions = { threshold: 0.1 }
    const largeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target === partnersSection) {
                entry.target.classList.remove('come-in')
            }
        })
    }, largeSectionObserverOptions)

    const mediumSectionObserverOptions = { threshold: 0.05 }
    const mediumSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target === partnersSection) {
                entry.target.classList.remove('come-in')
            }
        })
    }, mediumSectionObserverOptions)

    const smallSectionObserverOptions = { threshold: 0.015 }
    const smallSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('come-in')
            } else if (entry.target === partnersSection) {
                entry.target.classList.remove('come-in')
            }
        })
    }, smallSectionObserverOptions)

    /* --------------
    Read more popouts
    -------------- */
    let popoutOpen = false,
        popoutCloseBtn

    const popoutWrapper = document.getElementById('popoutWrapper'),
        popout = document.getElementById('popout'),
        menuBtn = document.querySelector('.menu-icon-container'),
        openLoginBtn = document.querySelector('.login-btn-container'),
        openLoginMobileBtn = document.getElementById('loginMobile')

    function openPopout() {
        popoutOpen = true
        popoutWrapper.style.display = 'flex'
        popout.classList.remove('popout-out')
        setTimeout(() => {
            popoutWrapper.style.opacity = '1'
        }, 10)
        window.addEventListener('keydown', escapePopout)

        // Find close button and assign close function
        popoutCloseBtn = popout.querySelector('#popoutCloseBtn')
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

    // Close on click outside
    popoutWrapper.addEventListener('pointerdown', (e) => {
        if (e.target === popoutWrapper) {
            closePopout()
        }
    })

    // Close popout on opening login
    openLoginBtn.addEventListener('click', () => {
        if (popoutOpen) {
            closePopout()
        }
    })
    openLoginMobileBtn.addEventListener('click', () => {
        if (popoutOpen) {
            closePopout()
        }
    })

    // Close on opening main menu
    menuBtn.addEventListener('click', () => {
        if (popoutOpen) {
            closePopout()
        }
    })

    function escapePopout(e) {
        if (e.key === 'Escape') {
            closePopout()
        }
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

    const contents = {
        mileage: {
            button: document.getElementById('mileageBtn'),
            icon: `./images/icons/icon-mileage.png`,
            headerEn: 'Mileage calculation',
            headerDe: 'Berechnung des Kilometerstandes',
            en: [
                [
                    'b',
                    'Rail based assets are susceptible to fluctuations in utilisation leading to large discrepancies in the distance traveled each month. The assets might stay stationary or travel many thousands of kilometers and be exposed to considerable stress. As it stands, the rolling stock with all its components must be maintained at regular intervals, for safety reasons...',
                ],
                [
                    'p',
                    'If the mileage of each individual wagon is known exactly, maintenance can be executed in a targeted manner and does not have to be carried out blindly based on fixed intervals, allowing the realisation of considerable saving potentials.',
                ],
                [
                    'p',
                    'DOT has developed a tested and verified algorithm that allows the mileage to be recorded with an accuracy of over 98%.',
                ],
            ],
            de: [
                [
                    'b',
                    'Schienengebundene Fahrzeuge sind Schwankungen in der Auslastung unterworfen, was zu großen Unterschieden in der monatlich zurückgelegten Strecke führt. Die Anlagen können stationär bleiben oder viele tausend Kilometer zurücklegen und dabei erheblichen Belastungen ausgesetzt werden. Derzeit muss das Schienenfahrzeug mit all seinen Komponenten in regelmäßigen Abständen gewartet werden, nicht zuletzt aus Sicherheitsgründen...',
                ],
                [
                    'p',
                    'Wenn die Laufleistung jedes einzelnen Waggons genau bekannt ist, kann die Wartung gezielt erfolgen und muss nicht blind nach fixen Intervallen durchgeführt werden, wodurch sich erhebliche Einsparpotenziale realisieren lassen.',
                ],
                [
                    'p',
                    'DOT hat einen getesteten und verifizierten Algorithmus entwickelt, der erlaubt den Kilometerstand mit einer Genauigkeit von über 98% zu erfassen.',
                ],
            ],
        },
        startStop: {
            button: document.getElementById('startStopBtn'),
            icon: `./images/icons/icon-start-stop.png`,
            headerEn: 'Start-Stop recognition',
            headerDe: 'Start-Stop Erkennung',
            en: [
                [
                    'b',
                    'Pointers from the S17 series upwards have an integrated high-precision acceleration sensor that detects any form of movement. With the "<span class="nowrap">start-stop</span>" feature, the transmission frequency can be reduced at standstill to save significant energy. In addition, the Start and Stop events are reported immediately. The reduction of the transmission interval is entered with a configurable factor...',
                ],
                [
                    'p',
                    'For example, by entering a factor of 48, a travel transmission interval of 30 minutes (one message every 30 minutes) can be increased to 24 hours at standstill.',
                ],
                [
                    'p',
                    'When the object (container, freight wagon, etc.) starts moving, the trip is reported within 2 minutes. Standstills are reported after about 5 minutes.',
                ],
            ],
            de: [
                [
                    'b',
                    'Pointer ab der Serie S17 verfügen über einen integrierten hochpräzisen Beschleunigungssensor, der jede Form von Bewegung erkennt. Mit dem Leistungsmerkmal „<span class="nowrap">Start-Stop</span>“ lässt sich die Sendefrequenz im Stillstand reduzieren, um signifikant Energie zu sparen. Zudem werden die Ereignisse Start und Stop sofort gemeldet. Die Reduktion des Sendeintervalls wird mit einem konfigurierbaren Faktor eingegeben...',
                ],
                [
                    'p',
                    'So kann durch Eingabe des Faktors 48 ein Fahrt-Sende-Intervall von 30 Minuten (eine Nachricht alle 30 Minuten) auf 24 Stunden im Stillstand erhöht werden.',
                ],
                [
                    'p',
                    'Wenn das Objekt (Container, Güterwagen, etc.) losfährt, wir die Fahrt innerhalb von 2 Minuten gemeldet. Eintretende Stillstände werden nach rund 5 Minuten gemeldet.',
                ],
            ],
        },
        brkHealthIndic: {
            button: document.getElementById('brkHealthIndicBtn'),
            icon: `./images/icons/icon-health.png`,
            headerEn: 'Brake Health Indicator',
            headerDe: 'Brake Health Indicator',
            en: [
                [
                    'b',
                    'The strain on freight wagons depends on a variety of factors. A significant factor in terms of wear on brake systems is the amount of scaled altitude. To better estimate this wear and consequently optimise maintenance, DOT has developed the <span class="nowrap">X-Rayl</span> DOT-Link Altimeter algorithm, which precisely calculates the meters of altitude covered based on the distance traveled...',
                ],
                [
                    'p',
                    'The basis for the scaled altitude is a high-resolution digital model with which the traveled distance is compared. To provide a high degree of accuracy, various route characteristics such as tunnels, are treated specially. This approach is far superior to a purely GPS-based solution, due to the data accuracy, and enables a view of the actual wear caused by the topography for the first time.',
                ],
            ],
            de: [
                [
                    'b',
                    'Die Belastung von Güterwagen ist von einer Vielzahl von Faktoren abhängig. Ein wesentlicher Faktor, der die Abnützung der Bremsanlage beeinflusst, sind hierbei die zurückgelegten Höhenmeter. Damit man diesen Verschleiß besser abschätzen und somit die Instandhaltung optimieren kann, hat DOT den <span class="nowrap">X-Rayl</span> DOT-Link Altimeter Algorithmus entwickelt, der exakt die zurückgelegten Höhenmeter anhand der gefahrenen Strecke errechnet...',
                ],
                [
                    'p',
                    'Die Grundlage für die zurückgelegten Höhenmeter ist ein hochauflösendes digitales Höhenmodell, mit dem die gefahrene Strecke abgeglichen wird. Um eine hohe Genauigkeit zu ermöglichen, werden diverse Streckeneigenschaften, z.B. Tunnel speziell behandelt. Dieser Ansatz ist einer rein GPS basierten Lösung aufgrund der Datengenauigkeit weit überlegen und erlaubt erstmals einen Blick auf den tatsächlich durch die Topografie hervorgerufenen Verschleiß.',
                ],
            ],
        },
        ctHeatingAnalysis: {
            button: document.getElementById('ctHeatingAnalysisBtn'),
            icon: `./images/icons/icon-temperature.png`,
            headerEn: 'Container/tank heating analysis',
            headerDe: 'Container- / Tank- Beheizungsanalyse',
            en: [
                [
                    'b',
                    'For some substances, transported by containers and railcars, the temperature must be within specified limits. <span class="nowrap">Tank-containers</span> might require heating to achieve this. The heating process is done by the means of a pipe which runs through the <span class="nowrap">tank-container</span>, guiding hot water or steam. Since this process involves costs and is also invoiced, it is advantageous to record the exact start, the temperature of the heating medium and the end of the heating process...',
                ],
                [
                    'p',
                    'For this purpose, a sensor box is screwed onto a specially developed device and attached directly to the steam or water pipe. A gradient recognition system detects the start and end of the heating process with great precision and records the temperature profile. This data can then be viewed and reused in the <span class="nowrap">DOT-Link</span> web portal.',
                ],
            ],
            de: [
                [
                    'b',
                    'Tankcontainer und Kesselwagen werden verwendet, um unterschiedliche flüssige Stoffe zu transportieren. Bei manchen dieser Stoffe muss sich deren Temperatur innerhalb von vorgegebenen Grenzen befinden. Um dies zu bewerkstelligen, müssen Tankcontainer eventuell beheizt werden. Dies erfolgt mit Hilfe einer Rohrleitung, die im Inneren des Tankcontainers verläuft und in welche warmes Wasser oder heißer Dampf gepumpt wird. Da dieser Vorgang mit Kosten verbunden ist und auch abgerechnet wird, ist es von Vorteil, den genauen Start, die Temperatur des Heizmediums, sowie das Ende der Beheizung zu erfassen...',
                ],
                [
                    'p',
                    'Dies ist mit dem gegenständlichen Leistungsmerkmal möglich. Dazu wird eine Sensor-Box auf eine eigens dafür entwickelte Vorrichtung geschraubt und direkt auf der Dampf- oder Wasserleitung angebracht. Eine Gradientenerkennung bestimmt mit großer Präzision den Beginn und das Ende des Heizvorganges und nimmt das Temperaturprofil auf. Dieses kann in weiterer Folge im Web-Portal DOT-Link eingesehen und weiterverwendet werden.',
                ],
            ],
        },
        shockDetection: {
            button: document.getElementById('shockDetectionBtn'),
            icon: `./images/icons/icon-shock.png`,
            headerEn: 'Advanced shock detection',
            headerDe: 'Erweiterte Schock-Erfassung',
            en: [
                [
                    'b',
                    'The <span class="nowrap">X-Rayl</span> pointers as well as the <span class="nowrap">X-Rayl</span> Sensor S3ACC-D include three high-precision <span class="nowrap">3-axis</span> accelerometers, featuring a wide array of detection ranges. All sensors have been specifically chosen to cover different shock detection scenarios, that can be expected in the railway environment, from measuring small changes in the mg range as well as shocks up to 200g with a high resolution...',
                ],
                [
                    'p',
                    'Different configurable frequency filters allow not only the detection of relatively slow shunting shocks, but also the detection of fast shocks which might lead to superstructure damage.',
                ],
                ['p', 'Adjustable thresholds allow immediate alarming when exceeded.'],
            ],
            de: [
                [
                    'b',
                    'Sowohl die <span class="nowrap">X-Rayl</span> Pointer als auch der <span class="nowrap">X-Rayl</span> Sensor S3ACC-D enthalten drei hochpräzise <span class="nowrap">3-Achsen-Beschleunigungssensoren</span> mit einer breiten Palette von Erfassungsbereichen. Alle Sensoren wurden speziell ausgewählt, um verschiedene Schockszenarien abzudecken, die in der Eisenbahnumgebung zu erwarten sind, von der Messung kleiner Änderungen im mg-Bereich bis hin zu Schocks von bis zu 200g mit einer hohen Auflösung...',
                ],
                [
                    'p',
                    'Verschiedene konfigurierbare Frequenzfilter ermöglichen nicht nur die Erkennung von relativ langsamen Rangierstößen, sondern auch die Erkennung von schnellen Stößen, die zu Oberbauschäden führen können.',
                ],
                ['p', 'Einstellbare Schwellenwerte ermöglichen eine sofortige Alarmierung bei Überschreitung.'],
            ],
        },
        wagHealthIndic: {
            button: document.getElementById('wagHealthIndicBtn'),
            icon: `./images/icons/icon-health.png`,
            headerEn: 'Wagon Health Indicator',
            headerDe: 'Wagon Health Indicator',
            en: [
                [
                    'b',
                    'Since rail assets are subject to very diverse conditions and usage patterns, it is difficult to ascertain whether a railcar is in need to extra maintenance. The traveled mileage alone does not provide a comprehensive picture of the current state of the car since the percentage of loaded / unloaded travel, track conditions and various other parameters can influence the state of an asset. <span class="nowrap">X-Rayl</span> Pointers regularly measure vibrations patterns occurring on the asset, to determine the current “health state” of an asset.',
                ],
                [
                    'b',
                    'DOT has developed an algorithm to detect changes in such patterns, which are caused by damage of the wheel sets, bogies or the superstructure...',
                ],
                [
                    'p',
                    'The final product is the Wagon Health Indicator which starts at 100% for newly equipped wagons, and decreases over time if damage is detected. This value is calculated on a daily basis for each asset that is equipped with a <span class="nowrap">X-Rayl</span> Pointer,  providing our customers with a comprehensive overview of the health of all parts of their fleet, allowing them to identify assets that might be in need of extra maintenance. In case of longer cars with more than two bogies, the mounting of additional vibration sensor S3VIB-D might be needed to capture a full “picture” of the wagons state.',
                ],
                [
                    'p',
                    'This index is a measure of the vibrations on board and is automatically recorded for a few seconds each time the vehicle travels above 40 km/h. The index is used to measure the vibration level on board. This provides a practical indication of the smooth operation of the car fleet and its development over time. If this index suddenly deteriorates, then it is reasonable to assume that a flat spot has occurred on one of the wheel sets.',
                ],
            ],
            de: [
                [
                    'b',
                    'Da Bahnanlagen sehr unterschiedlichen Bedingungen und Nutzungsmustern unterliegen, ist es schwierig festzustellen, ob ein Triebwagen einer zusätzlichen Wartung bedarf. Die reine Betrachtung der gefahrenen Kilometer gibt kein umfassendes Bild des aktuellen Zustands des Wagens, da der Anteil der beladenen / unbeladenen Fahrten, die Gleisbedingungen und verschiedene andere Parameter den Zustand einer Anlage beeinflussen können. Um einen Einblick in den aktuellen "Gesundheitszustand" eines Fahrzeugs zu erhalten, sind die <span class="nowrap">X-Rayl</span> Pointer so konfiguriert, dass sie regelmäßig die Vibrationsmuster des Fahrzeugs messen.',
                ],
                [
                    'b',
                    'Da Schäden an den Radsätzen (z. B. Flachstellen), Drehgestellen oder Aufbauten das Schwingungsmuster deutlich verändern, hat DOT einen Algorithmus entwickelt, um diese Veränderungen zu erkennen...',
                ],
                [
                    'p',
                    'Das Endprodukt ist der "Wagon Health Indicator", der bei neu ausgerüsteten Waggons bei 100% beginnt und bei festgestellten Schäden im Laufe der Zeit verringert wird. Für jeden mit einem <span class="nowrap">X-Rayl</span> Pointer ausgerüsteten Wagen wird dieser Wert täglich berechnet, so dass unsere Kunden einen umfassenden Überblick über den Zustand aller Teile ihres Fuhrparks erhalten und erkennen können, welche Wagen möglicherweise einer zusätzlichen Wartung bedürfen. Bei längeren Wagen mit mehr als 2 Drehgestellen kann die Montage eines zusätzlichen Schwingungssensors S3VIB-D erforderlich sein, um ein vollständiges "Bild" des Wagenzustands zu erhalten.',
                ],
                [
                    'p',
                    'Dieser Index ist ein Maß für die Schwingungen an Bord und wird jedes Mal, wenn das Fahrzeug mit mehr als 40 km/h fährt, automatisch für einige Sekunden aufgezeichnet. Der Index wird zur Messung des Vibrationsniveaus an Bord verwendet. Dies ist ein praktischer Indikator für das reibungslose Funktionieren der Fahrzeugflotte und ihre Entwicklung im Laufe der Zeit. Wenn sich dieser Index plötzlich verschlechtert, liegt die Vermutung nahe, dass ein Plattfuß an einem der Radsätze aufgetreten ist.',
                ],
            ],
        },
        brkHealthIndic2: {
            button: document.getElementById('brkHealthIndic2Btn'),
            icon: `./images/icons/icon-health.png`,
            headerEn: 'Brake Health Indicator',
            headerDe: 'Brake Health Indicator',
            en: [
                [
                    'b',
                    'The timely maintenance of a railcars brake system is an important factor in keeping the cars operational and working at optimal utilisation, since unplanned maintenance can lead to severe interruptions in logistics flows. To monitor the utilisation of the brake system DOT has developed an algorithm that analyses the data generated by an <span class="nowrap">X-Rayl</span> Sensor S3PRS-D installed in the brake air conduct of a rail asset. Every time the brake is applied the pressure in this air conduct rises accordingly, a stronger brake activation leads to a higher pressure, than when braking lightly...',
                ],
                [
                    'p',
                    'By analysing the pressure profile and the brake application frequency, which is higher in hilly or mountainous terrain, the algorithm can estimate the resulting brake wear of each asset over time. This Brake Health Indicator is calculated continuously for each equipped asset, allowing our customers to predictively send cars with high brake utilisation to a workshop for brake maintenance, before they are put out of service due to worn down brakes.',
                ],
            ],
            de: [
                [
                    'b',
                    'Die rechtzeitige Wartung des Bremssystems eines Eisenbahnwagens ist ein wichtiger Faktor für die Aufrechterhaltung des Betriebs und der optimalen Auslastung der Wagen, da ungeplante Wartungsarbeiten zu schwerwiegenden Unterbrechungen der Logistikströme führen können. Um die Auslastung des Bremssystems zu überwachen, hat DOT einen Algorithmus entwickelt, der die Daten analysiert, die von einem Sensor S3PRS-D erzeugt werden, der in der Bremsluftleitung eines Schienenfahrzeugs installiert ist. Jedes Mal, wenn die Bremse betätigt wird, steigt der Druck in dieser Luftleitung entsprechend an, eine stärkere Bremsbetätigung führt zu einem höheren Druck als eine leichte Bremsung...',
                ],
                [
                    'p',
                    'Durch die Analyse des Druckprofils und der Häufigkeit der Bremsbetätigung, die in hügeligem oder bergigem Gelände höher ist, kann der Algorithmus den daraus resultierenden Bremsenverschleiß jeder Anlage im Laufe der Zeit abschätzen. Dieser "Brake Health Indicator" wird kontinuierlich für jedes ausgerüstete Fahrzeug berechnet und ermöglicht es unseren Kunden, Fahrzeuge mit hoher Bremsenauslastung vorausschauend zur Bremsenwartung in eine Werkstatt zu schicken, bevor sie aufgrund verschlissener Bremsen außer Betrieb genommen werden.',
                ],
            ],
        },
        sub1GhzPrep: {
            button: document.getElementById('sub1GhzPrepBtn'),
            icon: `./images/icons/icon-frequency.png`,
            headerEn: 'Sub 1GHz preparation',
            headerDe: 'Sub 1GHz Vorbereitung',
            en: [
                [
                    'b',
                    'As of today, it is not yet clearly defined which technology will be used for intra-train communication, i.e. communication between freight wagons and / or the locomotive. The Working Group 4 of the ITSS is currently considering to solve this via the 2.4 GHz interface, in which each telematics device serves as a relay to bridge the length of a train in several hops. The LM-EJ takes this uncertainty into account by providing a dedicated radio transmitter and receiver for sub 1Ghz with a power of 20 dBm. Although an external antenna is required, the sub 1Ghz offers several advantages over the 2.4Ghz spectrum...',
                ],
                [
                    'ul',
                    [
                        'Range of sub 1Ghz Wireless: sub 1Ghz offers more range than 2.4Ghz. sub 1Ghz wireless transmission provides 1.5-2 times the distance coverage than 2.4Ghz spectrum. In addition, the sub 1Ghz wireless spectrum has a Long-Range mode, which can have a range of more than 100 km, if the power is sufficient.',
                        'Lower power consumption: wireless sub 1Ghz RF requires a lower power signal from the transmitter-receiver compared to the 2.4Ghz spectrum to maintain the same output power signal at the receiver.',
                        'Interference: the wireless sub 1Ghz spectrum can handle interference better. This is because they operate at a lower frequency and share this spectrum with fewer existing applications.',
                    ],
                ],
            ],
            de: [
                [
                    'b',
                    'Aus heutiger Sicht ist noch nicht klar definiert, mit welcher Technologie <span class="nowrap">Intra-Train-Kommunikation</span>, also die Kommunikation zwischen Güterwagen untereinander <span class="nowrap">und / oder</span> der Lok, bewerkstelligt werden wird. In der Working Group 4 der ITSS wird derzeit angedacht, dies über die 2,4 GHz Schnittstelle zu lösen, in dem jedes Telematik Gerät als Relay dient, um die Länge eines Zuges in mehreren Sprüngen (engl. Hops) zu überbrücken. Mit dem LM-EJ wurde dieser Unsicherheit Rechnung getragen und ein eigener Funksender und Empfänger für Sub 1Ghz mit einer Leistung von 20 dBm vorgesehen. Obwohl eine externe Antenne benötigt wird, bietet der Sub 1Ghz mehrere Vorteile gegenüber dem 2,4Ghz-Spektrum...',
                ],
                [
                    'ul',
                    [
                        'Reichweite von Sub 1Ghz Wireless: Sub 1Ghz bietet mehr Reichweite als 2.4Ghz. Die drahtlose Sub 1Ghz Übertragung bietet eine 1,5-2-fache Entfernungsabdeckung als das 2,4Ghz Spektrum. Außerdem verfügt das Sub 1Ghz Funkspektrum bei entsprechender Leistung über einen Long Range Modus, der mehr als 100 km Reichweite haben kann.',
                        'Geringerer Stromverbrauch: Wireless Sub 1 Ghz RF benötigt ein niedrigeres Leistungssignal vom Sender-Empfänger im Vergleich zum 2,4 Ghz Spektrum, um das gleiche Ausgangsleistungssignal am Empfänger zu erhalten.',
                        'Störung: das drahtlose Sub 1Ghz-Spektrum kann Störungen besser bewältigen. Dies liegt daran, dass sie mit einer niedrigeren Frequenz arbeiten und weniger bestehende Anwendungen dieses Spektrum nutzen.',
                    ],
                ],
            ],
        },
    }

    // Add events to fill & open popout with corresponding content
    Object.keys(contents).forEach((key) => {
        contents[key].button.addEventListener('click', () => {
            popout.innerHTML = innerPopout(contents[key])
            openPopout()
        })
    })

    function innerPopout(category) {
        let content, header
        let btnSource =
            currentLanguage === 'en'
                ? './images/icons/icon-xmark.png' + cacheParam
                : '../images/icons/icon-xmark.png' + cacheParam
        let icon = currentLanguage === 'en' ? category.icon : '.' + category.icon
        let description = ''

        if (currentLanguage === 'en') {
            content = category.en
            header = category.headerEn
        } else if (currentLanguage === 'de') {
            content = category.de
            header = category.headerDe
        }
        // Setup description
        content.forEach((el) => {
            let type = el[0]
            let text = el[1]
            switch (type) {
                case 'b': {
                    description += '<p class="light">' + text + '</p>'
                    break
                }
                case 'p': {
                    description += '<p>' + text + '</p>'
                    break
                }
                case 'ul': {
                    let pts = ''
                    text.forEach((pt) => (pts += '<li>' + pt + '</li>'))
                    description += '<ul>' + pts + '</ul>'
                    break
                }
            }
        })

        return `
        <div class="popout-main">
            <div class="popout-icon-container">
                <img src="${icon + cacheParam}" alt="" class="popout-icon">
            </div>

            <div class="popout-text-container">
                <div class="popout-header">
                    <h3>${header}</h3>
                </div>

                <div class="popout-description">
                    ${description}
                </div>
            </div>
        </div>

        <button id="popoutCloseBtn" class="popout-close-btn"><img src="${btnSource}" class="x-icon" draggable="false"></span></button>`
    }

    // --------------
    // Responsiveness
    // --------------
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

    ;(function () {
        let newScreenSize
        let screenSize

        function getScreenSize() {
            let width = window.innerWidth

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

    // Disable headers underline in Firefox
    const headerContainers = document.querySelectorAll('.section-header-container'),
        underlines = document.querySelectorAll('.underline')
    if (isFirefox) {
        headerContainers.forEach((cont) => {
            cont.style.marginBottom = '0'
        })
        underlines.forEach((line) => {
            line.style.display = 'none'
        })
    }
})()
