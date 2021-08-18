import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { getConfig } from './config';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import AddNewBookModal from './AddNewBookModal';
import Books from './Books';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      books: [],
      title: '',
      description: '',
      bookstatus: '',
      showModal: false,
    };
  }

  componentDidMount = async () => {
    if ( this.props.auth0.isAuthenticated ) {
      this.props.auth0
        .getIdTokenClaims()
        .then( ( res ) => {
          let jwt = res.__raw;
          let config = {
            headers: { Authorization: 'Bearer ' + jwt },
            audience: getConfig.audience,
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_BACKEND,
            url: '/checkJwt',
          };
          axios( config )
            .then( ( response ) => {
              console.log( response.data );
              this.setState( { books: response.data } );
            } )
            .catch( ( error ) => console.log( error.message ) );
        } )
        .catch( ( error ) => console.log( error.message ) );
    }
    this.getbooks();
  };
  getbooks = async () => {
    if ( this.props.auth0.isAuthenticated ) {
      this.props.auth0
        .getIdTokenClaims()
        .then( ( res ) => {
          const jwt = res.__raw;
          const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            method: 'get',
            baseURL: 'http://localhost:3050',
            url: '/books',
          };
          axios( config )
            .then( ( response ) => {
              this.setState( { books: response.data }, () =>
                console.log( response.data )
              );
            } )
            .catch( ( err ) => console.error( err ) );
        } )
        .catch( ( err ) => console.error( err ) );
    }
  };

  addaBook = async () => {
    this.props.auth0.getIdTokenClaims().then( ( token ) => {
      const jwt = token.__raw;
      const requestConfig = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER_BACKEND,
        url: '/addabook',
        params: {
          title: this.state.title,
          description: this.state.description,
          status: this.state.bookstatus,
        },
      };
      axios( requestConfig )
        .then( ( response ) => {
          this.setState( { books: response.data }, () =>
            console.log( response.data )

          );
        } )
        .catch( ( err ) => console.error( err ) );
    } );

    //life cycle @hamza ;)
    this.render();

    this.closeModal();
  };

  openModal = () => {
    this.setState( { showModal: true } );
  };
  closeModal = () => {
    this.setState( { showModal: false } );
  };
  bookTitle = ( e ) => {
    this.setState( {
      title: e.target.value,
    } );
  };
  bookDescription = ( e ) => {
    this.setState( {
      description: e.target.value,
    } );
  };
  bookStatus = ( e ) => {
    this.setState( {
      bookstatus: e.target.value,
    } );
  };

  render() {

    return (
      <>
        <Jumbotron>
          <Button className='btn-sm mr-1 pull-right' onClick={this.openModal}>
            {' '}
            add New book{' '}
          </Button>
          <h1>My Favorite Books</h1>

          <AddNewBookModal
            bookTitle={this.bookTitle}
            bookDescription={this.bookDescription}
            bookStatus={this.bookStatus}
            addaBook={this.addaBook}
            closeModal={this.closeModal}
            show={this.state.showModal}
          />
          <Container fluid>
            <Row>
              <Col>
                {this.state.books.length > 0 && (
                  <Books books={this.state.books} />
                )}
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </>
    );

  }
}

export default withAuth0( MyFavoriteBooks );
