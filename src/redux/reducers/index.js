import {combineReducers} from 'redux';
import homeBookReducer from './homeBooks';
import homeAuthorReducer from './homeAuthor';
import authReducer from './auth';
import booksReducer from './books';
import authorsReducer from './authors';
import bookReducer from './book';
import authorReducer from './author';
import { i18nReducer } from 'redux-react-i18n';
const rootReducer = combineReducers({
books: homeBookReducer,
author: homeAuthorReducer,
auth: authReducer,
allBooks: booksReducer,
allAuthors: authorsReducer,
book: bookReducer,
authorOnce: authorReducer,
i18n: i18nReducer
});

export default rootReducer;
