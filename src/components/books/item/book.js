import React, {PureComponent} from 'react';
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import {loadBook} from "../../../redux/actions/book";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ErrorBoundary from "../../http/error-boundary";
import Card from "react-bootstrap/Card";
import CoverBook from "../../../assets/images/bookcover.png";
import Moment from 'react-moment';
import translate from "translatr";
class Book extends PureComponent{
 componentDidMount(){
     this.props.loadBook(this.props.match.params.id);
 }
 render(){
     const {book, loading, error, dictionary, currentLanguage} = this.props;
     const dateToFormat = new Date(book.PublishDate);
     return <>

         <Container>

             <Row>
                 <Col sm={12} className="text-center">
                     {loading &&
                     <Spinner animation="grow"/>
                     }
                 </Col>
             </Row>
             <ErrorBoundary error={error} name={translate( dictionary, currentLanguage, "home.all_books" ) }>
                 <Row>

                     <Col sm={6}>
                                 <Card>
                                     <Card.Img variant="top" src={CoverBook}/>
                                     <h3 className="text-center">{book.Title}</h3>
                                 </Card>
                             </Col>
                     <Col sm={6} className={localStorage.getItem('lang') === 'ar-AR' ? 'text-right' : 'text-left'}>
                         <b>{translate( dictionary, currentLanguage, "book.desc" ) }: </b>
                         <p>{book.Description}</p>
                         <b>{translate( dictionary, currentLanguage, "book.exc" ) }: </b>
                         <p>{book.Excerpt}</p>
                         <b>{translate( dictionary, currentLanguage, "book.PublishDate" ) }: </b>
                         <p>
                             <Moment date={dateToFormat} format="YYYY/MM/DD"/></p>
                         <b>{translate( dictionary, currentLanguage, "book.PageCount" ) }: </b>
                         <p>{book.PageCount}</p>
                     </Col>

                 </Row>

             </ErrorBoundary>

         </Container>

     </>;

 }

}

function mapStateToProps(state) {
    return{
        book: state.book.book,
        loading: state.book.loading,
        error: state.book.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loadBook: loadBook,
};

export default connect(mapStateToProps,mapDispatchToProps)(Book);

Book.propTypes = {
    book: propTypes.exact(
        {
            ID: propTypes.number,
            Title: propTypes.string,
            Description: propTypes.string,
            PageCount: propTypes.number,
            Excerpt: propTypes.string,
            PublishDate: propTypes.string
        }
    ),
    loading: propTypes.bool,
    error: propTypes.string,
    loadBook: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
};
