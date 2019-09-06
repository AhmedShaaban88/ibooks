import {LOAD_BOOK_SUCCESSFUL, LOAD_BOOK_START, LOAD_BOOK_FAILED} from "../actions/action-types";

const initialState = {
    book: {},
    loading: true,
    error: null
};

export default function bookReducer(state=initialState, action){
    switch (action.type) {
        case LOAD_BOOK_START:
            return {
                ...state,
                loading: true,
                error: null
            };
            case LOAD_BOOK_SUCCESSFUL:
            return {
                book: action.payload,
                loading: false,
                error: null
            };
            case LOAD_BOOK_FAILED:
            return {
                book: {},
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
