import chroma from 'chroma-js'

const MAX_HUE = 360
const MAX_LIGHTNESS = 1

export const getComplementaryColors = (
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

export const getHueShifts = (
    baseColour: chroma.Color,
    changePerShift: number,
    shiftQuantity: number,
    startingPoint: number = 0, // moves the base hue by changePerShift * n
) => {
    const [baseLightness, baseChroma, baseHue] = baseColour.oklch()

    const hueModifier = changePerShift * startingPoint
    const workingHue = (baseHue + hueModifier) % MAX_HUE

    const palette: Array<chroma.Color> = []
    for (let i = 0; i < shiftQuantity; i++) {
        const calculatedHue = (workingHue + changePerShift * i) % MAX_HUE
        palette.push(chroma(baseLightness, baseChroma, calculatedHue, 'oklch'))
    }

    return palette
}

export const getLightnessShifts = (
    baseColour: chroma.Color,
    changePerShift: number,
    shiftQuantity: number,
    startingPoint: number = 0, // moves the base lightness by changePerShift * n
) => {
    const [baseLightness, baseChroma, baseHue] = baseColour.oklch()

    const ligthnessModifier = changePerShift * startingPoint
    const workingLightness = (baseLightness + ligthnessModifier) % MAX_LIGHTNESS

    const palette: Array<chroma.Color> = []
    for (let i = 0; i < shiftQuantity; i++) {
        const calculatedLightness =
            (workingLightness + changePerShift * i) % MAX_LIGHTNESS
        palette.push(chroma(calculatedLightness, baseChroma, baseHue, 'oklch'))
    }

    return palette
}

export const getRandomBaseColour = () => {
    return chroma.random()
}

export const getRandomPalette = (colorAmount = 4) => {
    const baseColour = getRandomBaseColour()
    const changePerShift = 30

    const options = [
        () => {
            return getLightnessShifts(baseColour, changePerShift, colorAmount)
        },
        () => {
            return getHueShifts(baseColour, changePerShift, colorAmount)
        },
        () => {
            return getComplementaryColors(baseColour, colorAmount)
        }
    ]

    return options[Math.floor(Math.random() * options.length)]()
}
/*
    NOTES
    chroma = intensity of the colour
    hue = place in rainbow
    lightness = well, yeah
*/
