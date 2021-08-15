import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

import './Header.css';
class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand> 
                  <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                   {  this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/> }
      </Navbar>
    );
  }
}
export default withAuth0(Header);