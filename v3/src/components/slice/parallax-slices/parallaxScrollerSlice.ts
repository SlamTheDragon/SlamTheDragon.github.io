import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export const parallaxScrollSlice = createSlice({
    name: 'scrollEffect',
    initialState: {
        value: 0,
    },
    reducers: {
        setScrollLayer: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    }
})

export const { setScrollLayer } = parallaxScrollSlice.actions
                                        // this shit needs to pair
                                        // with store.ts
                                        // name parity is always needed
                                        // unless it will not work
export const scrollStyleEffect = (state: { setScrollLayer: { value: any; }; }) => state.setScrollLayer.value

export default parallaxScrollSlice.reducer