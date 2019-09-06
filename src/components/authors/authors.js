import React, {PureComponent} from 'react';
import {loadAllAuthors} from "../../redux/actions/authors";
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ErrorBoundary from "../http/error-boundary";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Avatar from "../../assets/images/user.png";
import translate from "translatr";

class AuthorsHome extends PureComponent{
    componentDidMount() {
        this.props.loadAllAuthors();
    }
    render(){
        const {authors, loading, error, dictionary, currentLanguage} = this.props;
        return <>

            <Container>
                <h3 className="text-center">
                    { translate( dictionary, currentLanguage, "home.all_authors" ) }
                </h3>
                <Row>
                    <Col sm={12} className="text-center">
                        {loading &&
                        <Spinner animation="grow"/>
                        }
                    </Col>
                </Row>
                <ErrorBoundary error={error} name={ translate( dictionary, currentLanguage, "home.all_authors" ) }>
                    <Row>
                        {authors.map((v)=>{
                            return(
                                <Col sm={3} key={v.ID}>
                                    <Card>
                                        <Card.Img variant="top" src={Avatar}/>
                                        <Card.Body>
                                            <Card.Title>
                                                <Link to={`authors/${v.ID}`}>{v.FirstName}</Link>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}


                    </Row>
                </ErrorBoundary>
            </Container>

        </>
    }

}

function mapStateToProps(state) {
    return{
        authors: state.allAuthors.authors,
        loading: state.allAuthors.loading,
        error: state.allAuthors.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loadAllAuthors: loadAllAuthors,
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthorsHome);

AuthorsHome.propTypes = {
    authors: propTypes.array,
    loading: propTypes.bool,
    error: propTypes.string,
    loadAllAuthors: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
};
