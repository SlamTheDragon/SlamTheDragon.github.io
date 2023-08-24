import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export const panelViewSlice = createSlice({
    name: 'panelView',
    initialState: {
        value: 0,
    },
    reducers: {
        setPanelTarget: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    },
})

export const { setPanelTarget } = panelViewSlice.actions

export const getTarget = (state: { getTarget: { value: number } }) => state.getTarget.value

export default panelViewSlice.reducer
