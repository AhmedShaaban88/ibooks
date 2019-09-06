import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
export default function storeConfigure (initialState){
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    )


}
