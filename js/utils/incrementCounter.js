export default function incrementCounter(
    element,
    currentVal,
    finalVal,
    steps = 40,
    duration = 3000
) {
    const timeout = duration / steps,
        increment = (finalVal - currentVal) / steps

    let array = []

    if (increment < 0.5) {
        for (let i = 0; i < steps; i++) {
            currentVal += increment
            array.push(currentVal.toFixed(1))
        }
    } else {
        for (let i = 0; i < steps; i++) {
            currentVal += increment
            currentVal = Math.floor(currentVal)
            let formattedVal = new Intl.NumberFormat('en-EN', {})
                .format(currentVal)
                .replaceAll(',', '.')

            array.push(formattedVal)
        }
    }

    finalVal = new Intl.NumberFormat('en-EN', {})
        .format(finalVal)
        .replaceAll(',', '.')

    array.pop()
    array.push(finalVal)

    let i = 0
    let counterInterval = setInterval(() => {
        element.textContent = array[i]
        i++
        if (i === steps) {
            clearInterval(counterInterval)
        }
    }, timeout)
}
