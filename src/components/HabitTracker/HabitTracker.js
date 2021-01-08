import React, {Component} from 'react';
import axios from 'axios';

import Modal from '../UI/Modal/Modal';
import Timer from './Timer/Timer';
import Habit from './Habit/Habit';
import HabitReport from './HabitReport/HabitReport';
import classes from './HabitTracker.module.css';

class HabitTracker extends Component {
    state = {
        habits: {},
        newHabit: '',
        dataPoints: [],
        timeChanged: false,
        showChart: false,
        error: false
    }

    componentDidMount = async () => {
        // console.log("Mount");

        if (!localStorage.getItem('auth-token')) window.location = "/login";
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        await axios.get('/habits/', config)
            .then(res => {
                if(Object.keys(res.data).length === 0) {
                    console.log("No data found");
                }
                this.setState({
                    habits: res.data[0]
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true});
            });

        if (this.state.habits === undefined) {
            console.log("No Data received!");
            let time = new Date().toString();
            time = new Date(time.substring(0, 11) + '00:00:00').toISOString();

            const habits = {
                checkTime: time,
                habitList: []
            };
            await axios.post('/habits/add', habits, config)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            
            await axios.get('/habits/', config)
                .then(res => {
                    this.setState({
                        habits: res.data[0]
                    })
                })
                .catch(err => console.log(err));
        }

        // console.log(this.state.habits);
        let habits = {...this.state.habits};
        let today = new Date().toDateString();

        if (this.state.habits !== undefined && habits.habitList.length > 0 && 
            Object.keys(habits.habitList[0].report[habits.habitList[0].report.length - 1])[0] !== today) {
            console.log("True");
            
            if (habits.habitList[0].report.length > 6) {
                for(let i = 0; i < habits.habitList.length; i++){
                    habits.habitList[i].report.reverse().pop();
                    habits.habitList[i].report.reverse().push(
                        {[today]: false}
                    );
                }
            } else {
                for(let i = 0; i < habits.habitList.length; i++){
                    if (Object.keys(habits.habitList[i].report[habits.habitList[i].report.length - 1])[0] !== today) {
                        habits.habitList[i].report.push(
                            {[today]: false}
                        );
                    }
                }
            }

            // console.log(habits);

            const newHabit = {
                checkTime: habits.checkTime,
                habitList: habits.habitList
            }
            await axios.post('/habits/update/' + habits._id, newHabit, config)
                .then(res => {
                    this.setState({
                        habits: res.data
                    });
                })
                .catch(err => console.log(err));
        }
    }

    mapDataPoints = (data) => {
        if (data['habitList'].length === 0) return console.log("No Data!!!");
        let newArr = data['habitList'].map(data => {
            return data.report;
        })

        let lArr = [];
        let dArr = [];
        for (let i = 0; i < newArr.length; i++ ){
            for (let j = 0; j < newArr[i].length; j++) {
                for (const k in newArr[i][j]) {
                    // let date = new Date(k);
                    let date = k.split(' ');
                    date = date[0] + ' ' + date[2];
                    if (lArr.includes(date) === false) {
                        lArr.push(date);
                    }
                    if (newArr[i][j][k] === true) {
                        dArr.push(1);
                    } else {
                        dArr.push(0);
                    }
                }
            }   
        }
    

        let nArr = [];
        let x = 0;
        while (x < lArr.length) {
            let total = 0;
            let n = x;
            while (n < dArr.length) {
                total += dArr[n];
                n += lArr.length;
            }
            nArr.push(total);
            x += 1;
        }

        dArr = nArr;

        const finalArr = [lArr, dArr];

        this.setState({
            dataPoints: finalArr
        })
    }

    handleCompleteHabit = async (id) => {
        const habitLists = {...this.state.habits};
        let habit = habitLists.habitList.find(habit => habit.id === id);
        const length = habit.report.length;

        let value = Object.keys(habit.report[length - 1]);
        value = value[0];
        habit.report[length - 1][value] = !habit.report[length - 1][value];

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }

        let newHabit = {
            checkTime: habitLists.checkTime,
            habitList: habitLists.habitList
        }

        this.setState({
            habits: habitLists
        })

