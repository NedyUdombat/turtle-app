import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="hero-text">Ooops</h1>
      <p className="text-medium">
        Just like Impossibilities, this page does not exist.
      </p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
