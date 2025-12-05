<script lang="ts">
    import favicon from '$lib/assets/favicon.svg'
    import '$lib/style.css'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap"
        rel="stylesheet"
    />

    <title>nutmeg!</title>
</svelte:head>

{@render children()}
