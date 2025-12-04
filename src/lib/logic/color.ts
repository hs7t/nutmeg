import chroma from 'chroma-js'

export type Lightness = number
export type Chroma = number
export type Hue = number

export class Color {
    properties: [Lightness, Chroma, Hue]

    constructor(properties: [Lightness, Chroma, Hue]) {
        this.properties = properties
    }

    chromaJS = () => {
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
        const startingHue = baseHue - degreeChangePerStep * -offset

        const result = []

        for (let i = 0; i < amount - 1; i++) {
            const hue = startingHue + degreeChangePerStep * i
            result.push(hue)
        }

        return result
    }
}
