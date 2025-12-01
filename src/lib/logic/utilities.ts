import chroma from 'chroma-js'

export const chooseBestContrastingForColour = (
    colour: chroma.Color,
    optionA: chroma.Color,
    optionB: chroma.Color,
) => {
    const contrastA = chroma.contrast(colour, optionA)
    const contrastB = chroma.contrast(colour, optionB)

    return contrastA > contrastB ? optionA : optionB
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
