import React, { Component } from "react";
// import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import AuthOptions from '../../components/auth/AuthOptions';
import SideDrawer from './SideDrawer/SideDrawer';

class Header extends Component {
    state = {
        show: false
    }

    closeSide = () => {
        this.setState(prevState => {
            return {
                show: !prevState.show
            }
        })
    }

    render() {

        return (
            <div className={classes.Head}>
                <ul className="container-fluid nav justify-content-between">
                    <li className={classes.Dropdown + " nav-item mt-2"}>
                        <button className="nav-link btn" 
                            type="button" 
                            onClick={this.closeSide}
                            >
                            <svg data-src="https://s.svgbox.net/hero-solid.svg?ic=menu" 
                                width="32" 
                                height="32" 
                                fill="currentColor"></svg>
                        </button>
                        <SideDrawer open={this.state.show} closed={this.closeSide} />
                        
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/" 
                            style={{
                                textDecoration: 'none',
                                color: 'white'
                                }}
                            >
                            <h3 className="nav-link">UPLIFT</h3></Link>
                    </li> */}
                    <span className="d-flex mt-2">
                        <AuthOptions />
                    </span>
                </ul>
            </div>
        )
    }
}

export default Header;