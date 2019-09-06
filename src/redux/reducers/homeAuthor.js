import {GET_AUTHORS_HOME_SUCCESSFUL, GET_AUTHORS_HOME_FAILED} from "../actions/action-types";
const initialState = {
    author: {},
    loading: true,
    error: null
};
export default function homeAuthorReducer(state=initialState, action) {
    switch (action.type) {
        case GET_AUTHORS_HOME_SUCCESSFUL:
            return {
                ...state
                ,author: action.payload
                ,loading: false
                ,error: null
            };
        case GET_AUTHORS_HOME_FAILED:
            return {
                ...state
                ,author: {}
                ,loading: false
                , error: action.payload
            };
        default:
            return state;


    }
}