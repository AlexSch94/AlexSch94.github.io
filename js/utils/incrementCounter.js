function incrementCounter(
    element,
    currentVal,
    finalVal,
    steps = 40,
    duration = 2500
) {
    const timeout = duration / steps,
        increment = (finalVal - currentVal) / steps

    let array = [],
        valString = '',
        part1 = 0,
        part2 = 0

    if (increment < 0.5) {
        for (let i = 0; i < steps; i++) {
            currentVal += increment
            array.push(currentVal.toFixed(1))
        }
    } else {
        for (let i = 0; i < steps; i++) {
            currentVal += increment
            currentVal = Math.floor(currentVal)
            valString = currentVal.toString()
            if (currentVal > 999) {
                part1 = valString.slice(-6, -3)
                part2 = valString.slice(-3)

                valString = part1 + '.' + part2
            }

            array.push(valString)
        }
    }

    if (finalVal > 999) {
        finalVal = finalVal.toString()
        part1 = finalVal.slice(-6, -3)
        part2 = finalVal.slice(-3)

        finalVal = part1 + '.' + part2
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
