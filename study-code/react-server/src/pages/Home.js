import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div>
        <h1>Page Home.</h1>
        <Link to="/post">Link to Post</Link>
        <br />
        <Link to="/hooktest">Link to hooktest</Link>
    </div>
);
