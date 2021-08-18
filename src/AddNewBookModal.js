import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class AddNewBookModal extends React.Component {
  render() {
    const {
      bookTitle,
      bookDescription,
      bookStatus,
      addaBook,
      show,
      closeModal,
    } = this.props;


    return (
      <Modal show={show} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title> add new Book </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='formGroups'>
            <FormGroup style={{ margin: '10px' }}>
              <Form.Label style={{ marginBottom: '10px' }}>
                <h4>Enter A New Book</h4>
              </Form.Label>
              <Form.Control
                className='md-4'
                placeholder='Book Title'
                onChange={bookTitle}
              ></Form.Control>
              <Form.Control
                className='md-4'
                placeholder='Book Description'
                onChange={bookDescription}
              ></Form.Control>
              <Form.Control
                className='md-'
                placeholder='Status'
                onChange={bookStatus}
              ></Form.Control>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {' '}
          <Button
            variant='success'
            style={{ margin: '10px' }}
            onClick={addaBook}
          >
            Add Book
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withAuth0( AddNewBookModal );
