import chroma from 'chroma-js'
import {
    blendColors,
    Color,
    getPaletteFromCJSScale,
    type Palette,
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
        4,
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
