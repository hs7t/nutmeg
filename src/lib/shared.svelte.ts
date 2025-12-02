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

    const workingPalette: Array<SwatchData> = currentState.palette

    const colourNames = await getNamesForColours(generatedColours)

    for (let i = 0; i < generatedColours.length; i++) {
        if (workingPalette[i] && workingPalette[i]?.locked) {
            continue
        }

        workingPalette[i] = {
            name: colourNames[i],
            colour: generatedColours[i],
            locked: false,
        }
    }

    currentState.palette = [...workingPalette]
    appEvents.dispatchEvent(new GenerationEvent())
}
