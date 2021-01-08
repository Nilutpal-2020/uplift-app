import React, { Component } from 'react';
import classes from './FocusTimer.module.css';
import BreakInterval from './BreakInterval';
import SessionLength from './SessionLength';
import Timer from './Timer';

class Promo extends Component{
  state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false,
    };

  onIncreaseBreakLength = () => {
    this.setState((prevState) => {
      return {
        breakLength: prevState.breakLength + 1
      };
    });
  }

  onDecreaseBreakLength = () => {
    this.setState((prevState) => {
      return {
        breakLength: prevState.breakLength - 1
      };
    });
  }

  onIncreaseSessionLength = () => {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength + 1,
        timerMinute: prevState.sessionLength + 1
      };
    });
  }

  onDecreaseSessionLength = () => {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.sessionLength - 1
      };
    });
  }

  onUpdateTimerMinute = () => {
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1
      };
    });
  }

  onToggleInterval = (isSession) => {
    if(isSession) 
    {
      this.setState({
        timerMinute: this.state.sessionLength
      })
    } else {
      this.setState({
        timerMinute: this.state.breakLength
      })
    }
  }

  onResetTimer = () => {
    this.setState({
      // timerMinute: this.state.sessionLength
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25
    })
  }

  onPlayStopTimer = (isPlay) => {
    this.setState({
      isPlay: isPlay
    })
  }

  render () {
    return (
      <div className={classes.Main}>
        <h2 className={classes.PromoHead}>Focus Timer</h2>
        <div className={classes.Cont + " container"}>
          <SessionLength 
          isPlay={this.state.isPlay}
          sessionLength={this.state.sessionLength}
          increaseSession={this.onIncreaseSessionLength}
          decreaseSession={this.onDecreaseSessionLength}
          />
          <BreakInterval 
          isPlay={this.state.isPlay}
          breakInterval={this.state.breakLength}
          increaseBreak={this.onIncreaseBreakLength}
          decreaseBreak={this.onDecreaseBreakLength}
          />
        </div>
        <Timer 
            isPlay={this.state.isPlay}
            timerMinute={this.state.timerMinute} 
            breakLength={this.state.breakLength}
            updateTimerMinute={this.onUpdateTimerMinute}
            toggleInterval={this.onToggleInterval}
            resetTimer={this.onResetTimer}
            onPlayStopTimer={this.onPlayStopTimer}
            />
      </div>
    );
  }

}

export default Promo;
