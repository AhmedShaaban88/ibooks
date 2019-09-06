import {LOAD_ALL_AUTHORS_SUCCESSFUL, LOAD_ALL_AUTHORS_FAILED} from "./action-types";
import {getAllAuthors} from "../../components/http/api-requests";

export function loadAllAuthorsSuccess(data) {
    return {type: LOAD_ALL_AUTHORS_SUCCESSFUL, payload: data};
}
export function loadAllAuthorsFailed(error) {
    return {type: LOAD_ALL_AUTHORS_FAILED, payload: error};
}
export function loadAllAuthors() {
    return function (dispatch) {
        return getAllAuthors().then((data)=>{
            dispatch(loadAllAuthorsSuccess(data.data))
        }).
        catch((error)=> {
                dispatch(loadAllAuthorsFailed(error))
            }
        )
    }
}
