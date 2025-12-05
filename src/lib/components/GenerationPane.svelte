<script lang="ts">
    import { browser } from '$app/environment'
    import { refreshPalette } from '$lib/shared.svelte'
    import { onMount, onDestroy } from 'svelte'

    let shortcutEventListener: [string, (e: KeyboardEvent) => void] = [
        'keydown',
        (e) => {
            if (e.key == 'E' && e.shiftKey && e.altKey) {
                refreshPalette()
            }
        },
    ]

    if (browser) {
        onMount(() => {
            // @ts-expect-error I don't have time to think about this
            document.removeEventListener(...shortcutEventListener)
            // @ts-expect-error yup
            document.addEventListener(...shortcutEventListener)
        })

        onDestroy(() => {
            // @ts-expect-error yup
            document.removeEventListener(...shortcutEventListener)
        })
    }
</script>

<div class="generation-pane">
    <div class="buttonContainer">
        <button onclick={() => refreshPalette()}>Generate</button>
        <p class="hint">
            <code>SHIFT</code> <code>ALT</code> <code>E</code>
        </p>
    </div>
</div>

<style>
    .generation-pane {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        container-name: generation-pane;

        border-radius: var(--t-border-radius-A);

        background-color: var(--t-color-theme-B);
    }

    .buttonContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        gap: 0.8ch;
    }

    button {
        --color-best-contrasting: var(--t-color-theme-B-contrast);

        padding: 0.8ch;
        font-size: clamp(1rem, 3rem, 8cqi);
        background-color: var(--color-best-contrasting);
        color: var(--t-color-theme-B);
        font-feature-settings: 'wdth' 70;
        border-radius: var(--t-border-radius-A);
        text-transform: uppercase;
        transition: all 200ms;
    }

    button:hover {
        transform: scale(1.02);
        opacity: 90%;
    }

    button:active {
        transform: scale(0.98);
        opacity: 1;
    }

    .hint {
        color: var(--t-color-theme-B-contrast);
        opacity: var(--t-opacity-B);
        font-size: var(--t-font-size-B);
    }

    .hint code {
        background-color: var(--t-color-theme-B-contrast);
        padding: 0.2ch;
        border-radius: 0.2ch;
        color: var(--t-color-theme-B);
        font-family: inherit;
        font-weight: 500;
    }
</style>
