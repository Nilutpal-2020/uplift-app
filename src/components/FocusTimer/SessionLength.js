import React from 'react';

import classes from './FocusTimer.module.css';

function SessionLength(props) {
    function decreaseSession() {
        if (props.sessionLength === 1) {
            return;
        }
        props.decreaseSession();
    }
    
    function increaseSession() {
        if (props.sessionLength === 60) {
            return;
        }
        props.increaseSession();
    }    

    return(
        <section className={classes.Split}>
            <h4 className={classes.Subhead}>Session Length</h4>
            <section className="interval-container">
                <button className="btn btn-primary btn-sm" disabled={props.isPlay === true ? "disabled"
                : ""} onClick={increaseSession}>Up</button>
                <p style={{fontSize: "24px"}}>{props.sessionLength}</p>
                <button className="btn btn-primary btn-sm" disabled={props.isPlay === true ? "disabled"
                : ""} onClick={decreaseSession}>Down</button>
            </section>
        </section>

    );
}

export default SessionLength;