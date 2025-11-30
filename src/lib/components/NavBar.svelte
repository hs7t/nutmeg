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
        border-radius: 100;
    }

    .section.primary {
        flex: 1;
    }
</style>
