import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { getConfig } from './components/config';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import UpdateBookModal from './components/UpdateBookModal';
import AddNewBookModal from './components/AddNewBookModal';

import Books from './components/Books';
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
      showUpdate: false,
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
            baseURL: getConfig.backEnd,
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
        .then( ( token ) => {
          const jwt = token.__raw;
          const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_BACKEND,
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
        baseURL: getConfig.backEnd,
        url: '/books',
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

  deleteaBook = async ( id ) => {
    this.props.auth0.getIdTokenClaims().then( ( token ) => {
      const jwt = token.__raw;
      const requestConfig = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER_BACKEND,
        url: `/books/${id}`,
      };
      axios( requestConfig )
        .then( ( response ) => {
          this.setState( { books: response.data }, () =>
            console.log( response.data )
          );
        } )
        .catch( ( err ) => console.error( err ) );
    } );
    this.render();
  };

  updateaBook = async ( id, newTitle, newDescription, newStatus ) => {
    // alert( id, title, description, status );
    this.props.auth0.getIdTokenClaims().then( ( tokenData ) => {
      const jwt = tokenData.__raw;
      const requestConfig = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'put',
        baseURL: getConfig.backEnd,
        url: `/books/${id}`,
        params: {
          title: newTitle,
          description: newDescription,
          status: newStatus,
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
    this.closeUpdateModa();
    this.render();
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

  openUpdateModa = () => {
    this.setState( { showUpdate: true } );
  };
  closeUpdateModa = () => {
    this.setState( { showUpdate: false } );
  };
  render() {
    return (
      <>
        <Jumbotron>
          <Button className='btn-sm mr-1 pull-right' onClick={this.openModal}>
            add New book
          </Button>
          <Button
            variant='success'
            className='btn-sm mr-1 pull-right'
            onClick={this.openUpdateModa}
          >
            update a Book
          </Button>
          <AddNewBookModal
            bookTitle={this.bookTitle}
            bookDescription={this.bookDescription}
            bookStatus={this.bookStatus}
            addaBook={this.addaBook}
            closeModal={this.closeModal}
            show={this.state.showModal}
          />
          <h1>My Favorite Books</h1>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col>
              {this.state.books.length > 0 && (
                <>
                  <Books
                    books={this.state.books}
                    deleteaBook={this.deleteaBook}
                  />
                  <UpdateBookModal
                    books={this.state.books}
                    updateaBook={this.updateaBook}
                    closeUpdateModa={this.closeUpdateModa}
                    show={this.state.showUpdate}
                    title={this.state.title}
                    description={this.state.description}
                    bookstatus={this.state.bookstatus}
                    bookSetStateUpdate={this.BookSetStateUpdate}
                  />
                  ;
                </>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuth0( MyFavoriteBooks );
