import chroma from 'chroma-js'
import randomColor from 'randomcolor'

export const MAX_LIGHTNESS = 1
export const MAX_HUE = 360
export const MAX_CHROMA = 0.4 // this is not the most you can have but screens and all

export type Lightness = number
export type Chroma = number
export type Hue = number

export type PropertyID = 'hue' | 'lightness' | 'chroma'
export type Properties = [Lightness, Chroma, Hue]

export class Color {
    properties: Properties

    constructor(properties: Properties) {
        this.properties = properties
    }

    asChromaJS = () => {
        return chroma.oklch(...this.properties)
    }

    withNeighbouringHues = (
        amount: number,
        center: boolean = false,
        degreeChangePerStep = 30,
    ): Palette => {
        let offset = 0
        if (center == true) {
            offset = Math.floor(amount / 2)
        }

        const [baseLightness, baseChroma, baseHue] = this.properties
        const startingHue = baseHue - degreeChangePerStep * offset

        const result = []

        for (let i = 0; i < amount; i++) {
            const hue = startingHue + degreeChangePerStep * i
            result.push(new Color([baseLightness, baseChroma, hue]))
        }

        return result
    }

    withPropertyPoligons = (property: PropertyID, points: number): Palette => {
        const workingPropertyIndex = getPropertyIndex(property)
        const growth = getMaxValue(property) / points
        const result: Palette = []

        for (let i = 0; i < points; i++) {
            const workingProperties = [...this.properties] as Properties
            workingProperties[workingPropertyIndex] =
                (workingProperties[workingPropertyIndex] + growth * i) %
                getMaxValue(property)
            result.push(new Color(workingProperties))
        }

        return result
    }

    getAbsolutePropertyStops = (
        property: PropertyID,
        stopQuantity: number,
    ): Palette => {
        const propertyMaxValue = getMaxValue(property)
        const workingPropertyIndex = getPropertyIndex(property)

        const valuePerStop = propertyMaxValue / stopQuantity

        const result = []
        for (let i = 0; i < stopQuantity; i++) {
            const alteredProperties = [...this.properties] as Properties
            alteredProperties[workingPropertyIndex] = valuePerStop * i
            result.push(new Color(alteredProperties))
        }

        return result
    }

    getPropertyStopsToMax = (property: PropertyID, stopQuantity: number) => {
        const workingPropertyIndex = getPropertyIndex(property)
        const targetValue =
            getMaxValue(property) - this.properties[workingPropertyIndex]

        const valuePerStop = targetValue / stopQuantity

        const result = []
        for (let i = 0; i < stopQuantity; i++) {
            const alteredProperties = [...this.properties] as Properties
            alteredProperties[workingPropertyIndex] = valuePerStop * i
            result.push(new Color(alteredProperties))
        }

        return result
    }
}

export type Palette = Array<Color>

export const getPaletteFromCJSScale = (
    scale: chroma.Scale,
    colorAmount: number,
): Palette => {
    const hexCodes = scale.colors(colorAmount)
    const palette = hexCodes.map((code) => {
        const properties = chroma(code).oklch() as Properties
        return new Color(properties)
    })
    return palette
}

export const blendColors = (colorA: Color, colorB: Color): Color => {
    const result = chroma.mix(
        colorA.asChromaJS(),
        colorB.asChromaJS(),
        0.5,
        'oklch',
    )
    return new Color([...result.oklch()])
}

export const getRandomBaseColor = () => {
    return new Color(chroma(randomColor()).oklch())
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
