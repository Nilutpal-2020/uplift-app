import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditTodo extends Component {
    state = {
        todo: '',
        description: '',
        subTasks: null,
        completed: false,
        date: new Date()
    }

    componentDidMount() {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        axios.get('http://localhost:5000/todos/' + this.props.match.params.id, config)
            .then(res => {
                this.setState({
                    todo: res.data.todo,
                    description: res.data.description,
                    subTasks: res.data.subTasks,
                    completed: res.data.completed,
                    date: new Date(res.data.date)
                });
            })
            .catch(err => console.log(err));
    }

    onChangeTodo = (event) => {
        this.setState({
            todo: event.target.value
        });
    }

    onChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    };

    onChangeSubTasks = (event) => {
        let tasks = event.target.value;
        
        tasks = tasks.split('\n');

        tasks = tasks.reduce((result, index) => {
            result[index] = false;
            return result;
        }, {});

        this.setState({
            subTasks: tasks
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const todos = {
            todo: this.state.todo,
            description: this.state.description,
            subTasks: this.state.subTasks,
            completed: this.state.completed,
            date: this.state.date
        };

        // console.log(todos);

        axios.post('http://localhost:5000/todos/update/' + this.props.match.params.id, todos)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/notes';
    };

    render() {
        return (
            <div className="container">
            <div className="jumbotron border border-success m-3">
                <h3 className="text-uppercase text-center" style={{fontSize: '2em', fontWeight: 'lighter'}}>Edit ToDo</h3>
                <hr className="my-4" />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="sr-only">ToDo: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Take a Note..."
                            maxLength="25"
                            value={this.state.todo}
                            onChange={this.onChangeTodo} />
                    </div>
                    <div className="form-group">
                        <label className="sr-only">Description: </label>
                        <textarea
                            className="form-control"
                            rows="2"
                            placeholder="Description..."
                            style={{resize: 'none'}}
                            maxLength="100"
                            value={this.state.description}
                            onChange={this.onChangeDescription}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Date & Time: </label>
                        <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            minDate={new Date()}
                            timeInputLabel="Time:"
                            dateFormat="dd/MM/yyyy h:mm aa"
                            showTimeInput
                            placeholderText="Select Date:" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="sr-only">Sub Tasks: </label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Add Sub-Tasks on each line..."
                            maxLength="150"
                            style={{resize: 'none'}}
                            value={this.state.subTasks ? Object.keys(this.state.subTasks).join('\n') : undefined}
                            onChange={this.onChangeSubTasks}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="UPDATE TODO" className="btn btn-outline-success btn-lg" />
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

export default EditTodo;