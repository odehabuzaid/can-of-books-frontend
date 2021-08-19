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
              <Form.Label style={{ marginBottom: '10px' }}>Title</Form.Label>
              <Form.Control
                placeholder='Book Title'
                onChange={bookTitle}
                type='text'
                required
              ></Form.Control>
              <Form.Label style={{ marginBottom: '10px' }}>
                Description
              </Form.Label>
              <Form.Control
                className='md-5'
                placeholder='Book Description'
                onChange={bookDescription}
                type='text'
                required
              ></Form.Control>
              <Form.Label style={{ marginBottom: '10px' }}>Status</Form.Label>
              <Form.Control
                className='md-5'
                placeholder='Status'
                onChange={bookStatus}
                type='text'
                required
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
            onClick={addaBook}
          >
            add book
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withAuth0( AddNewBookModal );
