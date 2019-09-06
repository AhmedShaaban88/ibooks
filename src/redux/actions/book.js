import {LOAD_BOOK_START, LOAD_BOOK_FAILED, LOAD_BOOK_SUCCESSFUL} from "./action-types";
import {getBook} from "../../components/http/api-requests";

export function loadBookStart() {
    return {type: LOAD_BOOK_START};
}
export function loadBookSuccess(data) {
    return {type: LOAD_BOOK_SUCCESSFUL, payload: data};
}
export function loadBookFailed(error) {
    return {type: LOAD_BOOK_FAILED, payload: error};
}
export function loadBook(bookId) {
    return function (dispatch) {
        return getBook(bookId).then((data)=>{
            dispatch(loadBookStart());
            dispatch(loadBookSuccess(data.data))
        }).
        catch((error)=> {
            dispatch(loadBookStart());
            dispatch(loadBookFailed(error))
            }
        )
    }
}
