import {LOAD_AUTHOR_START, LOAD_AUTHOR_SUCCESSFUL, LOAD_AUTHOR_FAILED} from "./action-types";
import {getAuthor} from "../../components/http/api-requests";

export function loadAuthorStart() {
    return {type: LOAD_AUTHOR_START};
}
export function loadAuthorSuccess(data) {
    return {type: LOAD_AUTHOR_SUCCESSFUL, payload: data};
}
export function loadAuthorFailed(error) {
    return {type: LOAD_AUTHOR_FAILED, payload: error};
}
export function loadAuthor(authorId) {
    return function (dispatch) {
        return getAuthor(authorId).then((data)=>{
            dispatch(loadAuthorStart());
            dispatch(loadAuthorSuccess(data.data))
        }).
        catch((error)=> {
            dispatch(loadAuthorStart());
            dispatch(loadAuthorFailed(error))
            }
        )
    }
}
