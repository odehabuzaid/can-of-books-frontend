import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  Form,
  FormGroup,
  Button,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class UpdateBookModal extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      id: 0,
      title: '',
      description: '',
      status: '',
      books: this.props.books,
    };
  }

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
      status: e.target.value,
    } );
  };

  changeInputValues( e ) {
    let theBooks = JSON.parse( localStorage.getItem( 'books' ) );
    theBooks = theBooks.filter( ( book ) => book._id === e.target.value );
    console.log( theBooks );
    document.getElementById( 'titleInput' ).value = theBooks[0].title;
    document.getElementById( 'descriptionInput' ).value = theBooks[0].description;
    document.getElementById( 'statusInput' ).value = theBooks[0].status;

    this.setState( {
      id: theBooks[0]._id,
      title: theBooks[0].title,
      description: theBooks[0].description,
      status: theBooks[0].status,
    } );
  }

  render() {
    const { books, closeUpdateModa, updateaBook, show } = this.props;
    localStorage.setItem( 'books', JSON.stringify( books ) );
    return (
      <Modal show={show} onHide={closeUpdateModa}>
        <Modal.Header>
          <Modal.Title> Update Book </Modal.Title>
          <Dropdown>
            <DropdownButton id='dropdown-item-button' title={'choos a book'}>
              {books.map( ( book, index, array ) => (
                <Dropdown.Item
                  key={index}
                  as='button'
                  onClick={( e ) => this.changeInputValues( e )}
                  value={book._id}
                >
                  {book.title}
                </Dropdown.Item>
              ) )}
            </DropdownButton>
          </Dropdown>
        </Modal.Header>
        <Modal.Body>
          {/* {this.state.title} */}
          <Form id='formGroups'>
            <FormGroup style={{ margin: '10px' }}>
              <Form.Label style={{ marginBottom: '10px' }}>Title</Form.Label>
              <Form.Control
                className='md-4'
                placeholder='Book Title'
                onChange={this.bookTitle}
                type='text'
                value={this.state.title}
                id='titleInput'
              ></Form.Control>
              <Form.Label style={{ marginBottom: '10px' }}>
                Description
              </Form.Label>
              <Form.Control
                className='md-4'
                placeholder='Book Description'
                onChange={this.bookDescription}
                type='text'
                value={this.state.description}
                id='descriptionInput'
              ></Form.Control>
              <Form.Label style={{ marginBottom: '10px' }}>Status</Form.Label>
              <Form.Control
                className='md-'
                placeholder='Status'
                onChange={this.bookStatus}
                type='text'
                value={this.state.status}
                id='statusInput'
              ></Form.Control>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            variant='success'
            className='mr-1'
            style={{ margin: '10px' }}
            onClick={() =>
              updateaBook(
                this.state.id,
                this.state.title,
                this.state.description,
                this.state.status
              )
            }
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withAuth0( UpdateBookModal );
