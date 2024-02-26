import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'themeSwitcher',
    initialState: {
        value: '',
    },
    reducers: {
        toggleLight: (state) => {
            document.documentElement.removeAttribute('data-them')
            state.value = 'light'
            document.documentElement.setAttribute('data-theme', state.value)
            window.localStorage.setItem("theme", state.value);
        },
        toggleDark: (state) => {
            document.documentElement.removeAttribute('data-them')
            state.value = 'dark'
            document.documentElement.setAttribute('data-theme', state.value)
            window.localStorage.setItem("theme", state.value);
        }
    },
})

export const { toggleLight, toggleDark } = themeSlice.actions

export const themeID = (state: { theme: { value: boolean } }) => state.theme.value

export default themeSlice.reducer