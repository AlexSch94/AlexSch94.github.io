function incrementCounter(
    element,
    currentVal,
    finalVal,
    steps = 40,
    duration = 3000
) {
    if (finalVal > 1000000000) {
        return console.warn(
            'Function needs to be extended for values over 1 billion (at ' +
                element.id +
                ')'
        )
    }

    const timeout = duration / steps,
        increment = (finalVal - currentVal) / steps

    let array = [],
        valString = '',
        part1 = 0,
        part2 = 0,
        part3 = 0

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
            if (currentVal > 999 && currentVal <= 999999) {
                part1 = valString.slice(-6, -3)
                part2 = valString.slice(-3)

                valString = part1 + '.' + part2
            } else if (currentVal > 999999) {
                part1 = valString.slice(-9, -6)
                part2 = valString.slice(-6, -3)
                part3 = valString.slice(-3)

                valString = part1 + '.' + part2 + '.' + part3
            }

            array.push(valString)
        }
    }

    finalVal = finalVal.toString()
    if (finalVal > 999 && currentVal <= 999999) {
        part1 = finalVal.slice(-6, -3)
        part2 = finalVal.slice(-3)

        finalVal = part1 + '.' + part2
    } else if (finalVal > 999999) {
        part1 = finalVal.slice(-9, -6)
        part2 = finalVal.slice(-6, -3)
        part3 = finalVal.slice(-3)

        finalVal = part1 + '.' + part2 + '.' + part3
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
