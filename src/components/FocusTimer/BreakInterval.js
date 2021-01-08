import React from 'react';

import classes from './FocusTimer.module.css';

function BreakInterval(props){
    function decreaseCounter() {
        if (props.breakInterval === 1) {
            return;
        }
        props.decreaseBreak();
    }

    function increaseCounter() {
        if(props.breakInterval === 60) {
            return;
        }

        props.increaseBreak();
    }

    return(
        <div className={classes.Split}>
            <h4 className={classes.Subhead}>Break Length</h4>
            <div className="interval_container">            
                <button className="btn btn-primary btn-sm"  disabled={props.isPlay === true ? "disabled"
                : ""} onClick={increaseCounter}>Up</button>
                <p style={{fontSize:  "24px"}}>{props.breakInterval}</p>
                <button className="btn btn-primary btn-sm"  disabled={props.isPlay === true ? "disabled"
                : ""} onClick={decreaseCounter}>Down</button>
            </div>
        </div>
    );
}

export default BreakInterval;