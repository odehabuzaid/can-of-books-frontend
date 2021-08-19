import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { Button } from 'react-bootstrap';
import './Header.css';
class Header extends React.Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        className='btn-toolbar'
      >
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        {this.props.auth0.isAuthenticated ? (
          <>
            <Button variant="outline-secondary" className='btn-sm mr-1'>
              <Link to='/'>Home</Link>
            </Button>
            <Button variant="outline-secondary" className='btn-sm mr-1'>
              <Link to='/profile'>Profile</Link>
            </Button>
            <LogoutButton />{' '}
          </>
        ) : null}
      </Navbar>
    );
  }
}
export default withAuth0( Header );
