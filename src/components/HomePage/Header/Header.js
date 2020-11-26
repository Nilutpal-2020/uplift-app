import React from "react";
import { Link } from 'react-router-dom';

import AuthOptions from '../../auth/AuthOptions';

const header = () => {
    return (
        <div className="border-bottom bg-light ">
            <ul className="container nav justify-content-between">
                <li className="nav-item">
                    <Link to="/" style={{textDecoration: 'none'}}><h3 className="nav-link">UPLIFT</h3></Link>
                </li>
                <span className="d-flex mt-2">
                    <AuthOptions />
                </span>
            </ul>
        </div>
    );
}

export default header;