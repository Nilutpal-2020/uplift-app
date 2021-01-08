import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.ItemContainer}>
                    <div className={window.location.pathname === '/notes' ? [classes.item1, classes.ActiveN].join(' ') : classes.item1}>
                        <Link to="/notes"
                            style={{
                            textDecoration: 'none',
                            color: 'black'
                            }} 
                            onClick={props.closed}>
                            <svg data-src="https://s.svgbox.net/materialui.svg?ic=fact_check" 
                                width="32" 
                                height="32" 
                                fill="currentColor"></svg>
                                <i>To-Do List</i>
                        </Link>
                    </div>
                    <div className={window.location.pathname === '/focustimer' ? [classes.item2, classes.ActiveN].join(' ') : classes.item2}>
                        <Link to="/focustimer"
                            style={{
                            textDecoration: 'none',
                            color: 'black'
                            }} 
                            onClick={props.closed}>
                            <svg data-src="https://s.svgbox.net/materialui.svg?ic=timer" 
                                width="32" height="32" fill="currentColor"></svg>
                                <i>Focus Timer</i>
                        </Link>
                    </div>
                    <div className={window.location.pathname === '/habits' ? [classes.item3, classes.ActiveN].join(' ') : classes.item3}>
                        <Link to="/habits"
                            style={{
                            textDecoration: 'none',
                            color: 'black'
                            }} 
                            onClick={props.closed}>
                            <svg data-src="https://s.svgbox.net/materialui.svg?ic=show_chart" 
                                width="32" height="32" fill="currentColor"></svg>
                                <i>Habit Tracker</i>
                        </Link>
                    </div>
                    <div className={classes.item4}>
                        <p>UPLIFT</p>
                    </div>
                </div>
            </div>

        </Aux>
    )
}

export default sideDrawer;