import chroma from 'chroma-js'
import randomColor from 'randomcolor'

type OKLCHProperty = 'lightness' | 'chroma' | 'hue'

const MAX_HUE = 360
const MAX_LIGHTNESS = 1
const MAX_CHROMA = 0.4 // this is not the most you can have but screens and all

export const applyOKLCHPropertyShifts = (
    colours: chroma.Color[],
    targetProperty: OKLCHProperty,
    shiftPercentage: number,
) => {
    // Shifts every targetProperty of colours by shiftPercentage of MAX_<property>

    let targetPropertyAsIndex, targetPropertyMaximumValue

    switch (targetProperty) {
        case 'lightness':
            ;[targetPropertyAsIndex, targetPropertyMaximumValue] = [
                0,
                MAX_LIGHTNESS,
            ]
            break
        case 'chroma':
            ;[targetPropertyAsIndex, targetPropertyMaximumValue] = [
                1,
                MAX_CHROMA,
            ]
            break
        case 'hue':
            ;[targetPropertyAsIndex, targetPropertyMaximumValue] = [2, MAX_HUE]
            break
    }

    const shiftPercentageAsUnits =
        (shiftPercentage * targetPropertyMaximumValue) / 100

    const result: chroma.Color[] = []
    let i = 0
    for (const colour of colours) {
        const oklchColour = colour.oklch()
        oklchColour[targetPropertyAsIndex] =
            (oklchColour[targetPropertyAsIndex] + shiftPercentageAsUnits * i) %
            targetPropertyMaximumValue

        result.push(chroma(...oklchColour, 'oklch'))
        i++
    }

    return result
}

export const getComplementaryColorPalette = (
    baseColour: chroma.Color,
    hueDivisions: number,
) => {
    /*
        generates complimentary colours!

        hueDivisions -> scheme type
            2 = complementary
            3 = triadic
            4 = square tetradic
            5 = pentagonal
    */

    const increment = MAX_HUE / hueDivisions

    const [baseLightness, baseChroma, _] = baseColour.oklch()

    const palette: Array<chroma.Color> = []

    for (let i = 0; i < hueDivisions; i++) {
        const calculatedHue = (+increment * i) % MAX_HUE
        palette.push(chroma(baseLightness, baseChroma, calculatedHue, 'oklch'))
    }

    return palette
}

export const getShiftPalette = (
    property: OKLCHProperty,
    baseColour: chroma.Color,
    shiftPercentage: number, // percentage of max oklch shift
    shiftQuantity: number,
    // startingPoint: number = 0, // moves the base hue by changePerShift * n
) => {
    let palette: Array<chroma.Color> = []

    for (let i = 0; i < shiftQuantity; i++) {
        palette.push(baseColour)
    }

    palette = applyOKLCHPropertyShifts(palette, property, shiftPercentage)

    return palette
}

export const getRandomBaseColour = (): chroma.Color => {
    const doRandom = Math.random() < 0.1
    if (!doRandom) {
        return chroma(randomColor())
    } else {
        return chroma.random()
    }
}

export const getRandomPalette = (colorAmount = 4): Array<chroma.Color> => {
    const baseColour = getRandomBaseColour()

    const maxChangePerShift = 32
    const minChangePerShift = 26
    let changePerShift = Math.floor(
        Math.random() * (maxChangePerShift - minChangePerShift) +
            minChangePerShift,
    )

    const options = [
        () => {
            if (Math.random() < 0.2) {
                return getComplementaryColorPalette(baseColour, colorAmount)
            }

            const availableProperties: OKLCHProperty[] = [
                'lightness',
                'chroma',
                'hue',
            ]
            const availablePropertiesLastIndex = availableProperties.length - 1

            let randomIndex = Math.round(
                Math.random() * availablePropertiesLastIndex,
            )
            if (randomIndex > availablePropertiesLastIndex)
                randomIndex = availablePropertiesLastIndex

            const chosenProperty = availableProperties[randomIndex]
            console.log(chosenProperty)

            if (chosenProperty == 'hue') {
                // trust me bro
                changePerShift /= Math.floor(Math.random() * 3 - 1)
            } else if (chosenProperty == 'chroma') {
                changePerShift /= Math.floor(Math.random() * 2 - 1)
            }

            return getShiftPalette(
                chosenProperty,
                baseColour,
                changePerShift,
                colorAmount,
            )
        },
    ]

    const selection = options[Math.floor(Math.random() * options.length)] // seems useless right now but will be useful once more generation types available
    const palette = selection()

    if (
        colorAmount > 1 &&
        (chroma.deltaE(palette[0], chroma.average(palette)) < 3 ||
            chroma.deltaE(palette[0], palette[palette.length - 1]) < 2)
    ) {
        return getRandomPalette(colorAmount)
    }
    return palette
}

/*
    NOTES
    chroma = intensity of the colour
    hue = place in rainbow
    lightness = well, yeah
*/
