<script lang="ts">
    import type { SwatchData } from '$lib/shared.svelte'

    import chroma from 'chroma-js'
    import { chooseBestContrastingForColour } from '$lib/logic/utilities'

    import PinButton from './buttons/PinButton.svelte'

    let { swatchData }: { swatchData: SwatchData } = $props()

    let element: HTMLElement | undefined = undefined

    const getVariableValue = (value: string): string => {
        const fallback = '#1e1e1e'
        if (!element) return fallback

        let found = window.getComputedStyle(element).getPropertyValue(value)
        const result: string = found ? found : fallback

        console.log(value, found, fallback)
        return result
    }

    let contrastingColor = $state('#000000')

    $effect(() => {
        if (!element) return
        contrastingColor = chooseBestContrastingForColour(
            swatchData.colour,
            chroma(getVariableValue('--t-color-contrast-A')),
            chroma(getVariableValue('--t-color-contrast-B')),
        ).css('rgb')
    })
</script>

<div
    class="swatch"
    bind:this={element}
    style:background-color={swatchData.colour.hex()}
    style:color={contrastingColor}
>
    <div class="info">
        <span class="text name">
            {swatchData.name}
        </span>
        <span class="text reference">
            {swatchData.colour.hex()}
        </span>
    </div>
    <PinButton
        action={() => {
            swatchData.locked = !swatchData.locked
        }}
    />
</div>

<style>
    .swatch {
        border-radius: var(--t-border-radius-A);
        padding: 2ch;

        color: var(--color-best-contrasting);
        background-color: var(--swatch-color);

        display: flex;
        flex-direction: row;
        flex: 1;

        justify-content: space-between;
        align-items: center;
    }

    .swatch .info {
        display: flex;
        flex-direction: column;
    }

    .swatch .info .text.name {
        font-weight: 500;
    }

    .swatch .info .text.reference {
        opacity: var(--t-opacity-B);
        font-size: var(--t-font-size-B);
    }

    .swatch .info .text.reference:hover {
        opacity: 1;
    }
</style>
