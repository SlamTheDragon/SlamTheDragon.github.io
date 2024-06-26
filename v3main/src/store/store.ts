import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "../components/slice/modal-slices/modalSlice"
import modalHeaderReducer from "../components/slice/modal-slices/modalHeaderSlice"
import modalInterfaceID from "../components/slice/modal-slices/modalInterfaceSlice"
import themeID from "../components/slice/theme-slices/themeSlice"
import themeBool from "../components/slice/theme-slices/themeBoolSlice"
import scrollStyleEffect from "../components/slice/parallaxScrollerSlice"
import getTarget from "../components/slice/commission-panel-slices/panelViewSlice"
import getFoldState from "../components/slice/commission-panel-slices/collapseNavSlice"

export default configureStore({
    reducer: {
        modal: modalReducer,
        modalHeader: modalHeaderReducer,
        modalInterface: modalInterfaceID,
        theme: themeID,
        themeBool,
        setScrollLayer: scrollStyleEffect,
        getTarget: getTarget,
        getFoldState: getFoldState,
    }
})

