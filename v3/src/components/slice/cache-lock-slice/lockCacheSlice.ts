import { createSlice } from '@reduxjs/toolkit'


export const lockCacheSlice = createSlice({
    name: 'cacheLock',
    initialState: {
        value: true,
    },
    reducers: {
        flipCache: (state) => {
            state.value = false
        }
    },
})

export const { flipCache } = lockCacheSlice.actions

export const getCacheLockState = (state: { getCacheLockState: { value: boolean } }) => state.getCacheLockState.value

export default lockCacheSlice.reducer
