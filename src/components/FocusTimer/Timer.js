import React from 'react';

import classes from './FocusTimer.module.css';
import Modal from '../UI/Modal/Modal';

class Timer extends React.Component {
    state = {
        isSession: true,
        timerSecond: 0,
        intervalID: 0
    };

    playTimer = () => {
        let intervalID = setInterval(this.decreaseTimer, 1000);
        this.props.onPlayStopTimer(true);
        this.setState({
            intervalID: intervalID
        })
    }

    decreaseTimer = () => {
        switch(this.state.timerSecond) {
            case 0:
                if(this.props.timerMinute === 0) {
                    if(this.state.isSession) {
                        this.setState({
                            isSession: false
                        });

                        this.props.toggleInterval(this.state.isSession);
                    } else{
                        this.setState({
                            isSession: true
                        });
                        this.props.toggleInterval(this.state.isSession);
                    }
                } else {
                    this.props.updateTimerMinute()
                    this.setState({
                        timerSecond: 59
                    })
                }
                break;
            default:
                this.setState((prevState) => {
                    return {
                        timerSecond: prevState.timerSecond - 1
                    }
                })
                break;
        }
    }

    stopTimer = () => {
        clearInterval(this.state.intervalID);
        this.props.onPlayStopTimer(false);
    }

    resetTimer = () => {
        this.stopTimer();
        this.props.resetTimer();
        this.props.onPlayStopTimer(false);
        this.setState({
            timerSecond: 0,
            isSession: true
        })
    }

    render() {
        return(
            <div className={classes.Timer}>
                <div className={this.props.isPlay ? "d-none" : null}>
                    <h4 className={classes.Subhead}>{this.state.isSession === true ? "Focus" : "Break"}</h4>
                    <div className={classes.ShowTime}>
                        <span>{this.props.timerMinute}</span>
                        <span>:</span>
                        <span>{this.state.timerSecond === 0 
                        ? "00" 
                        : this.state.timerSecond < 10 
                        ? "0" + this.state.timerSecond 
                        : this.state.timerSecond}
                        </span>
                    </div>
                    
                    <section className={classes.TimerButton}>
                        {/* <button className={classes.Item + " btn btn-success"}  onClick={this.playTimer}>Start</button> */}
                        <button className={classes.Item + " btn btn-success"}  onClick={this.playTimer} disabled={this.props.isPlay === true ? "disabled": ""}>Start</button>
                        <button className={classes.Item + " btn btn-danger"}  onClick={this.stopTimer}>Stop</button>
                        <button className={classes.Item + " btn btn-info"}  onClick={this.resetTimer}>Reset</button>
                    </section>
                </div>
            <Modal show={this.props.isPlay} modalClosed={this.props.stopTimer}>
                <div className={classes.FocusTime}>
                    <h4 className={classes.Subhead}>{this.state.isSession === true ? "Focus" : "Break"}</h4>
                    <div className={classes.ShowTime}>
                        <span>{this.props.timerMinute}</span>
                        <span>:</span>
                        <span>{this.state.timerSecond === 0 
                        ? "00" 
                        : this.state.timerSecond < 10 
                        ? "0" + this.state.timerSecond 
                        : this.state.timerSecond}
                        </span>
                    </div>
                    
                    <section className={classes.TimerButton}>
                        {/* <button className={classes.Item + " btn btn-success"}  onClick={this.playTimer} disabled={this.props.isPlay === true ? "disabled": ""}>Start</button> */}
                        <button className={classes.Item + " btn btn-danger"}  onClick={this.stopTimer}>Stop</button>
                        <button className={classes.Item + " btn btn-info"}  onClick={this.resetTimer}>Reset</button>
                    </section>
                </div>
            </Modal>

            </div>
        );
    }
}

export default Timer;