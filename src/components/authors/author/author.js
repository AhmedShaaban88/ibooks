import React, {PureComponent} from 'react';
import {loadAuthor} from "../../../redux/actions/author";
import connect from "react-redux/es/connect/connect";
import propTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ErrorBoundary from "../../http/error-boundary";
import Card from "react-bootstrap/Card";
import Avatar from "../../../assets/images/user.png";
import translate from "translatr";

class Author extends PureComponent{
    componentDidMount(){
        this.props.loadAuthor(this.props.match.params.id);
    }
    render(){
        const {author, loading, error, dictionary, currentLanguage} = this.props;
        return <>

            <Container>

                <Row>
                    <Col sm={12} className="text-center">
                        {loading &&
                        <Spinner animation="grow"/>
                        }
                    </Col>
                </Row>
                <ErrorBoundary error={error} name={ translate( dictionary, currentLanguage, "home.all_authors" ) }
                >
                    <Row>

                        <Col sm={6}>
                            <Card style={{border: 0}}>
                                <Card.Img variant="top" src={Avatar} style={{marginBottom: '200px'}}/>
                            </Card>
                        </Col>
                        <Col sm={6} className={localStorage.getItem('lang') === 'ar-AR' ? 'text-right' : 'text-left'}>
                            <b> {translate( dictionary, currentLanguage, "book.name" ) }
                                : </b>
                            <p>{author.FirstName +'' +author.LastName}</p>
                        </Col>

                    </Row>

                </ErrorBoundary>

            </Container>

        </>;
    }

}

function mapStateToProps(state) {
    return{
        author: state.authorOnce.author,
        loading: state.authorOnce.loading,
        error: state.authorOnce.error,
        currentLanguage: state.i18n.currentLanguage,
        dictionary: state.i18n.dictionaries[ state.i18n.currentLanguage ]
    }
}
const mapDispatchToProps = {
    loadAuthor: loadAuthor,
};

export default connect(mapStateToProps,mapDispatchToProps)(Author);

Author.propTypes = {
    author: propTypes.exact(
        {
            ID: propTypes.number,
            IDBook: propTypes.number,
            FirstName: propTypes.string,
            LastName: propTypes.string
        }
    ),
    loading: propTypes.bool,
    error: propTypes.string,
    loadAuthor: propTypes.func,
    currentLanguage: propTypes.string,
    dictionary: propTypes.object,
};
