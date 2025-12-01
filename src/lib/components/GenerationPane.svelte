<div class="generation-pane">
    <button>Generate</button>
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
        all: unset;
        padding: 0.8ch;
        font-size: 3rem;
        background-color: var(--t-color-theme-B-contrast);
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
        transform: perspective(20pt);
        opacity: 1;
    }
</style>
