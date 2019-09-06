import {LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT} from "../actions/action-types";

const initialState = {
    username: localStorage.getItem("user-name") || "",
    password: "",
    error: null
};

export default function authReducer(state=initialState, action){
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            return action.payload;
            case LOGIN_FAILED:
            return {
                username: "",
                password: "",
                error: "oops something wrong!"
            };
            case LOGOUT:
            return {
                username: "",
                password: "",
                error: null
            };
        default:
            return state;
    }
}
