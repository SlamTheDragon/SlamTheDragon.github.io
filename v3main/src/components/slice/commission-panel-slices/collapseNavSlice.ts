import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { checkDevice } from '../../../utils/device-checker/checkDevice'


export const panelNavFold = createSlice({
    name: 'panelFold',
    initialState: {
        value: false,
    },
    reducers: {
        setPanelFold: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    },
})

export const { setPanelFold } = panelNavFold.actions

export const getFoldState = (state: { getFoldState: { value: boolean } }) => state.getFoldState.value

export default panelNavFold.reducer
