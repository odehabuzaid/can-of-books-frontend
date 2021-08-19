import React from 'react';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';

import { Button } from 'react-bootstrap';
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant='outline-secondary'
      className='btn-sm mr-2'
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Log In
    </Button>
  );
};

export default withAuth0( LoginButton );
