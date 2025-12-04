import chroma from 'chroma-js'

export const MAX_LIGHTNESS = 1
export const MAX_HUE = 360
export const MAX_CHROMA = 0.4 // this is not the most you can have but screens and all

export type Lightness = number
export type Chroma = number
export type Hue = number

export type PropertyID = 'hue' | 'lightness' | 'chroma'

export class Color {
    properties: [Lightness, Chroma, Hue]

    constructor(properties: [Lightness, Chroma, Hue]) {
        this.properties = properties
    }

    asChromaJS = () => {
        return chroma.oklch(...this.properties)
    }

    withNeighbouringHues = (
        amount: number,
        center: boolean = false,
        degreeChangePerStep = 30,
    ) => {
        let offset = 0
        if (center == true) {
            offset = Math.floor(amount / 2)
        }

        const baseHue = this.properties[2]
        const startingHue = baseHue - degreeChangePerStep * offset

        const result = []

        for (let i = 0; i < amount - 1; i++) {
            const hue = startingHue + degreeChangePerStep * i
            result.push(hue)
        }

        return result
    }

    getPropertyStops = (property: PropertyID, stopQuantity: number) => {
        const propertyMaxValue = getMaxValue(property)
        const workingPropertyIndex = getPropertyIndex(property)

        const valuePerStop = propertyMaxValue / stopQuantity

        const result = []
        for (let i = 0; i < stopQuantity; i++) {
            const altered = [...this.properties]
            altered[workingPropertyIndex] = valuePerStop * i
            result.push(altered)
        }

        return result
    }
}

export type Palette = Array<Color>

export const getPaletteFromCJSScale = (scale: chroma.Scale, colorAmount: number) => {
    const hexCodes = scale.colors(colorAmount)
    const palette = hexCodes.map((code) => { chroma(code) })
    return palette
}

export const blendColors = (colorA: Color, colorB: Color): Color => {
    const result = chroma.mix(colorA.asChromaJS(), colorB.asChromaJS(), 0.5, 'oklch')
    return new Color([...result.oklch()])
}

function getMaxValue(property: PropertyID): number {
    switch (property) {
        case 'hue':
            return MAX_HUE
        case 'lightness':
            return MAX_LIGHTNESS
        case 'chroma':
            return MAX_CHROMA
    }
}

function getPropertyIndex(property: PropertyID): number {
    let workingPropertyIndex
    switch (property) {
        case 'lightness':
            workingPropertyIndex = 0
            break
        case 'chroma':
            workingPropertyIndex = 1
            break
        case 'hue':
            workingPropertyIndex = 2
            break
    }
    return workingPropertyIndex
}
