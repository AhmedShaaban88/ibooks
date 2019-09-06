import React, {PureComponent} from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import translate from "translatr";
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
 class ErrorBoundary extends PureComponent{
    render(){
        const {dictionary, currentLanguage} = this.props;

        if(this.props.error && this.props.homePage)
        return(
            <Alert variant="danger">
                { translate( dictionary, currentLanguage, "error.first-part" ) } {this.props.name}   { translate( dictionary, currentLanguage, "error.last-part" ) }
            </Alert>
        );
       else if(this.props.error && !this.props.homePage){
            return(<Container style={{height: "100vh"}}>
                <Alert variant="danger">
                    { translate( dictionary, currentLanguage, "error.first-part" ) } {this.props.name} { translate( dictionary, currentLanguage, "error.last-part" ) }
                </Alert>
            </Container>
            )
       }
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return{
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
export default connect(mapStateToProps)(ErrorBoundary);

ErrorBoundary.propTypes = {
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
    dispatch: propTypes.func,
    homePage: propTypes.bool
};
