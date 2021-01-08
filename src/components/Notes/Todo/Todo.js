import React from 'react';
import './Todo.css';
import { Link } from 'react-router-dom';

// import DatePicker from 'react-datepicker';

const todo = props => {
    const custom = ["Todos jumbotron col p-0"];
    const dateClass = ["dateModify float-right"];
    const targetDate = new Date(props.todo.date);
    const today = new Date();

    if(today >  targetDate) {
        dateClass.push("text-danger");
    } else {
        dateClass.push("text-success");
    }

    if (props.todo.completed) {
        custom.push("CardDetails");
    }

    const handleTodoClick = () => {
        props.checkComplete(props.todo._id);
    }

    const progressPer = () => {

        if (props.todo.subTasks) {
            let count = (Object.keys(props.todo.subTasks)).length;
            let total = 0;

            const totalArr = Object.keys(props.todo.subTasks).map(subTodo => {
                return props.todo.subTasks[subTodo];
            });

            for (const x of totalArr) {
                if (x) {
                    total += 1;
                }
            }

            return Math.round((total/count) * 100) + '%';
        }
        return 0;
    };

    const generateId = () => {
        return 'multiCollapseTarget' + Math.floor(Math.random() * 1000);
    }
    
    const generateOnce = generateId();

    let subTasks = null;

    if (props.todo.subTasks) {
        subTasks = 
        <div className="card-body Todo">
            <button className="btn btn-info" 
                type="button" 
                data-toggle="collapse"
                data-target={'#'+generateOnce}
                aria-expanded="false"
                aria-controls={generateOnce}>View Sub Tasks
            </button>
            <div className="collapse multi-collapse mt-2" id={generateOnce}>
                <ul className="list-group list-group-flush">
                {Object.keys(props.todo.subTasks).map(subTodo => {
                    return <li className={!props.todo.subTasks[subTodo] ? "list-group-item" : "list-group-item CardDetails"}
                        onClick={() => props.SubTasksClick(props.todo._id, subTodo)}
                        key={subTodo}>- {subTodo}</li>
                })}
                </ul>
            </div>
        </div>
    }
    
    let dateTime = new Date(props.todo.date).toString();
    // props.todo.date.substring(0, 10)

    return (
        <div className={custom.join(" ")}>
            <div className="p-3 bg-light text-dark">
                <input type="checkbox" 
                    checked={props.todo.completed} 
                    onChange={handleTodoClick}
                    className="p-3"
                    />
                <span className="TodoTask">{props.todo.todo}</span>
                <p className={dateClass.join(" ")}>{dateTime.substring(4, 15) + " |" + dateTime.substring(15, 21)}</p>
                {/* <p className={dateClass.join(" ")}>
                    <DatePicker 
                        selected={dateTime}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </p> */}
                <div className="progress">
                    <div className="progress-bar bg-info" 
                        role="progressbar"
                        style={{width: progressPer()}} 
                        aria-valuenow={progressPer}
                        aria-valuemin="0"
                        aria-valuemax="100" >{progressPer()}</div>
                </div>
            </div>
            {props.todo.description ? 
            <div className="card-body">
                <p className="card-text text-muted">{props.todo.description}</p>
            </div>
            : null
            }
            {subTasks}
            
            <div className="card-body text-right Todo">
                <Link to={"/notes/edit/"+ props.todo._id}><button className="btn btn-outline-primary mr-3">EDIT</button></Link>
                <button className="btn btn-outline-danger" onClick={() => { props.deleteTodo(props.todo._id)}}>DELETE</button>
            </div>
        </div>
    )
}

export default todo;