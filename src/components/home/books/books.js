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
import CoverBook from "../../../assets/images/bookcover.png";
import {Link} from "react-router-dom";
import translate from 'translatr';

class HomeBooks extends PureComponent{
    componentDidMount() {
        this.props.loadBooksHome();
    }
    render(){
        const {books, loadingBooks, booksError, dictionary, currentLanguage} = this.props;
        return <>

            <Container>
                <h3 className={localStorage.getItem('lang') === 'ar-AR' ? 'text-right' : 'text-left'}>
                    { translate( dictionary, currentLanguage, "home.latest_books" ) }
                </h3>
                <Row>
                    <Col sm={12} className="text-center">
                        {loadingBooks &&
                        <Spinner animation="grow"/>
                        }
                    </Col>
                </Row>
                <ErrorBoundary error={booksError} name={ translate( dictionary, currentLanguage, "home.all_books" )} homePage={true}>
                    <Row>
                        {[1,2,3,4].map((v)=>{
                            return(
                                <Col sm={3} key={v}>
                                    <Card>
                                        <Card.Img variant="top" src={CoverBook}/>
                                        <Card.Body>
                                            <Card.Title>
                                                <Link to={`books/${v}`}>{books.Title}</Link>
                                            </Card.Title>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}

                    </Row>

                    <Row>
                        <Col sm={12} className="text-center">
                            <Link to="/books">{ translate( dictionary, currentLanguage, "home.all_books" ) }</Link>

                        </Col>

                    </Row>
                </ErrorBoundary>

            </Container>

            </>
    }

}
function mapStateToProps(state) {
    return{
        books: state.books.books,
        loadingBooks: state.books.loading,
        booksError: state.books.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loadBooksHome: homeActions.loadBooksHome,
};
export default connect(mapStateToProps,mapDispatchToProps)(HomeBooks);

HomeBooks.propTypes = {
    books: propTypes.object,
    loadingBooks: propTypes.bool,
    booksError: propTypes.object,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object
};
