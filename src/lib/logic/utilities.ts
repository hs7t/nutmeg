import chroma from 'chroma-js'
import ky from 'ky'

export const chooseBestContrastingForColour = (
    colour: chroma.Color,
    optionA: chroma.Color,
    optionB: chroma.Color,
) => {
    const contrastA = chroma.contrast(colour, optionA)
    const contrastB = chroma.contrast(colour, optionB)

    return contrastA > contrastB ? optionA : optionB
}

export const getNamesForColours = async (
    colours: chroma.Color[],
): Promise<Array<string>> => {
    const url = new URL('https://api.color.pizza/v1/')

    const colourHEXCodes: Array<string> = []
    for (const colour of colours) {
        colourHEXCodes.push(colour.hex())
    }
    const coloursSearchString = colours.join(',').replaceAll('#', '')

    let result
    try {
        result = (await ky
            .get(url, {
                searchParams: {
                    values: coloursSearchString,
                },
            })
            .json()) as any
    } catch {
        return colours.map(() => 'Unknown')
    }

    return colours.map((_colour, i) => {
        return result.colors[i]['name']
    })
}

export const getCSSPropertyValue = (
    value: string,
    targetElement: HTMLElement,
    fallback = '',
): string => {
    if (!targetElement) return fallback

    const found = window.getComputedStyle(targetElement).getPropertyValue(value)
    const result = found ? found : fallback

    return result
}
