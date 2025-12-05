<script lang="ts">
    import GenerationPane from '$lib/components/GenerationPane.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
    import SwatchView from '$lib/components/SwatchView.svelte'
    import {
        chooseBestContrastingForColor,
        getCSSPropertyValue,
    } from '$lib/logic/utilities'

    import { appEvents, currentState, refreshPalette } from '$lib/shared.svelte'
    import chroma from 'chroma-js'
    import { onMount } from 'svelte'

    let mainElement: HTMLElement

    const updateTheming = () => {
        if (!currentState.palette || currentState.palette.length < 2) return

        const fallbackColor = '#000000'

        const colorA = currentState.palette[0].color
        const colorB = currentState.palette[1].color

        const contrastColorA = chroma(
            getCSSPropertyValue(
                '--t-color-contrast-A',
                mainElement,
                fallbackColor,
            ),
        )
        const contrastColorB = chroma(
            getCSSPropertyValue(
                '--t-color-contrast-B',
                mainElement,
                fallbackColor,
            ),
        )

        mainElement.style.setProperty('--t-color-theme-A', colorA.css())
        mainElement.style.setProperty('--t-color-theme-B', colorB.css())

        mainElement.style.setProperty(
            '--t-color-theme-A-contrast',
            chooseBestContrastingForColor(
                colorA,
                contrastColorA,
                contrastColorB,
            ).css(),
        )
        mainElement.style.setProperty(
            '--t-color-theme-B-contrast',
            chooseBestContrastingForColor(
                colorB,
                contrastColorA,
                contrastColorB,
            ).css(),
        )
    }

    onMount(() => {
        refreshPalette()
    })
    appEvents.addEventListener('generation', updateTheming)

    onMount(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'E' && e.shiftKey && e.altKey) {
                refreshPalette()
            }
        })
    })
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
        min-height: 0;
    }

    main .part {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-height: 100%;
    }
</style>
