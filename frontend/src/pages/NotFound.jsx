// import React from 'react'; This isn't necessary - react is already imported elsewhere in a parent component
// importing the whole module instead of selecting certain properties like useState slows down the project
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1 className="header">404 - Page Not Found</h1> {/* todo: make it render the actual status code */}
      <center><p>This URL does not exist.</p>
      <Link to="/">Redirect to Home?</Link></center>
    </div>
  );
};

export default NotFoundPage;