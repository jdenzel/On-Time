import { FORM_DATA } from "./action";

const initialState = {
    formData: null
}

function formDataReducer(state = initialState, action) {
    if(action.type === FORM_DATA) {
        return {
            ...state,
            formData: action.data
        }
    }
    else {
        return state;
    }
}

export default formDataReducer