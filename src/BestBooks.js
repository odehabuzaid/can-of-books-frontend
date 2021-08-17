import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  async componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0
        .getIdTokenClaims()
        .then((res) => {
          let jwt = res.__raw;
          let config = {
            headers: {
              Authorization: `Bearer ` + jwt,
            },
            audience: process.env.REACT_APP_AUTH0_AUDIANCE,
            method: 'get',
            baseURL: process.env.REACT_APP_AUTH0_BASEURL,
            url: '/checkJwt',
          };
          axios(config)
            .then((response) => {
              console.log(response.data);
              this.getbooks() 
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => console.log(error));
    }
  }

  getbooks() {
    axios( process.env.REACT_APP_AUTH0_BASEURL + `/books`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message + 'thi'));
  }

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
      </Jumbotron>
    );
  }
}
export default withAuth0(MyFavoriteBooks);
