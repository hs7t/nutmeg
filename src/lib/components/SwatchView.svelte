<script lang="ts">
    import { currentState } from '$lib/shared.svelte'
    import Swatch from './Swatch.svelte'
</script>

<div class="swatch-view">
    {#each currentState.palette as swatchData, id (id)}
        <Swatch {swatchData} />
    {/each}
</div>

<style>
    .swatch-view {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 100%;
    }
</style>
