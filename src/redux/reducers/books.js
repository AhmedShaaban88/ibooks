import {LOAD_ALL_BOOKS_SUCCESSFUL, LOAD_ALL_BOOKS_FAILED} from "../actions/action-types";

const initialState = {
    books: [],
    loading: true,
    error: null
};

export default function booksReducer(state=initialState, action){
    switch (action.type) {
        case LOAD_ALL_BOOKS_SUCCESSFUL:
            return {
                books: action.payload,
                loading: false,
                error: null
            };
        case LOAD_ALL_BOOKS_FAILED:
            return {
                books: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
