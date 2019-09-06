import React, {PureComponent} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ErrorBoundary from "../../http/error-boundary";
import Card from "react-bootstrap/Card";
import * as homeActions from "../../../redux/actions/home";
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import Avatar from "../../../assets/images/user.png";
import {Link} from "react-router-dom";
import translate from "translatr";
class HomeAuthor extends PureComponent{
    componentDidMount() {
        this.props.loadAuthorsHome();
    }
    render(){
        const {author, loadingAuthor, authorError, dictionary, currentLanguage} = this.props;
        return <>

            <Container>
                <h3 className={localStorage.getItem('lang') === 'ar-AR' ? 'text-right' : 'text-left'}>
                   { translate( dictionary, currentLanguage, "home.latest_authors" )}
                </h3>
                <Row>
                    <Col sm={12} className="text-center">
                        {loadingAuthor &&
                        <Spinner animation="grow"/>
                        }
                    </Col>
                </Row>
                <ErrorBoundary error={authorError} name={ translate( dictionary, currentLanguage, "home.all_authors" )} homePage={true}>
                <Row>
                    {[1,2,3,4].map((v)=>{
                        return(
                            <Col sm={3} key={v}>
                                <Card>
                                    <Card.Img variant="top" src={Avatar}/>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to={`authors/${v}`}>{author.FirstName}</Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}


                </Row>
                <Row>
                    <Col sm={12} className="text-center">
                        <Link to="/authors">{ translate( dictionary, currentLanguage, "home.all_authors" )}</Link>

                    </Col>


                </Row>
                </ErrorBoundary>
            </Container>

        </>
    }

}
function mapStateToProps(state) {
    return{
        author: state.author.author,
        loadingAuthor: state.author.loading,
        authorError: state.author.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loadAuthorsHome: homeActions.loadAuthorsHome,
};
export default connect(mapStateToProps,mapDispatchToProps)(HomeAuthor);

HomeAuthor.propTypes = {
    author: propTypes.object,
    loadingAuthor: propTypes.bool,
    authorError: propTypes.object,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object
};
