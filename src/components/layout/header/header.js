import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import './header.css';
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import {logout} from "../../../redux/actions/auth";
import translate from "translatr";

class Header extends PureComponent{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    render(){
        const {dictionary, currentLanguage} = this.props;

            if(localStorage.getItem("user-name")){
                return(
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand>IBOOK</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className={localStorage.getItem('lang') === 'ar-AR' ? 'mr-auto' : 'ml-auto'}>


                                <NavLink to="/" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.home" ) }</NavLink>


                                <NavLink to="/books" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.books" ) }</NavLink>


                                <NavLink to="/authors" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.authors" ) }</NavLink>

                                <NavDropdown title={localStorage.getItem("user-name")} id="basic-nav-dropdown">

                                    <NavLink to="/settings" activeClassName="active" className="dropdown-link" exact={true}>{translate( dictionary, currentLanguage, "header.settings" ) }</NavLink>


                                    <NavLink to="/" className="dropdown-link" onClick={this.logout}>{translate( dictionary, currentLanguage, "header.logout" ) }</NavLink>

                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
            }else{
                return(
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>IBOOK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={localStorage.getItem('lang') === 'ar-AR' ? 'mr-auto' : 'ml-auto'}>

                                <NavLink to="/" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.home" ) }</NavLink>


                                <NavLink to="/books" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.books" ) }</NavLink>


                                <NavLink to="/authors" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.authors" ) }</NavLink>


                                <NavLink to="/login" activeClassName="active" exact={true}>{translate( dictionary, currentLanguage, "header.login" ) }</NavLink>




                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                )
            }


    }
    logout(){
        this.props.logout();
    }
}

function mapStateToProps(state) {
    return{
        username: state.auth.username,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    logout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
    userName: propTypes.string,
    logout: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
};
