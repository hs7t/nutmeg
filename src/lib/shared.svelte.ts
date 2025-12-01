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

export const currentState = $state(new AppState)

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
}

refreshPalette()
