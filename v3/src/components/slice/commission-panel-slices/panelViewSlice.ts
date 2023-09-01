import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DataCache } from '../../../utils/firebase/datacache'


export const panelViewSlice = createSlice({
    name: 'panelView',
    initialState: {
        value: 0,
    },
    reducers: {
        setPanelTarget: (state, action: PayloadAction<number>) => {
            state.value = action.payload
            // DataCache.fetch()
        }
    },
})

export const { setPanelTarget } = panelViewSlice.actions

export const getTarget = (state: { getTarget: { value: number } }) => state.getTarget.value

export default panelViewSlice.reducer
