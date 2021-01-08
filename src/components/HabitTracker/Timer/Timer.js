import React from 'react';

import classes from './Timer.module.css';

const timer = (props) => {
    return (
        <div className={classes.Timer}>
            <h1 className="display-4">Set Time:</h1>
            <label htmlFor="time" className="sr-only">Set Time: </label>
            <input 
                type="time" 
                id="time" 
                value={props.time} 
                onChange={(event) => props.timeChanged(event)} />
            <button className="btn btn-outline-success m-2" onClick={props.onTimeChanged}>DONE</button>
        </div>
    );
}

export default timer;