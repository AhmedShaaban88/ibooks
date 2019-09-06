import {GET_BOOKS_HOME_SUCCESSFUL, GET_BOOKS_HOME_FAILED, GET_AUTHORS_HOME_SUCCESSFUL, GET_AUTHORS_HOME_FAILED} from "./action-types";
import {homeBooks, homeAuthors} from "../../components/http/api-requests";

export function homeBooksSucessful(books) {
    return {type: GET_BOOKS_HOME_SUCCESSFUL, payload: books};
}
export function homeBooksFailed(error) {
    return {type: GET_BOOKS_HOME_FAILED, payload: error};
}
export function loadBooksHome() {
    return function (dispatch) {
        return homeBooks().then((books)=>{
            dispatch(homeBooksSucessful(books.data))
        }).catch((error)=> {
                dispatch(homeBooksFailed(error))
            }
        )
    }
}
export function homeAuthorsSucessful(author) {
    return {type: GET_AUTHORS_HOME_SUCCESSFUL, payload: author};
}
export function homeAuthorsFailed(error) {
    return {type: GET_AUTHORS_HOME_FAILED, payload: error};
}
export function loadAuthorsHome() {
    return function (dispatch) {
        return homeAuthors().then((author)=>{
            dispatch(homeAuthorsSucessful(author.data))
        }).
        catch((error)=> {
                dispatch(homeAuthorsFailed(error))
            }
        )
    }
}