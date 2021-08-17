import React from 'react';
import { useAuth0,withAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button className="btn-sm mr-2" onClick={() =>
      logout( { returnTo: window.location.origin } )}>
      Log Out
    </Button>
  );
};

export default withAuth0( LogoutButton );
