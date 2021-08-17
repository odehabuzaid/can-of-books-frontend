import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { Container, Col, Row, Carousel } from 'react-bootstrap';
import IsLoadingAndError from './IsLoadingAndError';
class MyFavoriteBooks extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      books: [],
    };
  }

  async componentDidMount() {
    if ( this.props.auth0.isAuthenticated ) {
      this.props.auth0
        .getIdTokenClaims()
        .then( ( res ) => {
          let jwt = res.__raw;
          let config = {
            headers: {
              Authorization: 'Bearer ' + jwt,
            },
            audience: process.env.REACT_APP_AUTH0_AUDIANCE,
            method: 'get',
            baseURL: process.env.REACT_APP_AUTH0_BASEURL,
            url: '/checkJwt',
          };
          axios( config )
            .then( ( response ) => {
              console.log( response.data );
              this.getbooks( response.data.email );
            } )
            .catch( ( error ) => {
              console.log( error.message );
            } );
        } )
        .catch( ( error ) => console.log( error.message ) );
    }
  }

  getbooks( email ) {
    axios( process.env.REACT_APP_AUTH0_BASEURL + `/Books/${email}` )
      .then( ( response ) => {
        this.setState( { books: response.data.books } );
        console.log( this.state.books );
      } )
      .catch( ( error ) => console.log( error.message ) );
  }

  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <Container fluid>
            <Row>
              <Col>
                <IsLoadingAndError>
                  <Carousel
                    className='carousel slide carouselExampleSlidesOnly'
                    data-ride='carousel'
                  >
                    {this.state.books.length > 0 &&
                      this.state.books.map( ( book ) => (
                        <Carousel.Item key={book._id}>
                          <img
                            className='d-block w-100'
                            src='https://i.ibb.co/Bc0gnWP/sP7nK.png'
                            alt='First slide'
                            height='300px'
                          />
                          <Carousel.Caption>
                            <h3>{book.Book_Title}</h3>
                            <p>{book.Book_DESC}</p>
                            <small>{book.status}</small>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ) )}
                  </Carousel>
                </IsLoadingAndError>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </>
    );
  }
}
export default withAuth0( MyFavoriteBooks );
