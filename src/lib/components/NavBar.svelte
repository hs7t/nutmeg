<nav>
    <div class="section primary">
        <p>Tinge</p>
    </div>
    <button class="section"> Options </button>
</nav>

<style>
    button {
        all: unset;
    }

    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .section {
        display: flex;
        padding: 0.8ch;

        font-weight: 600;
        border-radius: 100pt;

        background-color: var(--t-color-theme-A);
        color: var(--t-color-theme-A-contrast);

        text-transform: uppercase;
    }

    .primary.section {
        flex: 1;
    }

    button.section {
        background-color: var(--t-color-theme-B);
        color: var(--t-color-theme-B-contrast);
    }
</style>
