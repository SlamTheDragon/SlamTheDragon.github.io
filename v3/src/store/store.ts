import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/slice/counterSlice"
import modalReducer from "../components/slice/modal-slices/modalSlice"
import modalHeaderReducer from "../components/slice/modal-slices/modalHeaderSlice"
import modalInterfaceID from "../components/slice/modal-slices/modalInterfaceSlice"

export default configureStore({
    reducer: {
        counter: counterReducer,
        modal: modalReducer,
        modalHeader: modalHeaderReducer,
        modalInterface: modalInterfaceID,
    }
})

