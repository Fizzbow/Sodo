export interface Theme {
    themeId: 'green' | 'purple' | 'dark' | 'pinky'
    color: string
}

const themes: Theme[] = [{
    themeId: 'green',
    color: '#007C60'
},
{ themeId: 'purple', color: '#4564B6' },
{ themeId: 'dark', color: '#28272A' },
{ themeId: 'pinky', color: '#ECE1F3' }
]
export default themes