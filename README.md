# Nutmeg

A tiny tool for generating harmonious colour palettes! Features:
- simple, easy to use UI centered around your colours (looks pretty cool)
- easy ways to take your colours elsewhere
- a pretty nice generation algorithm based on basic colour theory
  (hue shifts, lightness variations, chroma adjustments, 
  complimentary/analog schemes)
  and the OKLCH colour space (I spent quite a bit of time on it!),
  hidden behind an auto-switcher
- a way to pin individual colours to keep them between generations
- colour names using [color-names](https://github.com/meodai/color-names)

[Try it out!](https://nutmeg.hvii.cc/)

## Tech used
-   [chroma.js](https://gka.github.io/chroma.js/)!!! and 
    [RandomColor](https://github.com/davidmerfield/randomColor)
-   [color-names](https://github.com/meodai/color-names) (and its API!)
-   [ky](https://github.com/sindresorhus/ky)
-   [Vite](https://vite.dev/) and [SvelteKit](https://svelte.dev/) (+ adapter-static)
-   [Prettier](https://prettier.io/), [ESLint](https://eslint.org) and 
    [TypeScript](https://typescriptlang.org/)

## How it works

It's pretty simple! Generation starts with getting a nice base colour using the
baseColor library.

These colours are stored in neat Color classes ([`color.ts`](/src/lib/logic/color.ts))
that have various methods useful for arriving at palettes using various principles
of simple [color harmony](https://en.wikipedia.org/wiki/Harmony_(color)).

For example, `Color.withNeighbouringHues()` can be used to create 
[analogous](https://en.wikipedia.org/wiki/Analogous_colors) colour schemes, 
by doing something like this:

```TypeScript
// Color.withNeighbouringHues(color amount, center?, degree separation)
const analog: Palette = baseColor.withNeighbouringHues(3, true, 30) // analogous colour scheme with baseColor at the center
```

There's also the nifty `Color.withPropertyPoligons()` that can be used
to create [color polygon](https://en.wikipedia.org/wiki/Harmony_(color)#Color_polygons)
(triadic, tetradic, pentagonic...) colour schemes:

```TypeScript
// Color.withPropertyPoligons(property: 'lightness'|'chroma'|'hue', point quantity)
const triadic: Palette = baseColor.withPropertyPoligons('hue', 3)
const tetradic: Palette = baseColor.withPropertyPoligons('hue', 4)
```

You can turn these base colour schemes into a [chroma.js](https://gka.github.io/chroma.js/)
scale (a gradient, basically), from which you can get as many stops as you want
to get a nice, pleasing palette!

I also use something I call the *blend scalar* method, which is quite basic and my favorite.
Basically:

1. Get two random base colours (let's call them `baseA` and `baseB`)
2. Mix `baseA` and `baseB` to get `mixed`
3. Get a random lightness shift of `mixed` (`middle`)
4. Create a scale
5. Profit!

## Running this yourself

1. Consider: do you like spaghetti this much?

2.  Clone this repo, and install all the necessary dependencies:
    ```bash
    $ git clone https://github.com/hs7t/nutmeg.git
    $ npm i
    ```
3.  Run a development server:

    ```bash
    $ npm run dev
    ```

4.  Get a build when you're ready:
    ```bash
    npm run build   # check out ./dist afterward!
    ```

There's a GitHub Pages workflow available at [`.github/workflows`](./.github/pages).
No back-end is necessary - the distribution build works fully static.
