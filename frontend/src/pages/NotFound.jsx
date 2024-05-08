import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>This URL does not exist.</p>
      <Link to="/">Redirect to Home?</Link>
    </div>
  );
};

export default NotFoundPage;