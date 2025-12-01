<script>
    import GenerationPane from '$lib/components/GenerationPane.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
    import SwatchView from '$lib/components/SwatchView.svelte'
</script>

<div id="primary-container">
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
