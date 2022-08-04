currentPage = 'team'
currentCategory = 'about'
;(function () {
    /* ---------
    Team Section 
    ---------- */
    const teamContainer = document.getElementById('teamContainer'),
        teammembers = document.querySelectorAll('.teammember')

    teammembers.forEach((member) => {
        member.addEventListener('mouseenter', (e) => {
            teammembers.forEach((member) => {
                if (member !== e.currentTarget) {
                    member.classList.remove('active')
                }
            })
            member.classList.toggle('active')
        })
    })

    teamContainer.addEventListener('mouseleave', () => {
        teammembers.forEach((member) => {
            member.classList.remove('active')
        })
    })
})()
