import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import '../BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
class BooksCarousel extends React.Component {
  render() {
    const { books, deleteaBook } = this.props;
    return (
      <>
        <Carousel
          className='carousel slide carouselExampleSlidesOnly'
          data-ride='carousel'
        >
          {books.map( ( book, index ) => (
            <Carousel.Item key={book._id}>
              <img
                className='d-block w-100'
                src='https://i.ibb.co/dj0jKrm/sP7nK.jpg'
                alt='First slide'
                height='300px'
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <small>{book.status}</small>
                <br></br>
                <Button
                  variant='outline-danger'
                  className='btn-sm mr-1'
                  onClick={() => deleteaBook( book._id )}
                >
                  {' '}
                  Delete
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ) )}
        </Carousel>
      </>
    );
  }
}
export default withAuth0( BooksCarousel );
