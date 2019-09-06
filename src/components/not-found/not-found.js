import React, {PureComponent} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './not-found.css';
import NotFoundImg from '../../assets/images/not-found.svg';
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import translate from "translatr";
class NotFound extends PureComponent{
    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
    }
    render(){
        const { dictionary, currentLanguage} = this.props;

        return (
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Image src={NotFoundImg} alt="not-found-img" fluid/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="text-center">
                            <Button variant="outline-secondary" size="lg" onClick={this.goHome}>
                                {translate( dictionary, currentLanguage, "not-found" ) }
                            </Button>

                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }

    goHome(){
        this.props.history.push("/");
    }

}

function mapStateToProps(state) {
    return{
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}

export default connect(mapStateToProps)(NotFound);

NotFound.propTypes = {
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
};
