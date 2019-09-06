import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './components/layout/layout';
import Home from './components/home/home';
import AuthorsHome from './components/authors/authors';
import Author from './components/authors/author/author';
import BooksHome from './components/books/books';
import Book from './components/books/item/book';
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Settings from "./components/settings/settings";
import NotFound from './components/not-found/not-found';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import storeConfigure from './redux/store';
import {i18nActions} from "redux-react-i18n";
import {dictionaries} from './i18n/locales/dictionaries';
// const { registerObserver } = require('react-perf-devtool')
//
// // assign the observer to the global scope, as the GC will delete it otherwise
// window.observer = registerObserver()
const store = storeConfigure();

const languages = [
    {
        code: 'ar-AR',
        name: 'Arabic'
    },
    {
        code: 'en-US',
        name: 'English (USA)'
    }
];
store.dispatch( i18nActions.setLanguages( languages ));
store.dispatch( i18nActions.setDictionaries( dictionaries ) );
if(localStorage.getItem('lang')){
    store.dispatch(i18nActions.setCurrentLanguage(localStorage.getItem('lang').toString()));
    if(localStorage.getItem('lang') === 'ar-AR'){
        document.body.setAttribute('lang', 'ar');
        document.body.setAttribute('dir', 'rtl');
    }

}else{
    store.dispatch(i18nActions.setCurrentLanguage('en-US'));
    document.body.setAttribute('lang', 'en');
    document.body.setAttribute('dir', 'ltr');

}
ReactDOM.render(

    <Router>
            <Provider store={store}>
        <Layout>

        <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/authors" exact={true}  component={AuthorsHome}/>
                <Route path="/authors/:id" exact={true} strict={true} component={Author}/>
                <Route path="/books" exact={true} strict={true} component={BooksHome}/>
                <Route path="/books/:id" exact={true} strict={true} component={Book}/>
                <Route path="/login" exact={true} strict={true} component={Login}/>
                <Route path="/signup" exact={true} strict={true} component={Signup}/>
                <Route path="/settings" exact={true} strict={true} component={Settings}/>

                <Route component={NotFound}/>
            </Switch>
        </Layout>
            </Provider>
    </Router>

    ,
    document.getElementById('root'));

