import {LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT} from "./action-types";
import {LoginRequest} from "../../components/http/api-requests";

export function loginSuccess(data) {
    return {type: LOGIN_SUCCESSFUL, payload: data};
}
export function loginFailed(error) {
    return {type: LOGIN_FAILED, payload: error};
}
export function loginStart(...data) {
    return function (dispatch) {
        return LoginRequest(data[0]).then((data)=>{
            localStorage.setItem("user-name",  data.data.UserName);
            dispatch(loginSuccess(data.data))
        }).
        catch((error)=> {
                dispatch(loginFailed(error))
            }
        )
    }
}
export function logout() {
    localStorage.removeItem("user-name");
    return {type: LOGOUT};
}
