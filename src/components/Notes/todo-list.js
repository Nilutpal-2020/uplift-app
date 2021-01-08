import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../UI/Spinner/Spinner';
import Todo from './Todo/Todo';

class TodoList extends Component {
    state = {
        todos: [],
        prevTodos: [],
        searchTodos: [],
        error: false,
        empty: false
    }

    componentDidMount = async () => {
        // if (!localStorage.getItem('auth-token')) {
        //     window.location = "/login";
        // }

        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };
        await axios.get('/todos/', config)
            .then(res => {
                this.setState({todos: res.data});
                if (res.data.length === 0) {
                    this.setState({empty: true})
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true});
            });
    }

    deleteTodo = (id) => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        axios.delete('/todos/'+id, config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            todos: this.state.todos.filter(el => el._id !== id)
        })
    }

    checkComplete = (id) => {
        const newTodos = [...this.state.todos];
        let newtodo = newTodos.find((newtodo) => newtodo._id === id);

        newtodo.completed = !newtodo.completed;

        // console.log(newtodo);

        this.setState({
            todos: newTodos
        });

        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        axios.post('/todos/update/' + id, newtodo, config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    handleSubTasks = (id, name) => {
        const newTodos = [...this.state.todos];
        let newSubTask = newTodos.find((newTodo) => newTodo._id === id);

        newSubTask.subTasks[name] = !newSubTask.subTasks[name];
        // console.log(newSubTask);

        this.setState({
            todos: newTodos
        })

        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        axios.post('/todos/update/' + id, newSubTask, config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err)
            );
    }

    todoList = () => {
        if (this.state.searchTodos.length > 0) {
            return this.state.searchTodos.map(currTodo => {
                return <Todo 
                    todo={currTodo}
                    deleteTodo={this.deleteTodo}
                    checkComplete={this.checkComplete}
                    SubTasksClick={this.handleSubTasks}
                    key={currTodo._id}
                     />;
            })
        }
        return this.state.todos.map(currTodo => {
            return <Todo 
                todo={currTodo}
                deleteTodo={this.deleteTodo}
                checkComplete={this.checkComplete}
                SubTasksClick={this.handleSubTasks}
                key={currTodo._id}
                    />;
        })
    }

    toggleOptionsHandler = (value) => {
        let toggleList = [...this.state.todos];

        if (value === 'Hide') {
            toggleList = toggleList.filter((todo) => !todo.completed)

            // console.log(toggleList);

            this.setState(prevState => {
                return {
                    todos: toggleList,
                    prevTodos: prevState.todos
                }
            });
        } else if (value === "Sort") {
            for (let i = 0; i < toggleList.length; i++ ) {
                for (let j = i; j > 0; j--) {
                    if(toggleList[j]['todo'][0] < toggleList[j-1]['todo'][0]) {
                        [toggleList[j], toggleList[j-1]] = [toggleList[j-1], toggleList[j]];
                    }
                }
            }
            
            // console.log(toggleList);

            this.setState(prevState => {
                return {
                    todos: toggleList,
                    prevTodos: prevState.todos
                }
            })
        } else if (value === "Today") {
            let today = new Date();

            toggleList = toggleList.filter((todo) => todo.date.substring(0,10) === today.toISOString().substring(0,10));

            // console.log(toggleList);
            if (toggleList.length === 0) {
                this.setState({empty: true})
            }

            this.setState(prevState => {
                return {
                    todos: toggleList,
                    prevTodos: prevState.todos
                }
            });
        } else  {
            this.setState({
                todos: this.state.prevTodos,
                empty: false,
                prevTodos: []
            });
        }
    }

    handleSearch = (event) => {
        // console.log(value);
        const todoList = [...this.state.todos];

        let foundTodos = [];

        let val = event.target.value === '' ? -1 : event.target.value.toLowerCase();

        for (let i = 0; i < todoList.length; i++) {
            let s = todoList[i]['todo'].toLowerCase()
            if (s.search(val) !== -1) {
                foundTodos.push(todoList[i]);
            }
        }

        // console.log(foundTodos);

        this.setState({
            searchTodos: foundTodos
        })
    }

    render() {
        // console.log(this.state.todos)
        let todos = <Spinner />

        if(this.state.error) {
            todos = <div className="alert alert-info m-3 text-center" role="alert">Something went wrong! Check Your Connection...</div>
        } else if (this.state.empty) {
            todos = <div className="alert alert-info m-3 text-center" role="alert">No Todos Found!!!</div>
        } else if (this.state.todos.length > 0) {
            todos = this.todoList();
        }

        return (
            <div className="container">
                <form className="form-inline float-left m-2">
                    <label className="sr-only">Preference: </label>
                    <select className="custom-select ml-2" onChange={(event) => this.toggleOptionsHandler(event.target.value)}>
                        <option value="View">View all</option>
                        <option value="Hide">Hide Completed</option>
                        <option value="Sort">Sort</option>
                        <option value="Today">Today</option>
                    </select>
                    <div className="input-group m-2">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search" 
                            aria-label="Search" 
                            // aria-describedby="button-close"
                            onChange={(event)=> this.handleSearch(event)} />
                        {/* <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button" 
                                id="button-close"
                                onClick={() => this.onCloseSearch}>X</button>
                        </div> */}
                    </div>
                </form>
                <div className="text-muted float-right m-3">Total Tasks: {this.state.todos.filter((todo) => !todo.completed).length}</div>
                <div className="container float-left">
                {todos}
                {/* {this.todoList()} */}
                </div>
            </div>
        )
    }
}

export default TodoList;