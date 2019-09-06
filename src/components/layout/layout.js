import React, {PureComponent} from 'react';
import Header from './header/header';
import Footer from './footer/footer'
export default class Layout extends PureComponent{
    render(){
        return(
            <React.Fragment>
            <Header/>

        {this.props.children}

            <Footer/>
            </React.Fragment>
        )
    }
}