        await axios.post('/habits/update/' + habitLists._id, newHabit, config)
            .then(res => {
                this.setState({
                    habits: res.data
                })
            })
            .catch(err => console.log(err));
        // console.log(habitLists);
    }

    habitList = () => {
        if (this.state.habits === undefined || this.state.habits.habitList === undefined) return;

        return this.state.habits.habitList.map(currentHabit => {
            return <Habit 
                habit={currentHabit}
                deleteHabit={this.deleteHabit}
                onEdit={(event) => this.handleEditHabit(event, currentHabit.id)}
                updateEdited={this.handleEdited}
                checkComplete={this.handleCompleteHabit}
                key={currentHabit.id}
            />;
        })
    }

    handleEditHabit = (event, id) => {
        const habitLists = {...this.state.habits};
        let habit = habitLists.habitList.find(habit => habit.id === id);
        
        habit.name = event.target.value;

        // console.log(habitLists);
        this.setState({
            habits: habitLists
        })
    }

    handleEdited = async () => {
        console.log("Uploaded")
        const List = {...this.state.habits};

        const editedHabit = {
            checkTime: List.checkTime,
            habitList: List.habitList
        }

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }
        await axios.post('/habits/update/' + List._id, editedHabit, config)
            .then(res => {
                this.setState({
                    habits: res.data
                })
            })
            .catch(err => console.log(err));
    }

    deleteHabit = async (id) => {
        let List = {...this.state.habits};

        const newList = {
            checkTime: List['checkTime'],
            habitList: List.habitList.filter(habit => habit.id !== id)
        }

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }

        await axios.post('/habits/update/' + List._id, newList, config)
            .then(res => {
                this.setState({
                    habits: res.data
                })
            })
            .catch(err => console.log(err));
    }

    onNewHabit = (event) => {
        this.setState({
            newHabit: event.target.value
        })
    }

    handleAddHabit = async (event) => {
        event.preventDefault();
        if (this.state.newHabit === '') return console.log('Empty');

        let List = {...this.state.habits};

        let dReport = [];
        let newId = '';

        if (List.habitList.length > 0) {
            newId = List.habitList[0].id + List.habitList.length + Math.round(Math.random() * 1000);
            dReport = List.habitList[0].report.map(date => {
                return {[Object.keys(date)]: false}
            })
        } else {
            newId = "habit1" + Math.round(Math.random() * 100);
            let today = new Date()
            dReport = [
                {[today.toDateString()]: false}
            ]
        }

        // console.log(dReport);
        
        List.habitList.push({
            id: newId,
            name: this.state.newHabit,
            report: dReport
        });

        // console.log(List);

        this.setState({
            habits: List,
            newHabit: ''
        })

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }

        const habit = {
            checkTime: List.checkTime,
            habitList: List.habitList
        }

        await axios.post('/habits/update/' + List._id, habit, config)
            .then(res => {
                this.setState({
                    habits: res.data
                })
            })
            .catch(err => console.log(err));
    }

    changeTime = async (event) => {
        event.preventDefault();

        let time = new Date().toString();
        time = new Date(time.substring(0, 11) + event.target.value + ':00').toISOString();
        
        let habitLists = {...this.state.habits};
        habitLists['checkTime'] = time;

        const habit = {
            checkTime: habitLists.checkTime,
            habitList: habitLists.habitList
        }

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        }

        await axios.post('/habits/update/' + habitLists._id, habit, config)
            .then(res => {
                this.setState({
                    habits: res.data
                })
            })
            .catch(err => console.log(err));
    }

    onTimeChanged = () => {
        this.setState( prevState => {
            return {
                timeChanged: !prevState.timeChanged
            }
        })
    }

    onChartClicked = () => {
        this.mapDataPoints(this.state.habits);

        this.setState( prevState => {
            return {
                showChart: !prevState.showChart
            }
        })
    }

    render() {
        // console.log(this.state.habits)
        // console.log(this.state.habits.habitList)
        // console.log(this.state.habits.checkTime);
        let addNewHabits = <div>Can Only add 6 habits at a time!</div>;

        if (this.state.habits !== undefined && Object.keys(this.state.habits).length > 0 && this.state.habits.habitList.length < 6) {
            addNewHabits = <div className="input-group justify-content-center mt-5">
                    <input 
                        type="text" 
                        className="from-control p-2 pl-3" 
                        placeholder="Add New Habit" 
                        aria-describedby="button-addon"
                        style={{width: '60%', outline: 'none', border: '1px solid #ccc'}} 
                        value={this.state.newHabit}
                        onChange={this.onNewHabit}
                        maxLength="30"
                        />
                    
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-success" 
                            type="button" 
                            id="button-addon"
                            onClick={this.handleAddHabit}>ADD</button>
                    </div>
                </div>
        }

        let checkInTime = new Date(this.state.habits === undefined ? new Date().toISOString() : this.state.habits.checkTime);

        return (
            <div className={classes.Habits + " container"}>
                <header className="mt-5 mb-1">
                    <h2 className="display-4">Track your current habits:</h2>
                    <p className="text-muted">Check Time: </p>
                    <button 
                        className="btn btn-outline-info btn-lg" 
                        onClick={this.onTimeChanged}
                        >{checkInTime.toLocaleTimeString().substring(0, 11)}
                    </button>
                    {this.state.timeChanged ? 
                        <Modal show={this.state.timeChanged} modalClosed={this.onTimeChanged}>
                            <Timer 
                                time={checkInTime.toTimeString().substring(0, 5)}
                                timeChanged={this.changeTime}
                                onTimeChanged={this.onTimeChanged}
                            />
                        </Modal>
                        : null
                    }
                </header>
                <div className="m-3 float-right">
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={this.onChartClicked}
                        >View Report
                    </button>

                    {this.state.showChart ? 
                        <Modal show={this.state.showChart} modalClosed={this.onChartClicked}>
                            <HabitReport 
                                chartClose={this.onChartClicked}
                                dataPoints={this.state.dataPoints}
                            />
                        </Modal> : null
                    }
                </div>

                {this.habitList()}
                {addNewHabits}
            </div>
        );
    }
}

export default HabitTracker;