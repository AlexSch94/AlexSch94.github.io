;(function () {
    const vid = document.querySelector('video')
    let isScrolling = false

    window.addEventListener('scroll', () => {
        let scrollTimer
        isScrolling = true
        clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
            isScrolling = false
        }, 50)
    })

    const registerVideo = (bound, video) => {
        bound = document.querySelector(bound)
        video = document.querySelector(video)
        const scrollVideo = () => {
            if (video.duration && isScrolling) {
                const distanceFromTop =
                    window.scrollY + bound.getBoundingClientRect().top
                const rawPercentScrolled =
                    (window.scrollY - distanceFromTop) /
                    (bound.scrollHeight - window.innerHeight)
                const percentScrolled = Math.min(
                    Math.max(rawPercentScrolled, 0),
                    1
                )

                video.currentTime = video.duration * percentScrolled
            }
            requestAnimationFrame(scrollVideo)
        }
        requestAnimationFrame(scrollVideo)
    }

    registerVideo('body', '#backgroundVideo')
})()
