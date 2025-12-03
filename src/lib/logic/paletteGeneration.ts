import chroma from 'chroma-js'
import randomColor from 'randomcolor'

import type { OKLCHProperty } from './colorManipulation'

import { MAX_HUE } from './colorManipulation'
import { applyOKLCHPropertyShifts } from './colorManipulation'

export const getComplementaryColorPalette = (
    baseColor: chroma.Color,
    hueDivisions: number,
) => {
    /*
        generates complimentary colors!

        hueDivisions -> scheme type
            2 = complementary
            3 = triadic
            4 = square tetradic
            5 = pentagonal
    */

    const increment = MAX_HUE / hueDivisions

    const [baseLightness, baseChroma, _] = baseColor.oklch()

    const palette: Array<chroma.Color> = []

    for (let i = 0; i < hueDivisions; i++) {
        const calculatedHue = (+increment * i) % MAX_HUE
        palette.push(chroma(baseLightness, baseChroma, calculatedHue, 'oklch'))
    }

    return palette
}

export const getShiftPalette = (
    property: OKLCHProperty,
    baseColor: chroma.Color,
    shiftPercentage: number, // percentage of max oklch shift
    shiftQuantity: number,
    // startingPoint: number = 0, // moves the base hue by changePerShift * n
) => {
    let palette: Array<chroma.Color> = []

    for (let i = 0; i < shiftQuantity; i++) {
        palette.push(baseColor)
    }

    palette = applyOKLCHPropertyShifts(palette, property, shiftPercentage)

    return palette
}

export const getRandomBaseColor = (): chroma.Color => {
    const doRandom = Math.random() < 0.1
    if (!doRandom) {
        return chroma(randomColor())
    } else {
        return chroma.random()
    }
}
