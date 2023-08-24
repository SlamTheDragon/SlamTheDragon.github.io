import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../components/slice/counterSlice"
import modalReducer from "../components/slice/modal-slices/modalSlice"
import modalHeaderReducer from "../components/slice/modal-slices/modalHeaderSlice"
import modalInterfaceID from "../components/slice/modal-slices/modalInterfaceSlice"
import themeID from "../components/slice/theme-slices/themeSlice"
import themeBool from "../components/slice/theme-slices/themeBoolSlice"
import scrollStyleEffect from "../components/slice/parallax-slices/parallaxScrollerSlice"
import getTarget from "../components/slice/commission-panel-slices/panelViewSlice"

export default configureStore({
    reducer: {
        counter: counterReducer,
        modal: modalReducer,
        modalHeader: modalHeaderReducer,
        modalInterface: modalInterfaceID,
        theme: themeID,
        themeBool,
        setScrollLayer: scrollStyleEffect,
        getTarget: getTarget
    }
})

