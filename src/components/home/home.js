import React, {PureComponent} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from "react-bootstrap/Image";
import Cover from "../../assets/images/cover.svg";
import './home.css';
import HomeBooks from './books/books';
import HomeAuthor from './author/author';

export default class Home extends PureComponent{
    render() {
        return (
           <>
                <Jumbotron fluid>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <h1>
                                    IBOOK
                                </h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu scelerisque
                                    velit. Vivamus purus ante, tempor eu pellentesque id, efficitur vel sem. Fusce
                                    fringilla tortor at iaculis euismod. Donec quis est scelerisque, suscipit nulla
                                    quis, ornare elit. Maecenas suscipit at diam id hendrerit. Curabitur consectetur
                                    accumsan eros quis elementum. Integer et congue orci. Pellentesque quis mollis
                                    ipsum, quis varius sem.
                                </p>
                            </Col>
                            <Col sm={6}>
                                <Image src={Cover} alt="cover-img" fluid/>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>


               <HomeBooks/>
                <HomeAuthor/>

            </>


        )
    }
    }

