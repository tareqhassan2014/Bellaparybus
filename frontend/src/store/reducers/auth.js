import { LOGOUT, SET_JWT } from '../actionTypes';

const initialState = {
    jwt: localStorage.getItem('JWT') || '',
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_JWT: {
            localStorage.setItem('JWT', action.payload);
            return {
                ...state,
                jwt: action.payload,
            };
        }
        case LOGOUT: {
            localStorage.removeItem('JWT');
            return {
                ...state,
                jwt: null,
            };
        }
        default:
            return state;
    }
};

export default auth;
