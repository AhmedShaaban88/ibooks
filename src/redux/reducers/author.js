import {LOAD_AUTHOR_START, LOAD_AUTHOR_SUCCESSFUL, LOAD_AUTHOR_FAILED} from "../actions/action-types";

const initialState = {
    author: {},
    loading: true,
    error: null
};

export default function authorReducer(state=initialState, action){
    switch (action.type) {
        case LOAD_AUTHOR_START:
            return {
                ...state,
                loading: true,
                error: null
            };
            case LOAD_AUTHOR_SUCCESSFUL:
            return {
                author: action.payload,
                loading: false,
                error: null
            };
            case LOAD_AUTHOR_FAILED:
            return {
                author: {},
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
