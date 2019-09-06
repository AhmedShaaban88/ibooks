import {GET_BOOKS_HOME_SUCCESSFUL, GET_BOOKS_HOME_FAILED} from "../actions/action-types";
const initialState = {
    books: {},
    loading: true,
    error: null
};
export default function homeBookReducer(state=initialState, action) {
    switch (action.type) {
        case GET_BOOKS_HOME_SUCCESSFUL:
            return {
                ...state
                ,books: action.payload
                ,loading: false
                ,error: null
            };
        case GET_BOOKS_HOME_FAILED:
            return {
                ...state
                ,books: {}
                ,loading: false
                , error: action.payload};
        default:
            return state;


    }
}