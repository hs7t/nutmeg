<script lang="ts">
    import GenerationPane from '$lib/components/GenerationPane.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
    import SwatchView from '$lib/components/SwatchView.svelte'
    import {
        chooseBestContrastingForColour,
        getCSSPropertyValue,
    } from '$lib/logic/utilities'

    import { appEvents, currentState, refreshPalette } from '$lib/shared.svelte'
    import chroma from 'chroma-js'
    import { onMount } from 'svelte'

    let mainElement: HTMLElement

    const updateTheming = () => {
        if (!currentState.palette || currentState.palette.length < 2) return

        const fallbackColour = '#000000'

        const colourA = currentState.palette[0].colour
        const colourB = currentState.palette[1].colour

        const contrastColourA = chroma(
            getCSSPropertyValue(
                '--t-color-contrast-A',
                mainElement,
                fallbackColour,
            ),
        )
        const contrastColourB = chroma(
            getCSSPropertyValue(
                '--t-color-contrast-B',
                mainElement,
                fallbackColour,
            ),
        )

        mainElement.style.setProperty('--t-color-theme-A', colourA.css())
        mainElement.style.setProperty('--t-color-theme-B', colourB.css())

        mainElement.style.setProperty(
            '--t-color-theme-A-contrast',
            chooseBestContrastingForColour(
                colourA,
                contrastColourA,
                contrastColourB,
            ).css(),
        )
        mainElement.style.setProperty(
            '--t-color-theme-B-contrast',
            chooseBestContrastingForColour(
                colourB,
                contrastColourA,
                contrastColourB,
            ).css(),
        )
    }

    onMount(() => {
        refreshPalette()
    })
    appEvents.addEventListener('generation', updateTheming)
</script>

<div id="primary-container" bind:this={mainElement}>
    <NavBar></NavBar>

    <main>
        <span class="part">
            <GenerationPane></GenerationPane>
        </span>
        <span class="part">
            <SwatchView></SwatchView>
        </span>
    </main>
</div>

<style>
    #primary-container {
        width: 100dvw;
        height: 100dvh;

        padding: 5vmin;

        display: flex;
        flex-direction: column;
    }

    main {
        display: flex;
        flex-direction: row;

        flex: 1;
    }

    main .part {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
</style>
