import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
              <h1 className="display-4 text-uppercase text-center">To Do Lists</h1>
              {/* <hr className="my-4" /> */}
              <ul className="nav nav-pills justify-content-center mt-2">
                {/* <li className="nav-item">
                  <Link to="/notes" className="nav-link active">To-Dos</Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/notes/create" className="nav-link ml-2">
                    <button 
                      className="btn btn-outline-info"
                      >Take a Note...</button>
                  </Link>
                </li>
              </ul>
            </div>
          );
      }
}

export default Navbar;