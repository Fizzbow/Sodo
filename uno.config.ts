// uno.config.ts
import {
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
    theme: {
        colors: {
            'greyness': {
                'tint': '#BCBCBC',
                'deep': '#4E4E4E'
            },
            'green': {
                'backdrop': '#007C60',
                'word': '#fff'
            },
            'purple': {
                'backdrop': '#4564B6',
                'word': '#fff'
            },
            'dark': {
                'backdrop': '#28272A',
                'word': '0F8488'
            },
            'pinky': {
                'backdrop': '#ECE1F3',
                'word': '6B4D81'
            },
        }
    },
    // rules: [
    //     [/^text-(.*)$/, ([, c], { theme }) => {
    //         // console.log({ theme })
    //         if (theme.colors[c])
    //             return { color: theme.colors[c] }
    //     }],
    // ],
    shortcuts: {
        'h-btn': ''
    },
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
