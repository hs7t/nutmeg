import { getRandomBaseColor } from "./color"
import { generateBlendScalarPalette, generateClusteredPalette, generateLightnessShiftPalette, generatePoligonicPalette, generateRandomPalette } from "./palettes"
import { getRandomIndex } from "./utilities"

export const getRandomPalette = (colorAmount: number) => {
    const methods = [
        () => {
            // Blend scalar
            console.log('Blend scalar')
            return generateBlendScalarPalette(colorAmount, getRandomBaseColor(), getRandomBaseColor())
        },
        () => {
            // Analog++
            const points = Math.floor(Math.random() * 5) + 2
            console.log(`Analog, ${points} points`)
            return generateClusteredPalette(colorAmount, getRandomBaseColor(), points)
        },
        () => {
            // N-adic
            const points = Math.floor(Math.random() * 4) + 2
            console.log(`N-adic, ${points} points`)
            return generatePoligonicPalette(colorAmount, getRandomBaseColor(), points)
        },
        () => {
            // C/L shift
            const steps = Math.floor(Math.random() * 3) + 2
            console.log(`Lightness shift, ${steps} steps`)
            return generateLightnessShiftPalette(colorAmount, getRandomBaseColor(), steps)
        },
        () => {
            // Random (ish)
            console.log('Random (ish)')
            return generateRandomPalette(colorAmount)
        }
    ]

    const method = methods[getRandomIndex(methods)]
    return method()
}