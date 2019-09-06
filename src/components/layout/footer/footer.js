import React, {PureComponent} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import {i18nActions} from "redux-react-i18n";
import translate from "translatr";
class Footer extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            currentLang: "en"
        };
        this.changeLang = this.changeLang.bind(this)
    }
    render(){
        const {dictionary, currentLanguage} = this.props;

        return(
            <footer className="py-4 bg-dark text-white-50">
                <div className="container text-center">
                    <Container>
                        <Row>
                            <Col sm={9}>
                                <p className={localStorage.getItem('lang') === 'ar-AR' ? 'text-right' : 'text-left'}>&copy;2019  { translate( dictionary, currentLanguage, "footer-text" ) }</p>

                            </Col>
                            <Col sm={3} className="text-left">
                                <Form>
                                    <Form.Control as="select" placeholder="اللغه" value={localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en-US'} onChange={this.changeLang}>
                                        <option value="en-US" >English</option>
                                        <option value="ar-AR" >العربيه</option>
                                    </Form.Control>
                                </Form>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </footer>
        )
    }
    changeLang(e){
        localStorage.setItem('lang', e.target.value);
       this.props.dispatch(i18nActions.setCurrentLanguage(localStorage.getItem('lang')));
        if(localStorage.getItem('lang') === 'ar-AR'){
            document.body.setAttribute('lang', 'ar');
            document.body.setAttribute('dir', 'rtl');
        }else{
            document.body.setAttribute('lang', 'en');
            document.body.setAttribute('dir', 'ltr');
        }
    }
}

function mapStateToProps(state) {
    return{
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
export default connect(mapStateToProps)(Footer);

Footer.propTypes = {
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
    dispatch: propTypes.func
};
