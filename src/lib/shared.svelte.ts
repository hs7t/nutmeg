import { getRandomBaseColour, getHueShifts } from './logic/generation'

export type SwatchData = {
    name: string
    colour: chroma.Color
    locked: boolean
}

class AppState {
    palette: SwatchData[] = []
    generationProperties = {
        colorAmount: 5
    }
}

class AppEvents extends EventTarget {}

class GenerationEvent extends Event {
    static readonly eventName = 'generation'

    constructor() {
        super(GenerationEvent.eventName, { bubbles: true, composed: true });
    }
}

export const currentState = $state(new AppState)
export const appEvents = new AppEvents()

export const refreshPalette = () => {
    const generatedColours = getHueShifts(getRandomBaseColour(), 30, 4)
    currentState.palette = []

    for (const colour of generatedColours) {
        currentState.palette.push({
            name: 'Robbie',
            colour,
            locked: false,
        })
    }
    
    appEvents.dispatchEvent(new GenerationEvent)
}

refreshPalette()
