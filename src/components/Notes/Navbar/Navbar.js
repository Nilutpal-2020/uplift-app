import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {
    // <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-lg text-center">
    //     <div className="container">
    //         {/* <Link to="/" className="navbar-brand">To-Do List</Link> */}
    //         <div className="collpase navbar-collapse">
    //         <ul className="navbar-nav mr-auto">
    //             <li className="navbar-item">
    //             <Link to="/" className="nav-link active">To-Dos</Link>
    //             </li>
    //             <li className="navbar-item">
    //             <Link to="/create" className="nav-link">Create To-Dos</Link>
    //             </li>
    //         </ul>
    //         </div>
    //     </div>
    // </nav>
    return (
      <div>
        <h1 className="display-4 text-uppercase text-center">To Do Lists</h1>
        {/* <hr className="my-4" /> */}
        <ul className="nav nav-pills justify-content-center mt-2">
          {/* <li className="nav-item">
            <Link to="/notes" className="nav-link active">To-Dos</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/notes/create" className="nav-link ml-2"><button className="btn btn-outline-info">Take a Note...</button></Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;