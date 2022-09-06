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
        openLoginMobileBtn = document.getElementById('loginMobile'),
        navBar = document.querySelector('.nav-bar'),
        footer = document.querySelector('footer'),
        scrollBarPaddingEls = [navBar, footer]

    function openPopout() {
        popoutOpen = true
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

    // Determine language
    let currentLanguage = document.documentElement.getAttribute('lang')

    const attributes = {
        mileage: {
            button: document.getElementById('mileageBtn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-mileage.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                        <h3>Mileage calculation</h3>
                        </div>
                        
                        <div class="popout-description">
                            <p class="light">Rail based assets are susceptible to fluctuations in utilisation leading to large discrepancies in the distance travelled each month. The assets might stay stationary or travel many thousands of kilometers and be exposed to considerable stress. Currently the rolling stock with all its components must be maintained at regular intervals, not least for safety reasons...</p>

                            <p>If the mileage of each individual wagon is known exactly, maintenance can be carried out in a targeted manner and does not have to be carried out blindly based on fixed intervals, which allows for considerable savings potentials to be realized.</p>
                            
                            <p>DOT has developed a tested a verified algorithm that allows the mileage to be recorded with an accuracy of over 98%.</p>
                        </div>
                    </div>
                </div>
                
                <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            // German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-mileage.png" alt="" class="popout-icon">
                    </div>
                    
                    <div class="popout-text-container">
                        <div class="popout-header">
                        <h3>Berechnung des Kilometerstandes</h3>
                        </div>
                        
                        <div class="popout-description">
                            <p class="light">Schienengebundene Fahrzeuge sind Schwankungen in der Auslastung unterworfen, was zu großen Unterschieden in der monatlich zurückgelegten Strecke führt. Die Anlagen können stationär bleiben oder viele tausend Kilometer zurücklegen und sind dabei erheblichen Belastungen ausgesetzt. Derzeit muss das Schienenfahrzeug mit all seinen Komponenten in regelmäßigen Abständen gewartet werden, nicht zuletzt aus Sicherheitsgründen...</p>

                            <p>Wenn die Laufleistung jedes einzelnen Waggons genau bekannt ist, kann die Wartung gezielt erfolgen und muss nicht blind nach fixen Intervallen durchgeführt werden, wodurch sich erhebliche Einsparpotenziale realisieren lassen.</p>
                            
                            <p>DOT hat einen getesteten und verifizierten Algorithmus entwickelt, der es erlaubt, den Kilometerstand mit einer Genauigkeit von über 98% zu erfassen.</p>
                        </div>
                    </div>
                </div>
                
                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        startStop: {
            button: document.getElementById('startStopBtn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-start-stop.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                        <h3>Start-Stop recognition</h3>
                        </div>

                        <div class="popout-description">
                            <p class="light">Pointers from the S17 series upwards have an integrated high-precision acceleration sensor that detects any form of movement. With the "<span class="nowrap">start-stop</span>" feature, the transmission frequency can be reduced at standstill to save significant energy. In addition, the Start and Stop events are reported immediately. The reduction of the transmission interval is entered with a configurable factor...</p>
                        
                            <p>For example, by entering a factor of 48, a travel transmission interval of 30 minutes (one message every 30 minutes) can be increased to 24 hours at standstill.</p>

                            <p>When the object (container, freight wagon, etc.) starts, the trip is reported within 2 minutes. The standstill is reported after about 5 minutes.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            // German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-start-stop.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                        <h3>Start-Stop Erkennung</h3>
                        </div>

                        <div class="popout-description">
                        <p class="light">Pointer ab der Serie S17 verfügen über einen integrierten hochpräzisen Beschleunigungssensor, der jede Form von Bewegung erkennt. Mit dem Leistungsmerkmal „<span class="nowrap">Start-Stop</span>“ lässt sich die Sendefrequenz im Stillstand reduzieren, um signifikant Energie zu sparen. Zudem werden die Ereignisse Start und Stop sofort gemeldet. Die Reduktion des Sendeintervalls wird mit einem konfigurierbaren Faktor eingegeben...</p>

                        <p>So kann durch Eingabe des Faktors 48 ein Fahrt-Sende-Intervall von 30 Minuten (eine Nachricht alle 30 Minuten) auf 24 Stunden im Stillstand erhöht werden.</p>

                        <p>Wenn das Objekt (Container, Güterwagen, etc.) losfährt, wir die Fahrt innerhalb von 2 Minuten gemeldet. Der eingetretene Stillstand wird nach rund 5 Minuten gemeldet.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        brkHealthIndic: {
            button: document.getElementById('brkHealthIndicBtn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-health.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Brake Health Indicator</h3>
                        </div>

                        <div class="popout-description">
                            <p class="light">The strain on freight wagons depends on a variety of factors. A significant factor in terms of wear on brake systems is the amount of scaled altitude. To better estimate this wear and consequently optimise maintenance, DOT has developed the <span class="nowrap">X-Rayl</span> DOT-Link Altimeter algorithm, which precisely calculates the meters of altitude covered based on the trip...</p>

                            <p>The basis for the scaled altitude is a high-resolution digital model with which the travelled distance is compared. To provide a high degree of accuracy, various route characteristics such as tunnels, are treated specially. This approach is far superior to a purely GPS-based solution due to the data accuracy and enables a view of the actual wear caused by the topography for the first time.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            //German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-health.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Brake Health Indicator</h3>
                        </div>

                        <div class="popout-description">
                            <p class="light">Die Belastung von Güterwagen ist von einer Vielzahl von Faktoren abhängig. Ein wesentlicher Faktor, der die Abnützung der Bremsanlage beeinflusst, sind hierbei die zurückgelegten Höhenmeter. Damit man diesen Verschleiß besser abschätzen und somit die Instandhaltung optimieren kann, hat DOT den <span class="nowrap">X-Rayl</span> DOT-Link Altimeter Algorithmus entwickelt, der exakt die zurückgelegten Höhenmeter anhand der gefahrenen Strecke errechnet...</p>

                            <p>Die Grundlage für die zurückgelegten Höhenmeter ist ein hochauflösendes digitales Höhenmodell, mit dem die gefahrene Strecke abgeglichen wird. Um eine hohe Genauigkeit zu ermöglichen, werden diverse Streckeneigenschaften, z.B. Tunnel speziell behandelt. Dieser Ansatz ist einer rein GPS basierten Lösung aufgrund der Datengenauigkeit weit überlegen und erlaubt erstmals einen Blick auf den tatsächlich durch die Topografie hervorgerufenen Verschleiß.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        ctHeatingAnalysis: {
            button: document.getElementById('ctHeatingAnalysisBtn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-temperature.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Container/tank heating analysis</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">For some substances, transported by containers and railcars, the temperature must be within specified limits. Tank-containers might require heating to achieve this. The heating process is done by the means of a pipe which runs through the tank-container guiding hot water or steam. Since this process involves costs and is also invoiced, it is advantageous to record the exact start, the temperature of the heating medium and the end of the heating process...</p>

                            <p>For this purpose, a sensor box is screwed onto a specially developed device and attached directly to the steam or water pipe. A gradient recognition system detects the start and end of the heating process with great precision and records the temperature profile. This can then be viewed and reused in the <span class="nowrap">DOT-Link</span> web portal.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            //German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-temperature.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Container- / Tank- Beheizungsanalyse</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">Tankcontainer und Kesselwagen werden verwendet, um unterschiedliche flüssige Stoffe zu transportieren. Bei manchen dieser Stoffe muss sich deren Temperatur innerhalb von vorgegebenen Grenzen befinden. Um dies zu bewerkstelligen, müssen Tankcontainer z.B. beheizt werden. Dies erfolgt mit Hilfe einer Rohrleitung, die im Inneren des Tankcontainer verläuft und in welche warmes Wasser oder heißer Dampf gepumpt wird. Da dieser Vorgang mit Kosten verbunden ist und auch abgerechnet wird, ist es von Vorteil, den genauen Start, die Temperatur des Heizmediums sowie das Ende der Beheizung zu erfassen...</p>

                            <p>Dies ist mit dem gegenständlichen Leistungsmerkmal möglich. Dazu wird eine Sensor-Box auf eine eigens dafür entwickelte Vorrichtung geschraubt und direkt auf der Dampf- oder Wasserleitung angebracht. Eine Gradientenerkennung bestimmt mit großer Präzision den Beginn und das Ende des Heizvorganges und nimmt das Temperaturprofil auf. Dieses kann in weiterer Folge im Web-Portal DOT-Link eingesehen und weiterverwendet werden.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        shockDetection: {
            button: document.getElementById('shockDetectionBtn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-shock.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Advanced shock detection</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">The <span class="nowrap">X-Rayl</span> pointers as well as the <span class="nowrap">X-Rayl</span> Sensor S3ACC-D include three high-precision <span class="nowrap">3-axis</span> accelerometers featuring a wide array of detection ranges. All sensors have been specifically chosen to cover different shock detection scenarios, that can be expected in the railway environment, from measuring small changes in the mg range as well as shocks up to 200g with a high resolution...</p>

                            <p>Different configurable frequency filters allow not only the detection of relatively slow shunting shocks, but also the detection of fast shocks which might lead to superstructure damage. Adjustable thresholds allow immediate alarming when exceeded.</p>

                            <p>Adjustable thresholds allow immediate alarming when exceeded.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            // German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-shock.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Erweiterte Schock-Erfassung</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">Sowohl die <span class="nowrap">X-Rayl</span> Pointer als auch der <span class="nowrap">X-Rayl</span> Sensor S3ACC-D enthalten drei hochpräzise <span class="nowrap">3-Achsen-Beschleunigungssensoren</span> mit einer breiten Palette von Erfassungsbereichen. Alle Sensoren wurden speziell ausgewählt, um verschiedene Schockszenarien abzudecken, die in der Eisenbahnumgebung zu erwarten sind, von der Messung kleiner Änderungen im mg-Bereich bis hin zu Schocks von bis zu 200g mit einer hohen Auflösung...</p>

                            <p>Verschiedene konfigurierbare Frequenzfilter ermöglichen nicht nur die Erkennung von relativ langsamen Rangierstößen, sondern auch die Erkennung von schnellen Stößen, die zu Oberbauschäden führen können.</p>

                            <p>Einstellbare Schwellenwerte ermöglichen eine sofortige Alarmierung bei Überschreitung.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        wagHealthIndic: {
            button: document.getElementById('wagHealthIndicBtn'),
            contentEN: `                
            <div class="popout-main">
                <div class="popout-icon-container">
                    <img src="./images/icons/icon-health.png" alt="" class="popout-icon">
                </div>

                <div class="popout-text-container">
                    <div class="popout-header">
                        <h3>Wagon Health Indicator</h3>
                    </div>
                    <div class="popout-description">
                        <p class="light">Since rail assets are subject to very diverse conditions and usage patterns, it is difficult to ascertain whether a railcar is in need to extra maintenance. The travelled mileage alone does not provide a comprehensive picture of the current state of the car since the percentage of loaded/unloaded travel, track conditions and various other parameters can influence the state of an asset. <span class="nowrap">X-Rayl</span> Pointers regularly measure vibrations patterns occurring on the asset, to determine the current “health state” of an asset.</p>

                        <p class="light">DOT has developed an algorithm to detect changes in such patterns, which are caused by damage of the wheel sets, bogies or the superstructure...</p>

                        <p>The final product is the Wagon Health Indicator which starts at 100% for newly equipped wagons, and if damage is detected the indicator is decreased over time. For each asset that is equipped with a <span class="nowrap">X-Rayl</span> Pointer this value is calculated on a daily basis, providing our customers with a comprehensive overview of the health of all parts of their fleet, allowing them to identify assets that might be in need of extra maintenance. In case of longer cars with more than 2 bogies, the mounting of additional vibration sensor S3VIB-D might be needed to capture a full “picture” of the wagons state.</p>

                        <p>This index is a measure of the vibrations on board and is automatically recorded for a few seconds each time the vehicle travels above 40 km/h. The index is used to measure the vibration level on board. This provides a practical indication of the smooth running of the car fleet and its development over time. If this index suddenly deteriorates, then it is reasonable to assume that a flat spot has occurred on one of the wheel sets.</p>
                    </div>
                </div>
            </div>

            <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            // German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-health.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Wagon Health Indicator</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">Da Bahnanlagen sehr unterschiedlichen Bedingungen und Nutzungsmustern unterliegen, ist es schwierig festzustellen, ob ein Triebwagen einer zusätzlichen Wartung bedarf. Die reine Betrachtung der gefahrenen Kilometer gibt kein umfassendes Bild des aktuellen Zustands des Wagens, da der Anteil der beladenen/unbeladenen Fahrten, die Gleisbedingungen und verschiedene andere Parameter den Zustand einer Anlage beeinflussen können. Um einen Einblick in den aktuellen "Gesundheitszustand" eines Fahrzeugs zu erhalten, sind die <span class="nowrap">X-Rayl</span> Pointer so konfiguriert, dass sie regelmäßig die Vibrationsmuster des Fahrzeugs messen. </p>

                            <p class="light">Da Schäden an den Radsätzen (z. B. Flachstellen), Drehgestellen oder Aufbauten das Schwingungsmuster deutlich verändern, hat das DOT einen Algorithmus entwickelt, um diese Veränderungen zu erkennen...</p>
                            Das Endprodukt ist der "Wagon Health Indicator", der bei neu ausgerüsteten Waggons bei 100% beginnt und bei festgestellten Schäden im Laufe der Zeit verringert wird. Für jeden mit einem <span class="nowrap">X-Rayl</span> Pointer ausgerüsteten Wagen wird dieser Wert täglich berechnet, so dass unsere Kunden einen umfassenden Überblick über den Zustand aller Teile ihres Fuhrparks erhalten und erkennen können, welche Wagen möglicherweise einer zusätzlichen Wartung bedürfen. Bei längeren Wagen mit mehr als 2 Drehgestellen kann die Montage eines zusätzlichen Schwingungssensors S3VIB-D erforderlich sein, um ein vollständiges "Bild" des Wagenzustands zu erhalten.</p>

                            <p>Dieser Index ist ein Maß für die Schwingungen an Bord und wird jedes Mal, wenn das Fahrzeug mit mehr als 40 km/h fährt, automatisch für einige Sekunden aufgezeichnet. Der Index wird zur Messung des Vibrationsniveaus an Bord verwendet. Dies ist ein praktischer Indikator für das reibungslose Funktionieren der Fahrzeugflotte und ihre Entwicklung im Laufe der Zeit. Wenn sich dieser Index plötzlich verschlechtert, liegt die Vermutung nahe, dass ein Plattfuß an einem der Radsätze aufgetreten ist.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        brkHealthIndic2: {
            button: document.getElementById('brkHealthIndic2Btn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-brake.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Brake Health Indicator</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">The timely maintenance of a railcars brake system is an important factor in keeping the cars operational and working at optimal utilisation, since unplanned maintenance can lead to severe interruptions in logistics flows. To monitor the utilisation of the brake system DOT has developed an algorithm that analyses the data generated by an <span class="nowrap">X-Rayl</span> Sensor S3PRS-D installed in the brake air conduct of a rail asset. Every time the brake is applied the pressure in this air conduct rises accordingly, a stronger brake activation leads to a higher pressure, then when braking lightly...</p>

                            <p>By analysing the pressure profile and the brake application frequency, which is higher in hilly or mountainous terrain, the algorithm can estimate the resulting brake wear of each asset over time. This Brake Health Indicator is calculated continuously for each equipped asset, allowing our customers to predictively send cars with high brake utilisation to a workshop for brake maintenance, before they are put out of service due to worn down brakes.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            // German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-brake.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Brake Health Indicator</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">Die rechtzeitige Wartung des Bremssystems eines Eisenbahnwagens ist ein wichtiger Faktor für die Aufrechterhaltung des Betriebs und der optimalen Auslastung der Wagen, da ungeplante Wartungsarbeiten zu schwerwiegenden Unterbrechungen der Logistikströme führen können. Um die Auslastung des Bremssystems zu überwachen, hat DOT einen Algorithmus entwickelt, der die Daten analysiert, die von einem Röntgensensor S3PRS-D erzeugt werden, der in der Bremsluftleitung eines Schienenfahrzeugs installiert ist. Jedes Mal, wenn die Bremse betätigt wird, steigt der Druck in dieser Luftleitung entsprechend an, eine stärkere Bremsbetätigung führt zu einem höheren Druck als bei einer leichten Bremsung...</p>

                            <p>Durch die Analyse des Druckprofils und der Häufigkeit der Bremsbetätigung, die in hügeligem oder bergigem Gelände höher ist, kann der Algorithmus den daraus resultierenden Bremsenverschleiß jeder Anlage im Laufe der Zeit abschätzen. Dieser "Brake Health Indicator" wird kontinuierlich für jedes ausgerüstete Fahrzeug berechnet und ermöglicht es unseren Kunden, Fahrzeuge mit hoher Bremsenauslastung vorausschauend zur Bremsenwartung in eine Werkstatt zu schicken, bevor sie aufgrund verschlissener Bremsen außer Betrieb genommen werden.</p>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
        sub1GhzPrep: {
            button: document.getElementById('sub1GhzPrepBtn'),
            contentEN: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="./images/icons/icon-frequency.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Sub 1GHz preparation</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">From today's point of view, it is not yet clearly defined which technology will be used for intra-train communication, i.e. communication between freight wagons and/or the locomotive. The Working Group 4 of the ITSS is currently considering to solve this via the 2.4 GHz interface, in which each telematics device serves as a relay to bridge the length of a train in several hops. The LM-EJ takes this uncertainty into account by providing a dedicated radio transmitter and receiver for sub 1Ghz with a power of 20 dBm. Although an external antenna is required, the Sub 1Ghz offers several advantages over the 2.4Ghz spectrum...</p>

                            <ul>
                                <li>Range of Sub 1Ghz Wireless: Sub 1Ghz offers more range than 2.4Ghz. Sub 1Ghz wireless transmission provides 1.5-2 times the distance coverage than 2.4Ghz spectrum. In addition, the Sub 1Ghz wireless spectrum has a Long-Range mode, which can have a range of more than 100 km, if the power is sufficient.</li>

                                <li>Lower power consumption: wireless sub 1Ghz RF requires a lower power signal from the transmitter-receiver compared to the 2.4Ghz spectrum to maintain the same output power signal at the receiver.</li>

                                <li>Interference: the wireless sub 1Ghz spectrum can handle interference better. This is because they operate at a lower frequency and use fewer existing applications with this spectrum.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="./images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,

            // German
            contentDE: `
                <div class="popout-main">
                    <div class="popout-icon-container">
                        <img src="../images/icons/icon-frequency.png" alt="" class="popout-icon">
                    </div>

                    <div class="popout-text-container">
                        <div class="popout-header">
                            <h3>Sub 1GHz Vorbereitung</h3>
                        </div>
                        <div class="popout-description">
                            <p class="light">Aus heutiger Sicht ist noch nicht klar definiert, mit welcher Technologie <span class="nowrap">Intra-Train-Kommunikation</span>, also die Kommunikation zwischen Güterwagen untereinander <span class="nowrap">und / oder</span> der Lok, bewerkstelligt werden wird. In der Working Group 4 der ITSS wird derzeit angedacht, dies über die 2,4 GHz Schnittstelle zu lösen, in dem jedes Telematik Gerät als Relay dient, um die Länge eines Zuges in mehreren Sprüngen (engl. Hops) zu überbrücken. Mit dem LM-EJ wurde dieser Unsicherheit Rechnung getragen und ein eigener Funksender und Empfänger für Sub 1Ghz mit einer Leistung von 20 dBm vorgesehen. Obwohl eine externe Antenne benötigt wird, bietet der Sub 1Ghz mehrere Vorteile gegenüber dem 2,4Ghz-Spektrum...</p>

                            <ul>
                                <li>Reichweite von Sub 1Ghz Wireless: Sub 1Ghz bietet mehr Reichweite als 2.4Ghz. Die drahtlose Sub 1Ghz Übertragung bietet eine 1,5-2-fache Entfernungsabdeckung als das 2,4Ghz Spektrum. Außerdem verfügt das Sub 1Ghz Funkspektrum bei entsprechender Leistung über einen Long Range Modus, der mehr als 100 km Reichweite haben kann.</li>

                                <li>Geringerer Stromverbrauch: Wireless Sub 1 Ghz RF benötigt ein niedrigeres Leistungssignal vom Sender-Empfänger im Vergleich zum 2,4 Ghz Spektrum, um das gleiche Ausgangsleistungssignal am Empfänger zu erhalten.</li>

                                <li>Störung: das drahtlose Sub 1Ghz-Spektrum kann Störungen besser bewältigen. Dies liegt daran, dass sie mit einer niedrigeren Frequenz arbeiten und weniger bestehende Anwendungen mit diesem Spektrum nutzen.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button id="popoutCloseBtn" class="popout-close-btn"><img src="../images/icons/icon-xmark.png" class="x-icon" draggable="false"></span></button>`,
        },
    }

    // Add eventlisteners to each button and assign / update content based on attribute
    Object.keys(attributes).forEach((key) => {
        attributes[key].button.addEventListener('click', () => {
            if (currentLanguage === 'en') {
                popout.innerHTML = attributes[key].contentEN
            } else if (currentLanguage === 'de') {
                popout.innerHTML = attributes[key].contentDE
            }
            openPopout()
        })
    })

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
})()
