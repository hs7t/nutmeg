<script lang="ts">
    let pinButtonDefaultSVG = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="30" height="30" rx="9" stroke="currentColor" stroke-width="2"/>
            <g clip-path="url(#clip0_13_250)">
              <path
                d="M12.7063 18.8903L8.41255 14.5966L13.0966 14.5966L17 6.00916L25.5875 14.5966L17 18.5V23.1841L12.7063 18.8903ZM12.7063 18.8903L6.46086 25.1358"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          <defs>
            <clipPath id="clip0_13_250">
            <rect width="24" height="24" fill="currentColor" transform="translate(4 4)"/>
            </clipPath>
          </defs>
        </svg>
    `

    let pinButtonFilledSVG = `
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 0C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10C0 4.47715 4.47715 0 10 0H22ZM17.707 5.30176C17.4752 5.06998 17.1439 4.96694 16.8213 5.02539C16.4987 5.08401 16.2245 5.29724 16.0889 5.5957L12.4531 13.5957L8.41211 13.5967C8.00783 13.5968 7.64303 13.8404 7.48828 14.2139C7.33362 14.5874 7.41925 15.0178 7.70508 15.3037L11.292 18.8906L5.75391 24.4287C5.36352 24.8192 5.36343 25.4523 5.75391 25.8428C6.14439 26.2332 6.77745 26.2331 7.16797 25.8428L12.7061 20.3047L16.293 23.8916C16.5789 24.1773 17.0093 24.263 17.3828 24.1084C17.7563 23.9537 17.9998 23.5888 18 23.1846V19.1436L26.001 15.5078C26.2994 15.3722 26.5127 15.0979 26.5713 14.7754C26.6298 14.4528 26.5266 14.1215 26.2949 13.8896L17.707 5.30176ZM23.8594 14.2832L16.5859 17.5898C16.2292 17.7521 16.0002 18.1081 16 18.5V20.7695L10.8262 15.5967H13.0967C13.4885 15.5965 13.8446 15.3674 14.0068 15.0107L17.3135 7.7373L23.8594 14.2832Z"
                fill="currentColor"
            />
        </svg>
    `

    let { clicked = true } = $props()
    let currentSprite: string = $derived(
        clicked ? pinButtonDefaultSVG : pinButtonFilledSVG,
    )
</script>

<button
    class="pin-button"
    onclick={() => {
        clicked = clicked ? false : true
    }}
>
    <span class="sprite">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html currentSprite}
    </span>
</button>

<style>
    .pin-button {
        all: unset;
    }

    .pin-button .sprite {
        color: red;
    }
</style>
