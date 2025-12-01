import { getRandomPalette } from './logic/generation'
import { getNamesForColours } from './logic/utilities'
import chroma from 'chroma-js'

export type SwatchData = {
    name: string
    colour: chroma.Color
    locked: boolean
}

class AppEvents extends EventTarget {}

class GenerationEvent extends Event {
    static readonly eventName = 'generation'

    constructor() {
        super(GenerationEvent.eventName, { bubbles: true, composed: true })
    }
}

export const currentState = $state({
    palette: [] as SwatchData[],
    generationProperties: {
        colorAmount: 5,
    },
})

export const appEvents = new AppEvents()

export const refreshPalette = async () => {
    const generatedColours = getRandomPalette(
        currentState.generationProperties.colorAmount,
    )
    currentState.palette = []

    const colourNames = await getNamesForColours(generatedColours)
    for (let i = 0; i < generatedColours.length; i++) {
        currentState.palette.push({
            name: colourNames[i],
            colour: generatedColours[i],
            locked: false,
        })
    }

    appEvents.dispatchEvent(new GenerationEvent())
}
