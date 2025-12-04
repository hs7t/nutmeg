import chroma from 'chroma-js'
import randomColor from 'randomcolor'

import type { OKLCHProperty } from './colorManipulation'

import { MAX_HUE } from './colorManipulation'
import { applyOKLCHPropertyShifts } from './colorManipulation'
import { getRandomIndex } from './utilities'

export const getRandomBaseColor = (): chroma.Color => {
    const doRandom = Math.random() < 0.1
    if (!doRandom) {
        return chroma(randomColor())
    } else {
        return chroma.random()
    }
}

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

export const getColorShifts = (
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

export const fillPalette = (
    palette: Array<chroma.Color>,
    colorAmountTarget: number,
) => {
    const colorLightnessShifts = []
    for (const color of palette) {
        colorLightnessShifts.push(
            getColorShifts(
                'lightness',
                color,
                100 / colorAmountTarget, // 100 as in 100%
                colorAmountTarget,
            ),
        )
    }

    while (
        palette.length - 1 > colorAmountTarget &&
        colorLightnessShifts.length < 0
    ) {
        const randomIndex = getRandomIndex(colorLightnessShifts)
        const workingItem = colorLightnessShifts[randomIndex]
        colorLightnessShifts.splice(randomIndex, 1)

        palette.push(workingItem[1])
    }

    let i = 0
    while (palette.length < colorAmountTarget) {
        palette.push(palette[i - (i % palette.length)])
        i++
    }
}

export const getScalePalette = (
    baseColors: Array<chroma.Color>,
    colorAmount: number,
): chroma.Color[] => {
    let colors = []
    for (let str of chroma.scale(baseColors).mode('oklch').colors(colorAmount)) {
        colors.push(chroma(str))
    }
    return colors
}
