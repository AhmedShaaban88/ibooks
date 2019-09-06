import React, {PureComponent} from 'react';
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import {loadAllBooks} from "../../redux/actions/books";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ErrorBoundary from "../http/error-boundary";
import Card from "react-bootstrap/Card";
import CoverBook from "../../assets/images/bookcover.png";
import {Link} from "react-router-dom";
import translate from "translatr";
class BooksHome extends PureComponent{
    componentDidMount() {
        this.props.loadAllBooks();
    }
    render(){
        const { books, loading, error, dictionary, currentLanguage } = this.props;
        return <>

            <Container>
                <h3 className="text-center">
                    { translate( dictionary, currentLanguage, "home.all_books" ) }

                </h3>
                <Row>
                    <Col sm={12} className="text-center">
                        {loading &&
                        <Spinner animation="grow"/>
                        }
                    </Col>
                </Row>
                <ErrorBoundary error={error} name={ translate( dictionary, currentLanguage, "home.all_books" ) }>
                    <Row>
                        {books.map((v)=>{
                            return(

                                <Col sm={3} key={v.ID}>
                                    <Card>
                                        <Card.Img variant="top" src={CoverBook}/>
                                        <Card.Body>
                                            <Card.Title>
                                                <Link to={`books/${v.ID}`}>{v.Title}</Link>
                                            </Card.Title>

                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })}

                    </Row>

                </ErrorBoundary>

            </Container>

        </>;
    }

}
function mapStateToProps(state) {
    return{
        books: state.allBooks.books,
        loading: state.allBooks.loading,
        error: state.allBooks.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loadAllBooks: loadAllBooks,
};

export default connect(mapStateToProps,mapDispatchToProps)(BooksHome);

BooksHome.propTypes = {
    books: propTypes.array,
    loading: propTypes.bool,
    error: propTypes.string,
    loadAllBooks: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
};
