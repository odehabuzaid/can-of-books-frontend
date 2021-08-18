import React from 'react';
import { Carousel } from 'react-bootstrap';
import './BestBooks.css';

class BooksCarousel extends React.Component {
  render() {
    const { books } = this.props;
    return (
      <Carousel
        className='carousel slide carouselExampleSlidesOnly'
        data-ride='carousel'
      >
        {books.map( ( book ) => (
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
    );
  }
}

export default BooksCarousel;
