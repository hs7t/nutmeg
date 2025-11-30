import chroma from 'chroma-js'

const MAX_HUE = 360
const MAX_LIGHTNESS = 1

export const getAnalogousPalette = (
    baseColour: chroma.Color,
    increment: number = 30,
) => {
    /*
        WIKIPEDIA: Analogous color schemes (also called dominance harmony)
        are groups of colors that are adjacent to each other on the color wheel,
        with one being the dominant color, which tends to be a primary or
        secondary color, and two on either side complementing, which tend to
        be tertiary. This usually translates to a three-color combination
        consisting of a base color and two colors that are 30 degrees and
        330 degrees apart from the base color.

        (increment = 30 will give you this setup)
    */

    const oklchColour = baseColour.oklch()

    const baseLightness = oklchColour[0]
    const baseChroma = oklchColour[1]
    const baseHue = oklchColour[2]

    const analogousAHue = (baseHue + increment) % MAX_HUE
    const analogousBHue = (baseHue - increment) % MAX_HUE

    const analogousA = chroma.oklch(baseLightness, baseChroma, analogousAHue)
    const analogousB = chroma.oklch(baseLightness, baseChroma, analogousBHue)

    return [oklchColour, analogousA, analogousB]
}

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



/*
    NOTES
    chroma = intensity of the colour
    hue = place in rainbow
    lightness = well, yeah
*/
