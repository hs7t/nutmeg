import chroma from 'chroma-js'

export type OKLCHProperty = 'lightness' | 'chroma' | 'hue'

export const MAX_HUE = 360
export const MAX_LIGHTNESS = 1
export const MAX_CHROMA = 0.4 // this is not the most you can have but screens and all

export const applyOKLCHPropertyShifts = (
    colors: chroma.Color[],
    targetProperty: OKLCHProperty,
    shiftPercentage: number,
) => {
    // Shifts every targetProperty of colors by shiftPercentage of MAX_<property>

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
    for (const color of colors) {
        const oklchColor = color.oklch()
        oklchColor[targetPropertyAsIndex] =
            (oklchColor[targetPropertyAsIndex] + shiftPercentageAsUnits * i) %
            targetPropertyMaximumValue

        result.push(chroma(...oklchColor, 'oklch'))
        i++
    }

    return result
}
