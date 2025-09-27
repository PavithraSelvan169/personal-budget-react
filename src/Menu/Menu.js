import React from 'react';
import {
  
  Link
  
} from "react-router-dom"


function Menu() {
  return (
    <nav>
            <ul>
                
                <li><Link to="/" aria-current="page">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/login">Login</Link></li>
                
            </ul>
        </nav>
  );
}

export default Menu;