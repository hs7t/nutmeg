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
    [RandomColor](https://github.com/davidmerfield/randomColor) (sometimes)
-   [color-names](https://github.com/meodai/color-names)
-   [ky](https://github.com/sindresorhus/ky)
-   [Vite](https://vite.dev/) and [SvelteKit](https://svelte.dev/) (+ adapter-static)
-   [Prettier](https://prettier.io/), [ESLint](https://eslint.org) and 
    [TypeScript](https://typescriptlang.org/)

## Running this yourself

Don't. But if you really want to:

1.  Clone this repo, and install all the necessary dependencies:
    ```bash
    $ git clone https://github.com/hs7t/hviicc.git
    $ npm i
    ```
2.  Run a development server:

    ```bash
    $ npm run dev
    ```

3.  Get a build when you're ready:
    ```bash
    npm run build   # check out ./dist afterward!
    ```

There's a GitHub Pages workflow available at [`.github/workflows`](./.github/pages).
No back-end is necessary - the distribution build works fully static.
