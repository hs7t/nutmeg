import chroma from 'chroma-js'
import type { OKLCHProperty } from './colorManipulation'
import {
    getRandomBaseColor,
    getComplementaryColorPalette,
    getShiftPalette,
} from './paletteGeneration'
import { getRandomIndex } from './utilities'

export const getRandomPalette = (colorAmount = 4): Array<chroma.Color> => {
    const baseColor = getRandomBaseColor()

    const maxChangePerShift = 32
    const minChangePerShift = 26
    let changePerShift = Math.floor(
        Math.random() * (maxChangePerShift - minChangePerShift) +
            minChangePerShift,
    )

    const options = [
        () => {
            const availableProperties: OKLCHProperty[] = [
                'lightness',
                'chroma',
                'hue',
            ]

            const chosenProperty =
                availableProperties[getRandomIndex(availableProperties)]
            console.log(chosenProperty)

            if (chosenProperty == 'hue') {
                // trust me bro
                changePerShift /= Math.floor(Math.random() * 3 - 1)
            } else if (chosenProperty == 'chroma') {
                changePerShift /= Math.floor(Math.random() * 2 - 1)
            }

            return getShiftPalette(
                chosenProperty,
                baseColor,
                changePerShift,
                colorAmount,
            )
        },
        () => {
            const methods = ['scalar', 'complimentary']
            const chosenMethod = methods[getRandomIndex(methods)]
            console.log(chosenMethod)

            switch (chosenMethod) {
                case 'scalar':
                    {
                        const colors = getShiftPalette(
                            'lightness',
                            baseColor,
                            100 / colorAmount,
                            colorAmount,
                        )
                    }
                    break
            }
        },
    ]

    const selection = options[Math.floor(Math.random() * options.length)] // seems useless right now but will be useful once more generation types available
    const palette = selection()

    if (
        colorAmount > 1 &&
        (chroma.deltaE(palette[0], chroma.average(palette)) < 3 ||
            chroma.deltaE(palette[0], palette[palette.length - 1]) < 2)
    ) {
        return getRandomPalette(colorAmount)
    }
    return palette
}

/*
    NOTES
    chroma = intensity of the color
    hue = place in rainbow
    lightness = well, yeah
*/
