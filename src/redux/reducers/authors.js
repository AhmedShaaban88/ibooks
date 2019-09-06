import {LOAD_ALL_AUTHORS_SUCCESSFUL, LOAD_ALL_AUTHORS_FAILED} from "../actions/action-types";

const initialState = {
    authors: [],
    loading: true,
    error: null
};

export default function authorsReducer(state=initialState, action){
    switch (action.type) {
        case LOAD_ALL_AUTHORS_SUCCESSFUL:
            return {
                authors: action.payload,
                loading: false,
                error: null
            };
        case LOAD_ALL_AUTHORS_FAILED:
            return {
                authors: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
