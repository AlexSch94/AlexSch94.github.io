/* -------------------------
    Autoplay & Loop Intro-Video
    ------------------------- */
const vid = document.getElementById('introVideo')

// Start
vid.currentTime = 1.5
vid.play()

// Loop
vid.addEventListener('ended', () => {
    vid.currentTime = 8.3525
    vid.play()
})
