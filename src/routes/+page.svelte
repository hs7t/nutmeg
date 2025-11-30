<script lang="ts">
    import PinButton from '$lib/components/buttons/PinButton.svelte'

    class RGBColor {
        red: number
        green: number
        blue: number

        constructor(red: number, green: number, blue: number) {
            this.red = red
            this.green = green
            this.blue = blue
        }

        toCSSRGBNotation = () => {
            return `rgb(${this.red}, ${this.green}, ${this.blue})`
        }
    }

    type ColorEntry = {
        name: string
        rgbColor: RGBColor
        id: number
    }

    let colours: Array<ColorEntry> = [
        {
            name: 'Green',
            rgbColor: new RGBColor(0, 255, 0),
            id: 1,
        },
    ]
</script>

<h1>tinge <small><em>/tĭnj/</em></small></h1>

<p>hiya here's some colours</p>
{#each colours as colour (colour.id)}
    <div
        class="colour-block"
        style:background-color={colour.rgbColor.toCSSRGBNotation()}
    >
        {colour.name}
    </div>
    <PinButton></PinButton>
{/each}
