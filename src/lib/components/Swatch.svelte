<script lang="ts">
    import type { SwatchData } from '$lib/shared.svelte'

    import chroma from 'chroma-js'
    import {
        chooseBestContrastingForColour,
        getCSSPropertyValue,
    } from '$lib/logic/utilities'

    import PinButton from './buttons/PinButton.svelte'

    let { swatchData }: { swatchData: SwatchData } = $props()

    let element: HTMLElement | undefined = undefined

    let contrastingColor = $state('#000000')

    $effect(() => {
        if (!element) return

        const constrastFallBack = '#000000'
        contrastingColor = chooseBestContrastingForColour(
            swatchData.colour,
            chroma(
                getCSSPropertyValue(
                    '--t-color-contrast-A',
                    element,
                    constrastFallBack,
                ),
            ),
            chroma(
                getCSSPropertyValue(
                    '--t-color-contrast-B',
                    element,
                    constrastFallBack,
                ),
            ),
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
