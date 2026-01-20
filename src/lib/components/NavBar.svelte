<script>
    import { currentState } from '$lib/shared.svelte'
</script>

<nav>
    <div class="section primary">
        <p>Nutmeg</p>
    </div>
    <button
        class="action"
        onclick={() => {
            let colorHEXCodes = currentState.palette.map((swatch) => {
                return swatch.color.hex()
            })
            navigator.clipboard.writeText(colorHEXCodes.join(', '))
        }}
    >
        Copy all
    </button>
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .section,
    .action {
        --color-best-contrasting: var(--t-color-theme-A-contrast);

        display: flex;
        padding: 0.8ch;

        font-weight: 600;
        border-radius: 100pt;

        background-color: var(--t-color-theme-A);
        color: var(--color-best-contrasting);

        text-transform: uppercase;

        transition: all 100ms;
    }

    .primary.section {
        flex: 1;
    }

    button.section,
    button.action {
        --color-best-contrasting: var(--t-color-theme-B-contrast);

        background-color: var(--t-color-theme-B);
        color: var(--color-best-contrasting);

        outline-offset: 0;
    }

    button:active {
        transform: scale(1.09) rotate(5deg);
    }

    button:disabled {
        opacity: 0.5;
    }
</style>
