import { getRandomPalette } from './logic/generation'
import { getNamesForColors } from './logic/utilities'
import chroma from 'chroma-js'

export type SwatchData = {
    name: string
    color: chroma.Color
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
    const generatedColors = getRandomPalette(
        currentState.generationProperties.colorAmount,
    )

    const workingPalette: Array<SwatchData> = currentState.palette

    const colorNames = await getNamesForColors(generatedColors)

    for (let i = 0; i < generatedColors.length; i++) {
        if (workingPalette[i] && workingPalette[i]?.locked) {
            continue
        }

        workingPalette[i] = {
            name: colorNames[i],
            color: generatedColors[i].asChromaJS(),
            locked: false,
        }
    }

    currentState.palette = [...workingPalette]
    appEvents.dispatchEvent(new GenerationEvent())
}
