import {SET_JWT} from "../actionTypes";

const initialState = {
    jwt: localStorage.getItem('JWT') || ''
}

const auth = (state = initialState, action) => {

    switch (action.type) {
        case SET_JWT: {
            localStorage.setItem('JWT', action.payload)
            return {
                ...state,
                jwt: action.payload
            }
        }
        default:
            return state;
    }

}

export default auth;