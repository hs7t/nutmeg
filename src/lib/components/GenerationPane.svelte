<script>
    import { refreshPalette } from '$lib/shared.svelte'
</script>

<div class="generation-pane">
    <button onclick={() => refreshPalette()}>Generate</button>
</div>

<style>
    .generation-pane {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: var(--t-border-radius-A);

        background-color: var(--t-color-theme-B);
    }

    button {
        --color-best-contrasting: var(--t-color-theme-B-contrast);

        padding: 0.8ch;
        font-size: 3rem;
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
</style>
