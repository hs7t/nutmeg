import chroma from 'chroma-js'

type OKLCHProperty = 'lightness' | 'chroma' | 'hue'

const MAX_HUE = 360
const MAX_LIGHTNESS = 1
const MAX_CHROMA = 0.4 // this is not the most you can have but screens and all

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

export const getHueShiftPalette = (
    baseColour: chroma.Color,
    changePerShift: number, // percentage of max oklch shift
    shiftQuantity: number,
    startingPoint: number = 0, // moves the base hue by changePerShift * n
) => {
    const [baseLightness, baseChroma, baseHue] = baseColour.oklch()

    const hueUnits = (changePerShift * MAX_HUE) / 100

    const hueModifier = hueUnits * startingPoint
    const workingHue = (baseHue + hueModifier) % MAX_HUE

    const palette: Array<chroma.Color> = []
    for (let i = 0; i < shiftQuantity; i++) {
        const calculatedHue = (workingHue + hueUnits * i) % MAX_HUE
        palette.push(chroma(baseLightness, baseChroma, calculatedHue, 'oklch'))
    }

    return palette
}

export const getLightnessShiftPalette = (
    baseColour: chroma.Color,
    changePerShift: number, // percentage of max oklch shift
    shiftQuantity: number,
    startingPoint: number = 0, // moves the base lightness by changePerShift * n
) => {
    const [baseLightness, baseChroma, baseHue] = baseColour.oklch()

    const lightnessUnits = (changePerShift * MAX_LIGHTNESS) / 100

    const ligthnessModifier = lightnessUnits * startingPoint
    const workingLightness = (baseLightness + ligthnessModifier) % MAX_LIGHTNESS

    const palette: Array<chroma.Color> = []
    for (let i = 0; i < shiftQuantity; i++) {
        const calculatedLightness =
            (workingLightness + lightnessUnits * i) % MAX_LIGHTNESS
        palette.push(chroma(calculatedLightness, baseChroma, baseHue, 'oklch'))
    }

    return palette
}

export const getChromaShiftPalette = (
    baseColour: chroma.Color,
    changePerShift: number, // percentage of max oklch shift
    shiftQuantity: number,
    startingPoint: number = 0, // moves the base chroma by changePerShift * n
) => {
    const [baseLightness, baseChroma, baseHue] = baseColour.oklch()

    const chromaUnits = (changePerShift * MAX_CHROMA) / 100

    const chromaModifier = chromaUnits * startingPoint
    const workingChroma = (baseChroma + chromaModifier) % MAX_CHROMA

    const palette: Array<chroma.Color> = []
    for (let i = 0; i < shiftQuantity; i++) {
        const calculatedChroma = (workingChroma + chromaUnits * i) % MAX_CHROMA
        palette.push(chroma(baseLightness, calculatedChroma, baseHue, 'oklch'))
    }

    return palette
}

export const getRandomBaseColour = () => {
    return chroma.random()
}

export const getRandomPalette = (colorAmount = 4) => {
    const baseColour = getRandomBaseColour()

    const maxChangePerShift = 40
    const minChangePerShift = 10
    const changePerShift = Math.floor(
        Math.random() * (maxChangePerShift - minChangePerShift) +
            minChangePerShift,
    )

    const options = [
        () => {
            return getLightnessShiftPalette(baseColour, changePerShift, colorAmount)
        },
        () => {
            return getHueShiftPalette(baseColour, changePerShift, colorAmount)
        },
        () => {
            return getChromaShiftPalette(baseColour, changePerShift, colorAmount)
        },
        () => {
            return getComplementaryColorPalette(baseColour, colorAmount)
        },
    ]

    const selection = options[Math.floor(Math.random() * options.length)]
    console.log(selection)
    return selection()
}

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
        oklchColour[targetPropertyAsIndex] += shiftPercentageAsUnits * i

        result.push(chroma(oklchColour))
        i++
    }
}

/*
    NOTES
    chroma = intensity of the colour
    hue = place in rainbow
    lightness = well, yeah
*/
