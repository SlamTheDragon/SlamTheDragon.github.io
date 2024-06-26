import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DataCache } from '../../../utils/firebase/datacache'
import { checkDevice } from '../../../utils/device-checker/checkDevice'

function getIndex() {
    if (checkDevice()) {
        return 1
    } else {
        return 0
    }
}

const index = getIndex()

export const panelViewSlice = createSlice({
    name: 'panelView',
    initialState: {
        value: index,
    },
    reducers: {
        setPanelTarget: (state, action: PayloadAction<number>) => {
            state.value = action.payload
            window.location.href = "#offers"
            if (action.payload === 0) {
                DataCache.fetch()
            }
        }
    },
})

export const { setPanelTarget } = panelViewSlice.actions

export const getTarget = (state: { getTarget: { value: number } }) => state.getTarget.value

export default panelViewSlice.reducer
