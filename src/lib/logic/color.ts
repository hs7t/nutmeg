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
}
