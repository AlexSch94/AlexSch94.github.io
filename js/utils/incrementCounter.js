function incrementCounter(
    element,
    currentVal,
    finalVal,
    steps = 40,
    duration = 2500
) {
    const timeout = duration / steps,
        increment = (finalVal - currentVal) / steps

    let array = []

    if (increment > 0.5) {
        for (let i = 0; i < steps; i++) {
            currentVal += increment
            array.push(Math.floor(currentVal))
        }
    } else {
        for (let i = 0; i < steps; i++) {
            currentVal += increment
            array.push(currentVal.toFixed(1))
        }
    }

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

function replaceElement(e) {
    const element = e,
        copy = e.clone()

    copy.replaceElement(element)
}
