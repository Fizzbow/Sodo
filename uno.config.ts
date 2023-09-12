// uno.config.ts
import {
    CSSValue,
    RuleContext,
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'
import { Theme } from 'unocss/preset-mini'



export default defineConfig({
    // theme: {
    //     colors: {
    //         'greyness': {
    //             'tint': '#BCBCBC',
    //             'deep': '#4E4E4E'
    //         },
    //         'green': {
    //             'backdrop': '#007C60',
    //             'word': '#fff'
    //         },
    //         'purple': {
    //             'backdrop': '#4564B6',
    //             'word': '#fff'
    //         },
    //         'dark': {
    //             'backdrop': '#28272A',
    //             'word': '0F8488'
    //         },
    //         'pinky': {
    //             'backdrop': '#ECE1F3',
    //             'word': '6B4D81'
    //         },
    //     }
    // },
    theme: {
        colors: {
            backdrop: 'rgba(var(--backdrop) , %alpha)',
            word: 'rgba(var(--word) , %alpha)',
            tint: { 1: 'rgba(var(--tint-1) , %alpha)', 2: 'rgba(var(--tint-2) , %alpha)', 3: 'rgba(var(--tint-3) , %alpha)' }
        },
        breakpoints: {
            xxs: '0px',
            xs: '320px',
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1600px',
        },
    },
    rules: [
        [/^text-(.*)$/, (match, { theme }: RuleContext<Theme>) => {
            const [, c] = match
            if (theme.colors[c]) {
                return {
                    color: theme.colors[c]
                } as CSSValue
            }
            return { color: undefined } as CSSValue

        }],
    ],
    safelist: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
        }),
        presetTypography(),
    ],
    transformers: [
        transformerAttributifyJsx()
    ],
})
