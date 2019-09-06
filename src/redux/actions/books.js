import {LOAD_ALL_BOOKS_SUCCESSFUL, LOAD_ALL_BOOKS_FAILED} from "./action-types";
import {getAllBooks} from "../../components/http/api-requests";

export function loadAllBooksSuccess(data) {
    return {type: LOAD_ALL_BOOKS_SUCCESSFUL, payload: data};
}
export function loadAllBooksFailed(error) {
    return {type: LOAD_ALL_BOOKS_FAILED, payload: error};
}
export function loadAllBooks() {
    return function (dispatch) {
        return getAllBooks().then((data)=>{
            dispatch(loadAllBooksSuccess(data.data))
        }).
        catch((error)=> {
                dispatch(loadAllBooksFailed(error))
            }
        )
    }
}
