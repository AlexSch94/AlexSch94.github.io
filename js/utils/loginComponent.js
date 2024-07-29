class LoginComponent {
    constructor() {
        let language = document.documentElement.getAttribute('lang')
        if (language == undefined) language = 'en'
        this.translations =
            language == 'en'
                ? {
                      userName: 'Username',
                      password: 'Password',
                      imgHtml: '/images/icons/new_sigil.png',
                  }
                : {
                      userName: 'Benutzername',
                      password: 'Passwort',
                      imgHtml: '/images/icons/new_sigil_de.png',
                  }
    }

    render(targetElement) {
        const template = this.getTemplate()
        const clone = document.importNode(template.content, true)
        targetElement.appendChild(clone) // Append the component to the target element
    }

    getTemplate() {
        const template = document.createElement('template')
        template.innerHTML = `
        <div class="login-wrapper">
            <div class="login-container">
                <div class="login-heading">
                    <h3>DOT-Link Login</h3>                        
                </div>
                    
                <div class="vswitch-btn-container">
                    <img src="${this.translations.imgHtml}" alt="" class="new-sigil">
                    <div class="vswitch-btn-highlight"></div>
                    <div class="vswitch-sub-btn vswitch-classic-btn">
                        <div class="text">Classic</div>
                    </div>
                    <div class="vswitch-sub-btn vswitch-new-btn">
                        <div class="text">DOT-Link 4.0</div>
                    </div>
                </div> 
                        
                <form action="https://dotlink.dot-telematik.com/users/login" id="loginForm" class="login-form" method="post" accept-charset="utf-8" autocomplete="on" onsubmit="handleLoginForm(event)">
                    <fieldset>
                        <div class="input-text-div">
                            <label for="UserName">${this.translations.userName}</label>
                            <input name="data[User][name]" type="text" maxlength="50" required="required" id="UserName" autocomplete="username"
                            class="input-text-field">
                        </div>
                        <div class="input-text-div">
                            <label for="UserPassword">${this.translations.password}</label>
                            <input name="data[User][password]" type="password" required="required" id="UserPassword" autocomplete="current-password"
                            class="input-text-field">
                        </div>
                    </fieldset>
                        
                        <div id="errorContainer" class="error-container">
                            <div id="errorMessage" class="error-message"></div>
                        </div> 
                        
                        <div class="submit-btn-wrapper">
                            <input type="submit" value="Login" class="login-submit-btn" id="loginSubmitBtn">
                        </div>
                    </form>
                        
                    <button id="loginCloseBtn" class="login-close-btn"><img src="/images/icons/icon-xmark.png?v=03.07.2023" class="x-icon" draggable="false"></span></button>
            </div>
        </div>  
                                `
        return template
    }
}

async function handleLoginForm(event) {
    if (!use4) return // Let event run to php handler via form default action -> classic portal
    event.preventDefault() // Prevent sending request to classic portal handler -> continue to DOT-Link 4.0 login below
    let errMessage = ''
    try {
        // --------------------- Attempt login ---------------------
        Cookies.resetLoginCookies()
        const url = 'https://portal.dot-telematik.com/v1/auth/login/'
        const dataToSend = JSON.stringify({
            user: document.getElementById('UserName').value,
            password: document.getElementById('UserPassword').value,
        })
        // Make request
        /* prettier-ignore */
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            timeout: 5000,
            body: dataToSend,
        
        })
        // ------------------- Respone handling -------------------
        if (response.ok) {
            // Login successful, store tokens as cookies and redirect
            const responseData = await response.json()
            Cookies.set('accessToken', responseData.accessToken, { days: 0, minutes: 10 })
            Cookies.set('refreshToken', responseData.refreshToken, { days: 0, minutes: 10 })
            window.location.href = 'https://portal.dot-telematik.com/'
            // window.location.href = 'http://localhost:59102/' // TODO: For testing on local machine
        } else {
            // Invalid response
            console.error(`HTTP Error - Status code: ${response.status}`)
            switch (response.status) {
                case 401:
                    errMessage = currentLanguage == 'en' ? 'Invalid credentials' : 'Ungültige Anmeldedaten'
                    break
                case 404:
                    errMessage =
                        currentLanguage == 'en'
                            ? 'Server not reachable - Please try again later'
                            : 'Server nicht erreichbar - Bitte versuchen Sie es später noch einmal'
                    break
                case 500:
                    errMessage =
                        currentLanguage == 'en'
                            ? 'Internal Server Error - Please try again later'
                            : 'Interner Serverfehler - Bitte versuchen Sie es später noch einmal'
                    break
                default:
                    errMessage =
                        currentLanguage == 'en'
                            ? 'Something went wrong - Please try again later'
                            : 'Etwas ist schiefgelaufen - Bitte versuchen Sie es später noch einmal'
            }
        }
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            errMessage =
                currentLanguage == 'en'
                    ? 'Server Timeout - Please try again later'
                    : 'Server Timeout - Bitte versuchen Sie es später noch einmal'
        } else {
            // Generic error occured - redirect to DOT-Link login page
            window.location.href = 'https://portal.dot-telematik.com/login'
        }
    } finally {
        // Login failed
        if (errMessage == '') {
            errorContainer.style.display = 'none'
        } else {
            errorContainer.style.display = 'block'
            errorMessageElement.innerText = errMessage
        }
    }
}
