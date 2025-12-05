import chroma from 'chroma-js'
import {
    blendColors,
    Color,
    getPaletteFromCJSScale,
    getRandomBaseColor,
    type Palette,
    type PropertyID,
} from './color'
import { getRandomIndex } from './utilities'

export const generateBlendScalarPalette = (
    colorAmount: number,
    baseColorA: Color,
    baseColorB: Color,
): Palette => {
    const blendedColor = blendColors(baseColorA, baseColorB)
    const blendedColorLightnesses = blendedColor.getPropertyStopsToMax(
        'lightness',
        10,
    )
    const midColor =
        blendedColorLightnesses[getRandomIndex(blendedColorLightnesses)]

    const scale = chroma.scale([
        baseColorA.asChromaJS(),
        midColor.asChromaJS(),
        baseColorB.asChromaJS(),
    ])
    const colors = getPaletteFromCJSScale(scale, colorAmount)

    return colors
}

// Clustered palette (ex analogous)
// Poligonic (ex triadic, tetradic...)

export const generateClusteredPalette = (
    colorAmount: number,
    baseColor: Color,
    points: number,
) => {
    let palette = baseColor.withNeighbouringHues(points, true)

    if (palette.length != colorAmount) {
        palette = fitPaletteToLengthWithScale(colorAmount, palette)
    }
    return palette
}

export const generatePoligonicPalette = (
    colorAmount: number,
    baseColor: Color,
    points: number,
) => {
    const hues = baseColor.withPropertyPoligons('hue', points)
    let palette: Palette = hues
    if (hues.length != colorAmount) {
        palette = fitPaletteToLengthWithScale(colorAmount, palette)
    }

    return palette
}

export const generateLightnessShiftPalette = (
    colorAmount: number,
    baseColor: Color,
    steps: number
) => {
    const property: PropertyID = 'lightness'

    let palette = baseColor.withPropertyPoligons(property, steps)
    if (palette.length != colorAmount) {
        palette = fitPaletteToLengthWithScale(colorAmount, palette)
    }
    return palette
}

export const generateRandomPalette = (
    colorAmount: number
) => {
    const colors: Array<Color> = []

    for (let i = 0; i < colorAmount; i++) {
        colors.push(getRandomBaseColor())
    }

    return colors
}

// function fitPaletteToLengthWithShades(
//     targetLength: number,
//     palette: Palette,
// ): Palette {
//     if (palette.length > targetLength) {
//         return palette.splice(targetLength - 1)
//     }

//     const availableColors = structuredClone(palette)
//     while (palette.length < targetLength) {
//         const workingColorIndex = getRandomIndex(availableColors)
//         const workingColor = availableColors[workingColorIndex]
//         availableColors.splice(workingColorIndex, 1)

//         const lightnessStops = workingColor.getPropertyStopsToMax(
//             'lightness',
//             targetLength,
//         )
//         const fillColor = lightnessStops[getRandomIndex(lightnessStops)]
//         palette.push(fillColor)
//     }

//     return palette
// }

function fitPaletteToLengthWithScale(
    targetLength: number,
    palette: Palette,
): Palette {
    const chromaJSPaletteColors = palette.map((color) => {
        return color.asChromaJS()
    })
    palette = getPaletteFromCJSScale(
        chroma.scale(chromaJSPaletteColors),
        targetLength,
    )

    return palette
}
