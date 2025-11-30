<script lang="ts">
    class RGBColor {
      red: number
      green: number
      blue: number

      constructor (red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
      }
    }

    type ColorEntry = {
      name: string,
      rgbColor: RGBColor,
      id: number
    }

    let colours: Array<ColorEntry> = [
      {
        name: "Green",
        rgbColor: new RGBColor(255, 255, 255),
        id: 1
      },
    ]
</script>

<h1>tinge <small><em>/tĭnj/</em></small></h1>

<p>hiya here's some colours</p>

<div>
    {#each colours as colour (colour.id)}
        {colour.name}
    {/each}
</div>
