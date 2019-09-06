import {LANGUAGE_SET} from "../actions/action-types";

export default function langReducer(state={lang: "en"}, action){
    switch (action.type) {
        case LANGUAGE_SET:
            return {
              lang: action.payload
            };
        default:
            return state;
    }
}
